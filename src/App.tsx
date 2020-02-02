import React, { useState, FC } from 'react';
import { newBoolArray } from './util';
import Fretboard, { Indicator } from './Fretboard';
import { SettingsContext } from './settings-context';
import Quiz from './Quiz';
import GuitarStrings from './GuitarStrings';
import ChordsExplorer from './ChordsExplorer';
import Settings from './Settings';
import {
  HashRouter as Router,
  Route,
  NavLink,
  Redirect,
} from 'react-router-dom';
import { TUNINGS, Tuning } from './music';
import { AppContainer, AppHeader, AppTitle, AppNav } from './App.styles';

const fretCount = 15;

const App: FC = () => {
  const [tuning, setTuning] = useState(TUNINGS[0]);
  const [showOctave, setShowOctave] = useState(true);
  const [activeStrings, setActiveStrings] = useState(
    newBoolArray(tuning.notes.length)
  );

  const toggleGuitarString = (toToggle: number) => {
    let value = [...activeStrings];
    value[toToggle] = !value[toToggle];
    setActiveStrings(value);
  };

  const updateSettings = (options: {
    showOctave?: boolean;
    tuning?: Tuning;
  }) => {
    if (typeof options.showOctave !== 'undefined')
      setShowOctave(options.showOctave);
    if (options.tuning) setTuning(options.tuning);
  };

  const neck = (notes: Indicator[]) => (
    <Fretboard fretCount={fretCount} tuning={tuning} notes={notes}>
      <GuitarStrings
        activeStrings={activeStrings}
        onToggle={toggleGuitarString}
      ></GuitarStrings>
    </Fretboard>
  );

  return (
    <Router>
      <AppContainer>
        <SettingsContext.Provider
          value={{
            showOctave,
            tuning,
            fretCount,
            update: updateSettings,
          }}
        >
          <AppHeader>
            <AppTitle>Fretfull</AppTitle>
            <AppNav>
              <NavLink className="App-chords-link" to="/chords">
                Chords
              </NavLink>
              <NavLink className="App-quiz-link" to="/quiz">
                Quiz
              </NavLink>
            </AppNav>
            <Settings></Settings>
          </AppHeader>

          <Route
            exact
            path="/"
            render={() => <Redirect to="/chords/A/Major triad" />}
          ></Route>
          <Route
            exact
            path="/chords"
            render={() => <Redirect to="/chords/A/Major triad" />}
          ></Route>

          <Route
            exact
            path="/chords/:chordRoot/:chordType"
            render={props => (
              <ChordsExplorer content={neck} {...props}></ChordsExplorer>
            )}
          />

          <Route
            path="/quiz"
            render={() => (
              <Quiz includedStrings={activeStrings} content={neck}></Quiz>
            )}
          />
        </SettingsContext.Provider>
      </AppContainer>
    </Router>
  );
};

export default App;
