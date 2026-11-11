import { createListenerMiddleware } from '@reduxjs/toolkit';
import { loggedIn, loggedOut } from './authSlice';
import { clearSession, saveSession } from '../session'; 

export const authListener = createListenerMiddleware();

authListener.startListening({
  actionCreator: loggedIn,
  effect: async (action) => {
    await saveSession(action.payload);
  },
});

authListener.startListening({
  actionCreator: loggedOut,
  effect: async () => {
    await clearSession();
  },
});
