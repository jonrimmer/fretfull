import { observable } from 'mobx';
import { Tuning, TUNINGS } from './music';

export class SettingsStore {
  @observable tuning: Tuning = TUNINGS[0];
  @observable fretCount: number = 14;
  @observable showOctave = false;
}
