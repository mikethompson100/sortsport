import React from 'react';
import { useState } from 'react';

function TeamsTable(props) {
    const [sortedBy, setSortedBy] = useState("NAME"); // State to store fetched data
    if (props.statistics.loading){
        return <div>Loading...</div>;
    }

    const handleSort = (field) => {
        // If the user clicks the same sort column, reverse the sort order
        setSortedBy(prev => prev === field ? `-${field}` : field);
    };

    const records = [...props.statistics.data];
    const sortedRecords = [...records].sort((a, b) => {
        if (sortedBy === "NAME") return a.team.name > b.team.name ? 1 : -1;
        else if (sortedBy === "-NAME") return a.team.name < b.team.name ? 1 : -1;
        else if (sortedBy === "HR") return a.stat.homeRuns - b.stat.homeRuns;
        else if (sortedBy === "-HR") return b.stat.homeRuns - a.stat.homeRuns;
        else if (sortedBy === "ABPH") return a.stat.atBatsPerHomeRun - b.stat.atBatsPerHomeRun;
        else if (sortedBy === "-ABPH") return b.stat.atBatsPerHomeRun - a.stat.atBatsPerHomeRun;
        else if (sortedBy === "SO") return a.stat.strikeOuts - b.stat.strikeOuts;
        else if (sortedBy === "-SO") return b.stat.strikeOuts - a.stat.strikeOuts;
        else if (sortedBy === "GO") return a.stat.groundOuts - b.stat.groundOuts;
        else if (sortedBy === "-GO") return b.stat.groundOuts - a.stat.groundOuts;
        else if (sortedBy === "AO") return a.stat.airOuts - b.stat.airOuts;
        else if (sortedBy === "-AO") return b.stat.airOuts - a.stat.airOuts;
        return 0; // Default case if no sorting is applied
    });
    
    // Render the component
    return (
        <div>
            {props.statistics.loading && <p>Loading...</p>} {/* Show loading message */}
            {props.statistics.error && <p>Error: {props.statistics.error}</p>} {/* Show error message */}
            {props.statistics.data && ( /* Render data when available */
                <table>
                    <tbody>
                        <tr>
                            <td>Season:</td>
                            <td><button onClick={() => handleSort('NAME')}>Team:</button></td>
                            <td><button onClick={() => handleSort('HR')}>HRs:</button></td>
                            <td><button onClick={() => handleSort('ABPH')}>AB/PH:</button></td>
                            <td><button onClick={() => handleSort('SO')}>SOs:</button></td>
                            <td><button onClick={() => handleSort('GO')}>GOs:</button></td>
                            <td><button onClick={() => handleSort('AO')}>AOs:</button></td>
                        </tr>
                        {sortedRecords.map(record => (
                        <tr key={record.team.id}>
                            <td>{record.season}</td>
                            <td>{record.team.name}</td>
                            <td>{record.stat.homeRuns}</td>
                            <td>{record.stat.atBatsPerHomeRun}</td>
                            <td>{record.stat.strikeOuts}</td>
                            <td>{record.stat.groundOuts}</td>
                            <td>{record.stat.airOuts}</td>
                        </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}

export default TeamsTable;
