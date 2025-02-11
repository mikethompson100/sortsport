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
 
            // restructuring
            const teamsArray = new Array(30).fill(null).map(() => []);
            for (let i = 0, j = 0; i < 30; i++, j++) {
                if (j >= hitting.stats[0].splits.length) { j = 0; }
                teamsArray[i].team = {};
                teamsArray[i].team.name = hitting.stats[0].splits[j]?.team.name || "Unknown Team";                
                teamsArray[i].team.id = hitting.stats[0].splits[j]?.team.id || "Unknown Id";  
                
                teamsArray[i].hitting = {};
                for (const [key, value] of Object.entries(hitting.stats[0].splits[j].stat)) {
                    teamsArray[i].hitting[key] = value;
                }
                teamsArray[i].pitching = {};
                for (const [key, value] of Object.entries(pitching.stats[0].splits[j].stat)) {
                    teamsArray[i].pitching[key] = value;
                }
                teamsArray[i].season = hitting.stats[0].splits[0].season;

            }
            console.log("TEAMSARRAY:", teamsArray);
        }
        catch (error) {
            console.error("Error fetching data:", error);
            setError(error.message);
        }
        finally {
            //setLoading(false);
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