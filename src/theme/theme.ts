import { createTheme, ThemeOptions } from '@mui/material/styles';

const designTokens: ThemeOptions = {
  typography: {
    fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    h1: { fontSize: '2.25rem', fontWeight: 700, lineHeight: 1.25, letterSpacing: '-0.02em' },
    h2: { fontSize: '1.875rem', fontWeight: 700, lineHeight: 1.3, letterSpacing: '-0.02em' },
    h3: { fontSize: '1.5rem', fontWeight: 600, lineHeight: 1.35 },
    h4: { fontSize: '1.25rem', fontWeight: 600, lineHeight: 1.4 },
    h5: { fontSize: '1.1rem', fontWeight: 600, lineHeight: 1.45 },
    h6: { fontSize: '0.95rem', fontWeight: 600, lineHeight: 1.5 },
    body1: { fontSize: '0.9375rem', lineHeight: 1.6 },
    body2: { fontSize: '0.84375rem', lineHeight: 1.55 },
    button: { textTransform: 'none', fontWeight: 600, letterSpacing: '0.01em' },
  },
  shape: { borderRadius: 10 },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 10,
          padding: '8px 18px',
          fontWeight: 600,
          boxShadow: 'none',
          transition: 'all 0.2s ease-in-out',
          '&:hover': {
            boxShadow: '0 4px 12px rgba(204, 111, 0, 0.25)',
          },
        },
        contained: {
          background: 'linear-gradient(135deg, #F2A900 0%, #CC6F00 100%)',
          color: '#ffffff',
          '&:hover': {
            background: 'linear-gradient(135deg, #e59f00 0%, #b86200 100%)',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 14,
          transition: 'transform 0.2s ease, box-shadow 0.2s ease',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 14,
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 10,
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          fontWeight: 600,
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          borderRight: 'none',
        },
      },
    },
  },
};

const lightPalette: ThemeOptions['palette'] = {
  mode: 'light',
  primary: {
    main: '#CC6F00',
    light: '#F2A900',
    dark: '#4D2A00',
    contrastText: '#ffffff',
  },
  secondary: {
    main: '#F2A900',
    light: '#F9E6A8',
    dark: '#CC6F00',
    contrastText: '#4D2A00',
  },
  success: {
    main: '#16a34a',
    light: '#4ade80',
    dark: '#15803d',
    contrastText: '#ffffff',
  },
  warning: {
    main: '#d97706',
    light: '#fbbf24',
    dark: '#b45309',
    contrastText: '#ffffff',
  },
  error: {
    main: '#dc2626',
    light: '#f87171',
    dark: '#991b1b',
    contrastText: '#ffffff',
  },
  info: {
    main: '#0284c7',
    light: '#38bdf8',
    dark: '#0369a1',
    contrastText: '#ffffff',
  },
  background: {
    default: '#FAF7F0',
    paper: '#FFFFFF',
  },
  text: {
    primary: '#4D2A00',
    secondary: '#7C4A15',
    disabled: '#B89973',
  },
  divider: '#EEDCBD',
  grey: {
    50: '#FAF7F0',
    100: '#F5EEDC',
    200: '#EBDCBF',
    300: '#DEC69E',
    400: '#BA9868',
    500: '#8C6738',
    600: '#6E4E25',
    700: '#4D2A00',
    800: '#3A1E00',
    900: '#261300',
  },
};

const darkPalette: ThemeOptions['palette'] = {
  mode: 'dark',
  primary: {
    main: '#F2A900',
    light: '#F9E6A8',
    dark: '#CC6F00',
    contrastText: '#4D2A00',
  },
  secondary: {
    main: '#CC6F00',
    light: '#F2A900',
    dark: '#8C4B00',
    contrastText: '#ffffff',
  },
  success: {
    main: '#22c55e',
    light: '#86efac',
    dark: '#16a34a',
    contrastText: '#ffffff',
  },
  warning: {
    main: '#f59e0b',
    light: '#fde68a',
    dark: '#d97706',
    contrastText: '#ffffff',
  },
  error: {
    main: '#ef4444',
    light: '#fca5a5',
    dark: '#b91c1c',
    contrastText: '#ffffff',
  },
  info: {
    main: '#38bdf8',
    light: '#7dd3fc',
    dark: '#0284c7',
    contrastText: '#ffffff',
  },
  background: {
    default: '#1E1205',
    paper: '#2C1B0A',
  },
  text: {
    primary: '#FDFBF7',
    secondary: '#F9E6A8',
    disabled: '#9E8364',
  },
  divider: '#4D2A00',
  grey: {
    50: '#2A1A0A',
    100: '#35210D',
    200: '#4D2A00',
    300: '#6E4010',
    400: '#945C20',
    500: '#BA7A2F',
    600: '#D99843',
    700: '#F2A900',
    800: '#F9E6A8',
    900: '#FFFDF7',
  },
};

export const lightTheme = createTheme({ ...designTokens, palette: lightPalette });
export const darkTheme = createTheme({ ...designTokens, palette: darkPalette });

