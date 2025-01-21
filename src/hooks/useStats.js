import { useState, useEffect } from 'react';
import MLBStatsAPI from 'mlb-stats-api';
import { MLB } from '../constants/leagueAPI';
import useTeams from './useTeams';

const LEAGUEAPI = MLB;
const mlbStats = new MLBStatsAPI();

function useStats() {
    const [data, setData] = useState(null); // State to store fetched data
    const [loading, setLoading] = useState(true); // State to manage loading
    const [error, setError] = useState(null); // State to store errors
    const { data: teamsData, loading: teamsLoading, error: teamsError } = useTeams();

    const fetchData = async () => { 
        if (teamsLoading) return; // Don't fetch if teams data is still loading

        try {
            const url = `${LEAGUEAPI}teams/stats?season=2024&group=hitting&stats=season&sportIds=1`;
            const response = await fetch(url)
            let data = await response.json();
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            console.log("STATS Teams Array fetched Unsorted:  ", data.stats[0].splits);
            console.log("STATS Teams Array fetched Unsorted:  ", data.stats[0].splits[0].team.name);
            const sortedStats = data.stats[0].splits.sort((a, b) => a.team.id - b.team.id);
            console.log("sortedStats: ", sortedStats);
            console.log("STATS Teams Array SORTED:  ", sortedStats[0].team.name);
/*             data.stats[0].splits.forEach(element => {
                console.log('Element id: ', element.team.id);
            }); */

/*             console.log("STATS Teams Array sorted: ", teamsData);
            teamsData.forEach(element => {
                console.log('Element id: ', element.id);
            });  */
            data = sortedStats;
            console.log(sortedStats[0]);
            setData(data); // Update state with fetched data
        } catch (err) {
            setError(err.message); // Update state with error message
        } finally {
            setLoading(false); // Set loading to false once done
        }
    };

    // Use useEffect to call fetchData on component mount
    useEffect(() => {
        if (!teamsLoading) {
            fetchData(); // Fetch stats if teams data is loaded
        }
    }, [teamsLoading]); // Empty dependency array ensures it runs only once
    const stats = { data, loading, error }
    return stats;
}

export default useStats;