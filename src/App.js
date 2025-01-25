import React from 'react';
import TeamsTable from './components/TeamsTable';
import {MLB_root} from './constants/leagueAPI';
import useTeams from './hooks/useTeams';
//import useStats from './hooks/useStats';
import './App.css';
const LEAGUEAPI = MLB_root;

function App() {
  const statistics = useTeams();
  //const stats = useStats();
  return (
    <div className="App">
      <TeamsTable statistics={statistics} LEAGUEAPI={LEAGUEAPI} />
    </div>
  );
}

export default App;
