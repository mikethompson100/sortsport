import { useState } from "react";

function useRanking(unRankedData) {
  const [rankedData, setRankedData] = useState(null);
  
// For each of the two groups,
// For each individual statistic (column heading), loop through all the teams and write these values into an array, sort the array, based on the ranking criteria, create a new className property on the appropriate location on the original data's object. 

/* data: {
  hitting: {
    stats: [
      {
        splits: [
          {
            stat: {
              homeRuns: number, 
              homeRuns: {
                                number,
                                rank: 1 
                        },
              RBIs: number,
              triples: 
            },
            team: {
              id: number,
              name: string
            }
          }
        ]
      }
    ]
  },
 */
  console.log("unRankedData: ", unRankedData);
  //console.log("unRankedData.hitting: ", unRankedData.hitting);





  return unRankedData;
};

export default useRanking;