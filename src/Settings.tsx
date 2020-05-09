import React, { FC } from 'react';
import { TUNINGS } from './music';
import { SettingsWrapper } from './Settings.styles';
import { useSettings } from './rootStore';

const Settings: FC = () => {
  const settings = useSettings();

  return (
    <SettingsWrapper>
      <label htmlFor="tuning">Tuning</label>

      <select
        className="tuning"
        value={settings.tuning.name}
        onChange={(e) => {
          settings.tuning =
            TUNINGS.find((tuning) => tuning.name === e.currentTarget.value) ||
            settings.tuning;
        }}
        id="tuning"
      >
        {TUNINGS.map((tuning, i) => (
          <option key={i}>{tuning.name}</option>
        ))}
      </select>

      <label className="show-octave">
        <input
          type="checkbox"
          checked={settings.showOctave}
          onChange={() => (settings.showOctave = !settings.showOctave)}
        />{' '}
        Show octave
      </label>
    </SettingsWrapper>
  );
};

export default Settings;
