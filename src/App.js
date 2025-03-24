import React from 'react';
import TeamsTable from './components/TeamsTable';
import useData from './hooks/useData';
import './styles/dist/global.min.css';
import './styles/dist/styles.min.css';

function App() {
  const result = useData();
  return (
    <div className="App">
      <TeamsTable result={result} />
    </div>
  );
}

export default App;
