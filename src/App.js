import React from 'react';
import TeamsTable from './components/TeamsTable';
import useData from './hooks/useData';
import './App.css';

function App() {
  const result = useData();
  return (
    <div className="App">
      <TeamsTable result={result} />
    </div>
  );
}

export default App;
