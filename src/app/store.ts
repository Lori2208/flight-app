import { configureStore } from '@reduxjs/toolkit';
import { api } from '@/services/api';
import authReducer from '@/features/auth/store/authSlice';
import { authListener } from '@/features/auth/store/authListeners';
import themeReducer from '@/theme/themeSlice';
import { themeListener } from '@/theme/themeListeners';

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    auth: authReducer,
    theme: themeReducer,
  },
  middleware: (getDefault) =>
    getDefault().prepend(authListener.middleware, themeListener.middleware).concat(api.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
