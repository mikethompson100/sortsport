import { useState, useEffect } from 'react';
import MLBStatsAPI from 'mlb-stats-api';
import {MLB, NFL, NBA, NHL} from '../constants/leagueAPI';
const LEAGUEAPI = MLB;
const mlbStats = new MLBStatsAPI();

function useStats() {
    const [data, setData] = useState(null); // State to store fetched data
    const [loading, setLoading] = useState(true); // State to manage loading
    const [error, setError] = useState(null); // State to store errors
    console.log("data:", data);
    // Define an async function to fetch data
    const fetchData = async () => {
        try {
            const url = `${LEAGUEAPI}` + "teams/108/stats?season=2024&group=hitting&stats=season";
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            let result = await response.json();
/*             result = result.teams;
			const filterByLeagueId = (result, leagueId1, leagueId2) => {
                return result.filter(function(item) {
                    return (item.league.id === leagueId1) || (item.league.id === leagueId2);
                }) 
              }
              const filteredData = filterByLeagueId(result, 103, 104);
              console.log(filteredData); */
            setData(result); // Update state with fetched data
        } catch (err) {
            setError(err.message); // Update state with error message
        } finally {
            setLoading(false); // Set loading to false once done
        }
    };

    // Use useEffect to call fetchData on component mount
    useEffect(() => {
        fetchData();
    }, []); // Empty dependency array ensures it runs only once
    const stats = {data, loading, error}
    return stats;
}

export default useStats;