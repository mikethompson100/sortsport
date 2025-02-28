// Sorting array by team.name to prepare data for first render

export function useRanking(teams) {
  // Sort teams based on homeRuns and triples
  teams.forEach(team => {
    // Iterate over each property in team.hitting and team.pitching
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