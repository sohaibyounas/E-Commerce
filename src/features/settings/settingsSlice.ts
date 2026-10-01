import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SettingsState {
  general: { language: string; timezone: string; currency: string; dateFormat: string };
  notifications: { email: boolean; orders: boolean; stock: boolean; marketing: boolean };
  security: { twoFactor: boolean; sessionTimeout: number };
  appearance: { theme: 'light' | 'dark' };
  isLoading: boolean;
}

const initialState: SettingsState = {
  general: { language: 'en', timezone: 'America/Los_Angeles', currency: 'USD', dateFormat: 'MM/DD/YYYY' },
  notifications: { email: true, orders: true, stock: true, marketing: false },
  security: { twoFactor: false, sessionTimeout: 30 },
  appearance: { theme: 'light' },
  isLoading: false,
};

const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    updateGeneral: (state, action: PayloadAction<Partial<SettingsState['general']>>) => { state.general = { ...state.general, ...action.payload }; },
    updateNotifications: (state, action: PayloadAction<Partial<SettingsState['notifications']>>) => { state.notifications = { ...state.notifications, ...action.payload }; },
    updateSecurity: (state, action: PayloadAction<Partial<SettingsState['security']>>) => { state.security = { ...state.security, ...action.payload }; },
    updateAppearance: (state, action: PayloadAction<Partial<SettingsState['appearance']>>) => { state.appearance = { ...state.appearance, ...action.payload }; },
    setLoading: (state, action: PayloadAction<boolean>) => { state.isLoading = action.payload; },
  },
});

export const { updateGeneral, updateNotifications, updateSecurity, updateAppearance, setLoading } = settingsSlice.actions;
export default settingsSlice.reducer;
