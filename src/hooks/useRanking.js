import { useState } from 'react';

function useRanking(unRankedData) {
  const [rankedData, setRankedData] = useState(null);
  
// For each of the two groups,
// For each individual statistic (column heading), loop through all the teams and write these values into an array, sort the array, based on the ranking criteria, create a new className property on the appropriate location on the original data's object.
  console.log("unRankedData: ", unRankedData);
  setRankedData(unRankedData);
/* 
  function assignRanking(teams) {
    // Sort teams based on homeRuns and triples
    teams.forEach(team => {
      // Sort by homeRuns first
      team.hitting.homeRuns.rank = teams
        .map(t => t.hitting.homeRuns.value)
        .sort((a, b) => b - a)
        .indexOf(team.hitting.homeRuns.value) + 1;  // +1 for 1-based rank
      
      // Sort by triples next
      team.hitting.triples.rank = teams
        .map(t => t.hitting.triples.value)
        .sort((a, b) => b - a)
        .indexOf(team.hitting.triples.value) + 1;  // +1 for 1-based rank
    });
  
    return teams;
  }
  
  rankedData = assignRanking(unRankedData);
  console.log(rankedData);
  setRankedData(rankedData); */

  return rankedData;
};

export default useRanking;