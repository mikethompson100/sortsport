import { useState, useEffect } from 'react';
import MLBStatsAPI from 'mlb-stats-api';
import { MLB } from '../constants/leagueAPI';
const LEAGUEAPI = MLB;
const mlbStats = new MLBStatsAPI();

function useStats() {
    const [data, setData] = useState(null); // State to store fetched data
    const [loading, setLoading] = useState(true); // State to manage loading
    const [error, setError] = useState(null); // State to store errors
    // Define an async function to fetch data
    const fetchData = async () => {
        try {
            const url = `${LEAGUEAPI}teams/stats?season=2024&group=hitting&stats=season&sportIds=1`;
            const response = await fetch(url)
            let data = await response.json();
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            setData(data); // Update state with fetched data
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
    const stats = { data, loading, error }
    return stats;
}

export default useStats;