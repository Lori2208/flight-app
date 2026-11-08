import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '@/app/store';
import type { User } from '@/types';

type AuthState = {
  user: User | null;
  isRestoring: boolean; // true while reading the saved session on app start
};

const initialState: AuthState = {
  user: null,
  isRestoring: true,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loggedIn(state, action: PayloadAction<User>) {
      state.user = action.payload;
    },
    loggedOut(state) {
      state.user = null;
    },
    sessionRestored(state, action: PayloadAction<User | null>) {
      state.user = action.payload;
      state.isRestoring = false;
    },
  },
});

export const { loggedIn, loggedOut, sessionRestored } = authSlice.actions;
export default authSlice.reducer;

export const selectCurrentUser = (state: RootState) => state.auth.user;
export const selectIsLoggedIn = (state: RootState) => state.auth.user !== null;
export const selectIsRestoring = (state: RootState) => state.auth.isRestoring;