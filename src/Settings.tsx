import React, { useContext, SyntheticEvent, FC } from 'react';
import { SettingsContext } from './settings-context';
import { TUNINGS } from './music';
import './Settings.scss';

const Settings: FC = () => {
  const { tuning, showOctave, update } = useContext(SettingsContext);

  const handleTuningChanged = (e: SyntheticEvent<HTMLSelectElement>) => {
    update({
      tuning:
        TUNINGS.find(tuning => tuning.name === e.currentTarget.value) || tuning,
    });
  };

  return (
    <div className="Settings">
      <label htmlFor="tuning">Tuning</label>

      <select
        className="Settings-tuning"
        value={tuning.name}
        onChange={handleTuningChanged}
        id="tuning"
      >
        {TUNINGS.map((tuning, i) => (
          <option key={i}>{tuning.name}</option>
        ))}
      </select>

      <label className="Settings-show-octave">
        <input
          type="checkbox"
          checked={showOctave}
          onChange={() => update({ showOctave: !showOctave })}
        />{' '}
        Show octave
      </label>
    </div>
  );
};

export default Settings;
