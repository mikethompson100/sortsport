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
            const totalStats = { hitting, pitching };
            console.log(totalStats);
            setData(totalStats);
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