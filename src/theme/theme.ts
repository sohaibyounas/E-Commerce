import { createTheme, ThemeOptions } from '@mui/material/styles';

const designTokens: ThemeOptions = {
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: { fontSize: '2.5rem', fontWeight: 600, lineHeight: 1.2 },
    h2: { fontSize: '2rem', fontWeight: 600, lineHeight: 1.3 },
    h3: { fontSize: '1.5rem', fontWeight: 600, lineHeight: 1.4 },
    h4: { fontSize: '1.25rem', fontWeight: 600, lineHeight: 1.4 },
    h5: { fontSize: '1rem', fontWeight: 600, lineHeight: 1.5 },
    h6: { fontSize: '0.875rem', fontWeight: 600, lineHeight: 1.5 },
    body1: { fontSize: '1rem', lineHeight: 1.5 },
    body2: { fontSize: '0.875rem', lineHeight: 1.5 },
    button: { textTransform: 'none', fontWeight: 500 },
  },
  shape: { borderRadius: 8 },
  components: {
    MuiButton: {
      styleOverrides: {
        root: { borderRadius: 8 },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: { borderRadius: 12 },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: { '& .MuiOutlinedInput-root': { borderRadius: 8 } },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: { borderRadius: 12 },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: { borderRight: 'none' },
      },
    },
  },
};

const lightPalette: ThemeOptions['palette'] = {
  mode: 'light',
  primary: { main: '#2563eb', light: '#3b82f6', dark: '#1d4ed8', contrastText: '#fff' },
  secondary: { main: '#7c3aed', light: '#8b5cf6', dark: '#6d28d9', contrastText: '#fff' },
  success: { main: '#059669', light: '#10b981', dark: '#047857', contrastText: '#fff' },
  warning: { main: '#d97706', light: '#f59e0b', dark: '#b45309', contrastText: '#fff' },
  error: { main: '#dc2626', light: '#ef4444', dark: '#b91c1c', contrastText: '#fff' },
  info: { main: '#0891b2', light: '#06b6d4', dark: '#0e7490', contrastText: '#fff' },
  background: { default: '#f8fafc', paper: '#fff' },
  text: { primary: '#1e293b', secondary: '#64748b', disabled: '#94a3b8' },
  divider: '#e2e8f0',
  grey: { 50: '#f8fafc', 100: '#f1f5f9', 200: '#e2e8f0', 300: '#cbd5e1', 400: '#94a3b8', 500: '#64748b', 600: '#475569', 700: '#334155', 800: '#1e293b', 900: '#0f172a' },
};

const darkPalette: ThemeOptions['palette'] = {
  mode: 'dark',
  primary: { main: '#3b82f6', light: '#60a5fa', dark: '#2563eb', contrastText: '#fff' },
  secondary: { main: '#8b5cf6', light: '#a78bfa', dark: '#7c3aed', contrastText: '#fff' },
  success: { main: '#10b981', light: '#34d399', dark: '#059669', contrastText: '#fff' },
  warning: { main: '#f59e0b', light: '#fbbf24', dark: '#d97706', contrastText: '#fff' },
  error: { main: '#ef4444', light: '#f87171', dark: '#dc2626', contrastText: '#fff' },
  info: { main: '#06b6d4', light: '#22d3ee', dark: '#0891b2', contrastText: '#fff' },
  background: { default: '#0f172a', paper: '#1e293b' },
  text: { primary: '#f1f5f9', secondary: '#94a3b8', disabled: '#64748b' },
  divider: '#334155',
  grey: { 50: '#f8fafc', 100: '#f1f5f9', 200: '#e2e8f0', 300: '#cbd5e1', 400: '#94a3b8', 500: '#64748b', 600: '#475569', 700: '#334155', 800: '#1e293b', 900: '#0f172a' },
};

export const lightTheme = createTheme({ ...designTokens, palette: lightPalette });
export const darkTheme = createTheme({ ...designTokens, palette: darkPalette });
