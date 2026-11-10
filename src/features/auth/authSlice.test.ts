import type { RootState } from '@/app/store';
import type { User } from '@/types';
import authReducer, {
  loggedIn,
  loggedOut,
  selectCurrentUser,
  selectIsLoggedIn,
  sessionRestored,
} from './authSlice';

const user: User = { id: 1, email: 'demo@flights.com', name: 'Demo User' };

describe('authSlice reducer', () => {
  it('starts logged out and restoring', () => {
    expect(authReducer(undefined, { type: 'unknown' })).toEqual({ user: null, isRestoring: true });
  });

  it('stores the user on loggedIn', () => {
    const state = authReducer(undefined, loggedIn(user));
    expect(state.user).toEqual(user);
  });

  it('clears the user on loggedOut', () => {
    const loggedInState = authReducer(undefined, loggedIn(user));
    expect(authReducer(loggedInState, loggedOut()).user).toBeNull();
  });

  it('restores a saved session and stops restoring', () => {
    const state = authReducer(undefined, sessionRestored(user));
    expect(state).toEqual({ user, isRestoring: false });
  });

  it('restores to logged out when nothing was saved', () => {
    const state = authReducer(undefined, sessionRestored(null));
    expect(state).toEqual({ user: null, isRestoring: false });
  });
});

describe('auth selectors', () => {
  const makeState = (authUser: User | null) =>
    ({ auth: { user: authUser, isRestoring: false } }) as unknown as RootState;

  it('selects the current user', () => {
    expect(selectCurrentUser(makeState(user))).toEqual(user);
  });

  it('reports logged in only when there is a user', () => {
    expect(selectIsLoggedIn(makeState(user))).toBe(true);
    expect(selectIsLoggedIn(makeState(null))).toBe(false);
  });
});
