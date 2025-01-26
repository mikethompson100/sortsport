import React from 'react';
import TeamsTable from './components/TeamsTable';
import {MLB_root} from './constants/leagueAPI';
import useData from './hooks/useData';
import './App.css';
const LEAGUEAPI = MLB_root;

function App() {
  const statistics = useData();
  return (
    <div className="App">
      <TeamsTable statistics={statistics} LEAGUEAPI={LEAGUEAPI} />
    </div>
  );
}

export default App;
