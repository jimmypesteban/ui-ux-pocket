import { Platform } from 'react-native';

export const theme = {
  bg: '#000000',
  bgAlt: '#0d0d0d',
  fg: '#ffffff',
  fgDim: '#8a8a8a',
  fgFaint: '#4a4a4a',
  accent: '#ffffff',
  border: '#2a2a2a',
  danger: '#ff4d4d',
  success: '#4dff88',
  displayFont: Platform.OS === 'ios' ? 'Georgia' : 'serif',
  monoFont: Platform.OS === 'ios' ? 'Courier New' : 'monospace',
};
