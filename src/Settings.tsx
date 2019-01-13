import React, { useContext, SyntheticEvent } from 'react';
import { SettingsContext } from './settings-context';
import { TUNINGS } from './music';

export default () => {
  const { tuning, showOctave, update} = useContext(SettingsContext);

  const handleTuningChanged = (e: SyntheticEvent<HTMLSelectElement>) => {
    update({ tuning: TUNINGS.find(tuning => tuning.name === e.currentTarget.value) || tuning });
  }
  
  return (
    <div className="App-options">
      
      <label className="App-tuning">Tuning</label>
      <select
        className="App-tuning"
        value={tuning.name}
        onChange={handleTuningChanged}
      >
        { TUNINGS.map((tuning, i) => <option key={i}>{tuning.name}</option>)}
      </select>

      <label className="App-show-octave">
        <input
          type="checkbox"
          checked={showOctave}
          onChange={() => update({ showOctave: !showOctave }) }
        /> Show octave
      </label>
    </div>
  )
};
