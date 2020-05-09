import React, { useState, FC } from 'react';
import { newBoolArray } from './util';
import Fretboard, { Indicator } from './Fretboard';
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
import { AppContainer, AppHeader, AppTitle, AppNav } from './App.styles';
import { useSettings } from './rootStore';
import { observer } from 'mobx-react-lite';

const fretCount = 15;

const App: FC = () => {
  const settings = useSettings();

  const [activeStrings, setActiveStrings] = useState(
    newBoolArray(settings.tuning.notes.length)
  );

  const toggleGuitarString = (toToggle: number) => {
    let value = [...activeStrings];
    value[toToggle] = !value[toToggle];
    setActiveStrings(value);
  };

  const fretboard = (notes: Indicator[]) => (
    <Fretboard fretCount={fretCount} notes={notes}>
      <GuitarStrings
        activeStrings={activeStrings}
        onToggle={toggleGuitarString}
      ></GuitarStrings>
    </Fretboard>
  );

  return (
    <Router>
      <AppContainer>
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
          <Settings />
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
          render={(props) => (
            <ChordsExplorer {...props}>{fretboard}</ChordsExplorer>
          )}
        />

        <Route
          path="/quiz"
          render={() => (
            <Quiz includedStrings={activeStrings}>{fretboard}</Quiz>
          )}
        />
      </AppContainer>
    </Router>
  );
};

export default observer(App);
