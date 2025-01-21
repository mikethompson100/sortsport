import { useState, useEffect } from 'react';
import MLBStatsAPI from 'mlb-stats-api';
const mlbStats = new MLBStatsAPI();

function useTeams() {
    const [data, setData] = useState(null); // State to store fetched data
    const [loading, setLoading] = useState(true); // State to manage loading
    const [error, setError] = useState(null); // State to store errors

    // Define an async function to fetch data
    const fetchData = async () => {
        try {
            const response = await mlbStats.getTeams(); 
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            let result = await response.json();
            result = result.teams;
			const filterByLeagueId = (result, leagueId1, leagueId2) => {
                return result.filter(function(item) {
                    return (item.league.id === leagueId1) || (item.league.id === leagueId2);
                }) 
              }
              const filteredData = filterByLeagueId(result, 103, 104); // American and National MLB leagues
              filteredData.sort((a, b) => b.id - a.id);
            setData(filteredData); // Update state with fetched data
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
    const teams = {data, loading, error}
    return teams;
}

export default useTeams; 