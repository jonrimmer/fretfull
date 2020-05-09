import { SettingsStore } from './settingsStore';
import ChordsStore from './chordsStore';
import { createContext, useContext } from 'react';

class RootStore {
  public settingsStore = new SettingsStore();
  public chordsStore: ChordsStore;

  constructor() {
    this.chordsStore = new ChordsStore(this.settingsStore);
  }
}

export default RootStore;

export const RootStoreContext = createContext<RootStore>(new RootStore());

export const useSettings = () => useContext(RootStoreContext).settingsStore;

export const useChords = () => useContext(RootStoreContext).chordsStore;
