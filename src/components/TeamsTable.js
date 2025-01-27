import React from 'react';
import { useState } from 'react';

function TeamsTable(props) {
    const [sortedBy, setSortedBy] = useState("NAME"); // State to store fetched data
    if (props.statistics.loading) {
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
        else if (sortedBy === "BB") return a.stat.baseOnBalls - b.stat.baseOnBalls;
        else if (sortedBy === "-BB") return b.stat.baseOnBalls - a.stat.baseOnBalls;
        else if (sortedBy === "AVG") return a.stat.avg - b.stat.avg;
        else if (sortedBy === "-AVG") return b.stat.avg - a.stat.avg;
        else if (sortedBy === "GIDP") return a.stat.groundIntoDoublePlay - b.stat.groundIntoDoublePlay;
        else if (sortedBy === "-GIDP") return b.stat.groundIntoDoublePlay - a.stat.groundIntoDoublePlay;
        else if (sortedBy === "RBI") return a.stat.rbi - b.stat.rbi;
        else if (sortedBy === "-RBI") return b.stat.rbi - a.stat.rbi;
        else if (sortedBy === "HIT") return a.stat.rbi - b.stat.rbi;
        else if (sortedBy === "-HIT") return b.stat.rbi - a.stat.rbi;
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
                            <td class="left">Team:</td>
                            <td><button onClick={() => handleSort('AVG')} title="Batting Average">AVG:</button></td>
                            <td><button onClick={() => handleSort('HIT')} title="Hits">Hits:</button></td>
                            <td><button onClick={() => handleSort('HR')} title="Homeruns">HRs:</button></td>
                            <td><button onClick={() => handleSort('RBI')} title="Homeruns">RBIs:</button></td>
                            <td><button onClick={() => handleSort('ABPH')} title="At Bats per Homerun">AB/PHr:</button></td>
                            <td><button onClick={() => handleSort('BB')} title="Walks">Walks:</button></td>
                            <td><button onClick={() => handleSort('SO')} title="Strikeouts">SOs:</button></td>
                            <td><button onClick={() => handleSort('GO')} title="Groundouts">GOs:</button></td>
                            <td><button onClick={() => handleSort('AO')} title="Airouts">AOs:</button></td>
                            <td><button onClick={() => handleSort('GIDP')} title="Ground into Double Play">GIDP:</button></td>
                        </tr>
                        {sortedRecords.map(record => (
                            <tr key={record.team.id}>
                                <td>{record.season}</td>
                                <td class="left">{record.team.name}</td>
                                <td>{record.stat.avg}</td>
                                <td>{record.stat.hits}</td>
                                <td>{record.stat.homeRuns}</td>
                                <td>{record.stat.rbi}</td>
                                <td>{record.stat.atBatsPerHomeRun}</td>
                                <td>{record.stat.baseOnBalls}</td>
                                <td>{record.stat.strikeOuts}</td>
                                <td>{record.stat.groundOuts}</td>
                                <td>{record.stat.airOuts}</td>
                                <td>{record.stat.groundIntoDoublePlay}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}

export default TeamsTable;
