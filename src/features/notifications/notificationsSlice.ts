import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { Notification } from '../../data';

interface NotificationsState {
  items: Notification[];
  unreadCount: number;
  isLoading: boolean;
}

const initialState: NotificationsState = {
  items: [],
  unreadCount: 0,
  isLoading: false,
};

const notificationsSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    setNotifications: (state, action: PayloadAction<Notification[]>) => {
      state.items = action.payload;
      state.unreadCount = action.payload.filter((n) => !n.read).length;
    },
    markAsRead: (state, action: PayloadAction<string>) => {
      const notif = state.items.find((n) => n.id === action.payload);
      if (notif && !notif.read) {
        notif.read = true;
        state.unreadCount--;
      }
    },
    markAllAsRead: (state) => {
      state.items.forEach((n) => { n.read = true; });
      state.unreadCount = 0;
    },
    setLoading: (state, action: PayloadAction<boolean>) => { state.isLoading = action.payload; },
  },
});

export const { setNotifications, markAsRead, markAllAsRead, setLoading } = notificationsSlice.actions;
export default notificationsSlice.reducer;
