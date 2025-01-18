import React from 'react';
import TeamsTable from './components/TeamsTable';
import {MLB} from './constants/leagueAPI';
import useTeams from './hooks/useTeams';
import useStats from './hooks/useStats';
import './App.css';
const LEAGUEAPI = MLB;

function App() {
  const teams = useTeams();
  const stats = useStats();
  return (
    <div className="App">
      <TeamsTable teams={teams} stats={stats} LEAGUEAPI={LEAGUEAPI} />
    </div>
  );
}

export default App;
