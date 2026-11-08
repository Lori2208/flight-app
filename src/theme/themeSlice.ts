import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '@/app/store';

export type ThemeMode = 'system' | 'light' | 'dark';

type ThemeState = { mode: ThemeMode };

const initialState: ThemeState = { mode: 'system' };

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    themeModeChanged(state, action: PayloadAction<ThemeMode>) {
    state.mode = action.payload;
  },
   themeModeRestored(state, action: PayloadAction<ThemeMode>) {
    state.mode = action.payload;
  },
  },

});

export const { themeModeChanged, themeModeRestored } = themeSlice.actions;
export default themeSlice.reducer;

export const selectThemeMode = (state: RootState) => state.theme.mode;