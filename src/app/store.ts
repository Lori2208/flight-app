import { configureStore } from '@reduxjs/toolkit';
import { api } from '@/services/api';
import authReducer from '@/features/auth/authSlice';
import { authListener } from '@/features/auth/authListeners';
import themeReducer from '@/theme/themeSlice';

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    auth: authReducer,
    theme: themeReducer
  },
  middleware: (getDefault) =>
    getDefault().prepend(authListener.middleware).concat(api.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;