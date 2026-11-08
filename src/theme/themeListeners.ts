import { createListenerMiddleware } from '@reduxjs/toolkit';
import { themeModeChanged } from './themeSlice';
import { saveThemeMode } from './themeStorage';

export const themeListener = createListenerMiddleware();

themeListener.startListening({
  actionCreator: themeModeChanged,
  effect: async (action) => {
    await saveThemeMode(action.payload);
  },
});