import React, { useState, useEffect } from 'react';
const MLBStatsAPI = require('mlb-stats-api');
const mlbStats = new MLBStatsAPI();

function Test() {
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

    // Render the component
    return (
        <div>
            {loading && <p>Loading...</p>} {/* Show loading message */}
            {error && <p>Error: {error}</p>} {/* Show error message */}
            {data && ( /* Render data when available */
                <div>
				{Object.keys(data).map(key => (
					<div key={key}>
						<p><strong>Team: </strong> {data[key].name}</p>
  						<p><strong>Venue: </strong> {data[key].venue.name}</p>
						<p><strong>City: </strong> {data[key].locationName}</p>
						<hr/>
					</div>
				))}
                </div>
            )}
        </div>
    );
}

//export default DataFetchingComponent;

export default Test;
