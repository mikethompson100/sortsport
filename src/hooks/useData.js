import { useState, useEffect } from 'react';
//import { MLB_STATS_HITTING, MLB_STATS_PITCHING } from '../constants/leagueAPI';
import rankStats from '../helper/rankStats';
import hitting from '../data/hitting.json';
import pitching from '../data/pitching.json';
import { allHittingColumns, allPitchingColumns } from '../constants/constants';
import usedColumn from '../helper/usedColumn';

function useData() {
    const [data, setData] = useState(null); // State to store fetched data
    const [loading, setLoading] = useState(true); // State to manage loading
    const [error, setError] = useState(null); // State to store errors

    const fetchData = async () => {
        try {
            // Syncing both hitting and pitching to be sorted by team name
            hitting.stats[0].splits.sort((a, b) => a.team.name.localeCompare(b.team.name));
            pitching.stats[0].splits.sort((a, b) => a.team.name.localeCompare(b.team.name));

            const indexes = [...new Array(30).keys()];
            // [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, ... 29]
            const teamsArray = indexes.map((index) => {

                const hittingSplit = hitting.stats[0].splits[index];
                const pitchingSplit = pitching.stats[0].splits[index];
                const team = {
                    hitting: {},
                    pitching: {}
                }
                // Filter out unused columns from raw data
                for (const key in hittingSplit.stat) {
                    if (usedColumn(key, allHittingColumns)) {
                        const value = hittingSplit.stat[key];
                        team.hitting[key] = { value: value, rank: 0 };
                    }
                }
                for (const key in pitchingSplit.stat) {
                    if (usedColumn(key, allPitchingColumns)) {
                        const value = pitchingSplit.stat[key];
                        team.pitching[key] = { value: value, rank: 0 };
                    }
                }
                team.season = hittingSplit.season;
                team.team = hittingSplit.team;
                return team
            })
            teamsArray.sort((a, b) => a.team.name.localeCompare(b.team.name));
            const rankedData = rankStats(teamsArray);
            setData(rankedData);
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
        fetchData(); // Sets state
    }, []); // Empty dependency array ensures it runs only once

    const result = { data, loading, error }

    return result;
}

export default useData;