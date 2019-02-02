import React, { useState } from 'react';
import './App.scss';
import { newBoolArray } from './util';
import Fretboard, { Indicator } from './Fretboard';
import { SettingsContext } from './settings-context';
import Quiz from './Quiz';
import GuitarStrings from './GuitarStrings';
import Explorer from './Explorer';
import Settings from './Settings';
import { BrowserRouter as Router, Route, NavLink, Redirect } from 'react-router-dom';
import { TUNINGS, Tuning } from './music';

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
    <Router basename={process.env.PUBLIC_URL}>
      <div className="App">
        <SettingsContext.Provider value={{ showOctave, tuning, fretCount, update: updateSettings }}>
          <header className="App-header">
            <h1 className="App-title">Fretfull</h1>
            <nav className="App-nav">
              <NavLink className="App-explore-link" to="/explore">Explore</NavLink>
              <NavLink className="App-quiz-link" to="/quiz">Quiz</NavLink>
            </nav>
            <Settings></Settings>
          </header>

          <Route exact path="/" render={() => <Redirect to="/explore/A/Major triad" />}></Route>
          <Route exact path="/explore" render={() => <Redirect to="/explore/A/Major triad" />}></Route>

          <Route
            exact
            path="/explore/:chordRoot/:chordType"
            render={props => <Explorer content={neck} {...props}></Explorer>}
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
