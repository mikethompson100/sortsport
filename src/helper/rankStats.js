
// For each of the two groups,
// For each individual statistic (column heading), loop through all the teams and write these values into an array, sort the array, based on the ranking criteria, create a new className property on the appropriate location on the original data's object.


// Sorting array by team.name to prepare data for first render (Outer team array)

export function useRanking(teams) {
  // Sort teams based on homeRuns and triples
  teams.forEach(team => {
    // Iterate over each property in team.hitting
    ['hitting', 'pitching'].forEach(group => {
      Object.entries(team[group]).forEach(([stat, value]) => {
        // Sort by this stat's value and assign rank
        team[group][stat].rank = teams
          .map(t => t[group][stat].value)
          .sort((a, b) => b - a)
          // need to rewrite for tie cases
          .indexOf(value.value) + 1;  // +1 for 1-based rank
      });
    });
  });

  return teams;
}

export default useRanking;