import React, { useState } from 'react';
import './App.css';
import { TUNINGS, Tuning } from './music';
import { newBoolArray } from './util';
import Fretboard, { Indicator } from './Fretboard';
import { SettingsContext } from './settings-context';
import Quiz from './Quiz';
import GuitarStrings from './GuitarStrings';
import Explorer from './Explorer';
import Settings from './Settings';

const fretCount = 14;

type AppMode = 'quiz' | 'explore';

const App = () => {
  const [appMode, setAppMode] = useState<AppMode>('explore');
  const [tuning, setTuning] = useState(TUNINGS[0]);
  const [showOctave, setShowOctave] = useState(true);
  const [activeStrings, setActiveStrings] = useState(newBoolArray(tuning.notes.length));

  const toggleGuitarString = (toToggle: number) => {
    let value = [...activeStrings];
    value[toToggle] = !value[toToggle];
    setActiveStrings(value);
  };

  const updateSettings = (options: { showOctave?: boolean; tuning?: Tuning}) => {
    if (typeof options.showOctave !== 'undefined') setShowOctave(options.showOctave);
    if (options.tuning) setTuning(options.tuning);
  }

  const fretboard = (notes: Indicator[]) =>
    <Fretboard
      fretCount={fretCount}
      tuning={tuning}
      notes={notes}
    >
    <GuitarStrings
      activeStrings={activeStrings}
      onToggle={toggleGuitarString}
    ></GuitarStrings>
  </Fretboard>;
  
  return (
    <div className="App">
      <SettingsContext.Provider value={{ showOctave, tuning, fretCount, update: updateSettings }}>
        <header className="App-header">
          Guitar Quiz 
          <label>
            Mode
          </label>
          <label className="App-explore">
            <input
              type="radio"
              value="explore"
              checked={appMode === 'explore'}
              onChange={() => setAppMode('explore')}
            />
              Explore
          </label>
          <label className="App-quiz">
            <input
              type="radio"
              value="quiz"
              checked={appMode === 'quiz'}
              onChange={() => setAppMode('quiz')}
            />
            Quiz
          </label>
        </header>
        <Settings></Settings>

        {
          appMode === 'quiz' ? 
            <Quiz
              includedStrings={activeStrings}
              content={fretboard}
            ></Quiz> 
              :
            <Explorer
              content={fretboard}
            ></Explorer>
        }
      </SettingsContext.Provider>
    </div>
  );
}

export default App;
