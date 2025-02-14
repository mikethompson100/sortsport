import { useState, useEffect } from 'react';
import { MLB_STATS_HITTING, MLB_STATS_PITCHING } from '../constants/leagueAPI';

function useData() {
    const [data, setData] = useState(null); // State to store fetched data
    const [loading, setLoading] = useState(true); // State to manage loading
    const [error, setError] = useState(null); // State to store errors

    const fetchData = async () => {
        try {
            const urls = [
                MLB_STATS_HITTING,
                MLB_STATS_PITCHING
            ];
            const [hitting, pitching] = await Promise.all(urls.map(url => fetch(url).then(res => res.json())));

            // Syncing both hitting and pitching to be sorted by team name
            hitting.stats[0].splits.sort((a, b) => a.team.name.localeCompare(b.team.name));
            pitching.stats[0].splits.sort((a, b) => a.team.name.localeCompare(b.team.name));

            // restructuring
            const teamsArray = new Array(30).fill(null).map(() => []);
  

            // const teamsArray = [...new Array(30).keys()].map((n) => {
            //     const name = hitting.stats[0].splits[0].team.name;
            //     const id = hitting.stats[0].splits[0].team.id;

            //     return {
            //         id,
            //         name
            //     }
            // })

            for (let i = 0, j = 0; i < 30; i++, j++) {

                //if (j >= hitting.stats[0].splits.length) { j = 0; }

                // teamsArray[i] === []
                teamsArray[i].team = {};
                // [].team = {}
                teamsArray[i].team.name = hitting.stats[0].splits[j]?.team.name || "Unknown Team";
                teamsArray[i].team.id = hitting.stats[0].splits[j]?.team.id || "Unknown Id";

                teamsArray[i].hitting = {};

                // hitting.stats[0].splits[j].stat
                /*
                {
                    "homeRuns": 0,
                    "strikeOuts": 0,
                    "hits": 0,
                }
                */
            
                // Object.entries(hitting.stats[0].splits[j].stat)
                /*
                [
                    ["homeRuns", 0],
                    ["strikeOuts", 0],
                    ["hits", 0]
                ]
                */

                const entries = Object.entries(hitting.stats[0].splits[j].stat)
                for (const [key, value] of entries) {
                    teamsArray[i].hitting[key] = { value: value, rank: 0 };
                }

                /*
                for (const key in hitting.stats[0].splits[j].stat) {
                    const value = hitting.stats[0].splits[j].stat[key];
                    teamsArray[i].hitting[key] = { value: value, rank: 0 };
                }
                */

                teamsArray[i].pitching = {};
                for (const [key, value] of Object.entries(pitching.stats[0].splits[j].stat)) {
                    teamsArray[i].pitching[key] = { value: value };
                    teamsArray[i].pitching[key].rank = 0;
                }

                teamsArray[i].season = hitting.stats[0].splits[0].season;

            }            
            //console.log("TEAMSARRAY: ", teamsArray);
            // Sorting array by team.name to prepare data for first render (Outer team array)
            teamsArray.sort((a, b) => a.team.name.localeCompare(b.team.name));
            console.log("useData teamsArray: ", teamsArray);
            setData(teamsArray);
        }
        catch (error) {
            console.error("Error fetching data:", error);
            setError(error.message);
        }
        finally {
            setLoading(false);
        }
    };

    // Use useEffect to call fetchData on component mount
    useEffect(() => {
        fetchData();
    }, []); // Empty dependency array ensures it runs only once

    const result = { data, loading, error }

    return result;
}

export default useData;