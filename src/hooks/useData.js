import { useState, useEffect } from 'react';
import { MLB_STATS } from '../constants/leagueAPI';

function useData() {
    const [data, setData] = useState(null); // State to store fetched data
    const [loading, setLoading] = useState(true); // State to manage loading
    const [error, setError] = useState(null); // State to store errors

const fetchData = async () => {
    try {
        const url = `${MLB_STATS}`;
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        let data = await response.json();
        const targetData = data.stats[0].splits;
        
        setData(targetData); // Update state with fetched data
    } catch (err) {
        setError(err.message); // Update state with error message
    } finally {
        setLoading(false); // Set loading to false once done
    }
};

    // Use useEffect to call fetchData on component mount
    useEffect(() => {
        fetchData(MLB_STATS);
    }, []); // Empty dependency array ensures it runs only once
    const allData = { data, loading, error }
    return allData;
}

export default useData;