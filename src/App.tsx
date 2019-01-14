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
import { BrowserRouter as Router, Route, Link, NavLink } from 'react-router-dom';

const fretCount = 15;

const App = () => {
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

  const neck = (notes: Indicator[]) =>
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
    <Router>
      <div className="App">
        <SettingsContext.Provider value={{ showOctave, tuning, fretCount, update: updateSettings }}>
        <header className="App-header">
          Guitar Quiz
          <nav className="App-nav">
            <NavLink exact to="/">Explore</NavLink>
            <NavLink to="/quiz">Quiz</NavLink>
          </nav>
        </header>
          <Settings></Settings>

          <Route
            exact
            path="/"
            render={() => <Explorer content={neck}></Explorer>}
          />

          <Route
            path="/quiz"
            render={() => 
              <Quiz
                includedStrings={activeStrings}
                content={neck}
              ></Quiz>
            }
          />
        </SettingsContext.Provider>
      </div>
    </Router>
  );
}

export default App;
