import { useState, useEffect } from 'react';
import { MLB_TEAM_STATS, MLB_ANGELS_STATS } from '../constants/leagueAPI';

const apiUrls = [
    MLB_TEAM_STATS,
    MLB_ANGELS_STATS
];

function useData() {
    const [data, setData] = useState(null); // State to store fetched data
    const [loading, setLoading] = useState(true); // State to manage loading
    const [error, setError] = useState(null); // State to store errors

// Function to fetch data from multiple APIs
async function fetchMultipleApis() {
    try {
        const responses = await Promise.all(
            apiUrls.map(url => fetch(url))
        );

        // Check if all responses are OK
        const jsonData = await Promise.all(
            responses.map(response => {
                if (!response.ok) {
                    throw new Error(`Failed to fetch from ${response.url}: ${response.statusText}`);
                }
                return response.json();
            })
        );

        // jsonData now contains the data from all APIs
        console.log('Stats:', jsonData[0]); // Data from the first endpoint
        console.log('Angels:', jsonData[1]); // Data from the second endpoint
        setData(data); 
    } catch (err) {
        setError(err.message); // Update state with error message
    } finally {
        setLoading(false); // Set loading to false once done
    }
}

    // Use useEffect to call fetchData on component mount
    useEffect(() => {
        fetchMultipleApis(MLB_TEAM_STATS, MLB_ANGELS_STATS);
    }, []); // Empty dependency array ensures it runs only once
    const apis = { data, loading, error }
    return apis;
}

export default useData;