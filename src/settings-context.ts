import { createContext } from 'react';
import { Tuning, TUNINGS } from './music';

export interface Settings {
  showOctave: boolean;
  tuning: Tuning;
  fretCount: number;
  update: (settings: { showOctave?: boolean, tuning?: Tuning}) => void
}

export const SettingsContext = createContext<Settings>({
  showOctave: false,
  tuning: TUNINGS[0],
  fretCount: 14,
  update: () => {}
});
