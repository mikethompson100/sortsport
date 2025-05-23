
/* original
export function useRanking(teams) {
  console.log("teams: ", teams);
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
} */

export function useRanking(teams) {
  /* teams.forEach(team => {
      ['hitting', 'pitching'].forEach(group => {
        Object.entries(team[group]).forEach(([stat, value]) => {
          team[group][stat].rank = teams
            .map(t => t[group][stat].value)
            .sort((a, b) => b - a)
            .indexOf(value.value) + 1;
        });
      });
    }); */

  teams.forEach(team => {
    ['hitting', 'pitching'].forEach(group => {
      Object.entries(team[group]).forEach(([stat, value]) => {
        const sortedValues = teams
          .map(t => t[group][stat].value)
          .sort((a, b) => b - a);  // Sort descending
        
        // Find the rank of the current team's stat value with tie handling
        const rank = sortedValues.reduce((acc, currValue, index) => {
          // If the value is the same as the previous, keep the same rank
          if (index > 0 && currValue === sortedValues[index - 1]) {
            acc.push(acc[acc.length - 1]);
          }
          else {
            acc.push(index + 1); // Otherwise, assign the new rank
          }
          return acc;
        }, []);

        // Now assign the rank based on the value  
        const rankValue = rank[sortedValues.indexOf(value.value)];
        team[group][stat].rank = rankValue; // Set the rank

      });
    });
  });
  return teams;
}
export default useRanking;

