import { createContext, useContext } from 'react';
import { Platform } from 'react-native';

export type ThemeMode = 'dark' | 'light';

const fonts = {
  displayFont: Platform.OS === 'ios' ? 'Georgia' : 'serif',
  monoFont: Platform.OS === 'ios' ? 'Courier New' : 'monospace',
};

export const darkTheme = {
  mode: 'dark' as const,
  bg: '#000000',
  bgAlt: '#0d0d0d',
  fg: '#ffffff',
  fgDim: '#8a8a8a',
  fgFaint: '#4a4a4a',
  accent: '#ffffff',
  border: '#2a2a2a',
  danger: '#ff4d4d',
  success: '#4dff88',
  ...fonts,
};

export const lightTheme = {
  mode: 'light' as const,
  bg: '#f2efe6',
  bgAlt: '#e9e4d4',
  fg: '#18160f',
  fgDim: '#6f6a58',
  fgFaint: '#a39c86',
  accent: '#18160f',
  border: '#d9d3bf',
  danger: '#a3352c',
  success: '#2f6b45',
  ...fonts,
};

export type Theme = Omit<typeof darkTheme, 'mode'> & { mode: ThemeMode };

export const THEME_STORAGE_KEY = 'ui-ux-pocket:themeMode';

export const ThemeContext = createContext<Theme>(darkTheme);
export const ThemeModeContext = createContext<{ mode: ThemeMode; toggleMode: () => void }>({
  mode: 'dark',
  toggleMode: () => {},
});

export function useTheme(): Theme {
  return useContext(ThemeContext);
}

export function useThemeMode() {
  return useContext(ThemeModeContext);
}

// Backwards-compatible static export for any lingering direct imports.
export const theme = darkTheme;
