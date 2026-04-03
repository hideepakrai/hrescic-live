import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { LocaleCode } from '@/types/localization';

interface AdminLocaleState {
  currentLocale: LocaleCode;
}

const initialState: AdminLocaleState = {
  currentLocale: 'en',
};

const adminLocaleSlice = createSlice({
  name: 'adminLocale',
  initialState,
  reducers: {
    setAdminLocale: (state, action: PayloadAction<LocaleCode>) => {
      state.currentLocale = action.payload;
    },
  },
});

export const { setAdminLocale } = adminLocaleSlice.actions;
export const selectAdminLocale = (state: { adminLocale: AdminLocaleState }) => state.adminLocale.currentLocale;

export default adminLocaleSlice.reducer;
