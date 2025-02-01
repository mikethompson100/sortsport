import React from 'react';
import { useState } from 'react';

function TeamsTable(props) {
    const [sortedBy, setSortedBy] = useState("NAME"); // State to set by which column the data is sorted
    const [group, setGroup] = useState("hitting");  // State to set by which group data will be shown in the table (hitting/pitching)
    if (props.result.loading) {
        return <div>Loading...</div>;
    }

    const handleSort = (field) => {
        // If the user clicks the same sort column, reverse the sort order
        setSortedBy(prev => prev === field ? `-${field}` : field);
    };

    let records = {};
    if (group === "hitting") {
        records = props.result.data.hitting.stats[0].splits;
    }
    else if (group === "pitching") {
        records = props.result.data.pitching.stats[0].splits;
    }

    let sortedRecords = [];
    if (group === "hitting") {
        sortedRecords = [...records].sort((a, b) => {
            if (sortedBy === "NAME") return a.team.name > b.team.name ? 1 : -1;
            else if (sortedBy === "-NAME") return a.team.name < b.team.name ? 1 : -1;
            else if (sortedBy === "RUNS") return a.stat.runs - b.stat.runs;
            else if (sortedBy === "-RUNS") return b.stat.runs - a.stat.runs;
            else if (sortedBy === "HIT") return a.stat.hits - b.stat.hits;
            else if (sortedBy === "-HIT") return b.stat.hits - a.stat.hits;
            else if (sortedBy === "2B") return a.stat.doubles - b.stat.doubles;
            else if (sortedBy === "-2B") return b.stat.doubles - a.stat.doubles;
            else if (sortedBy === "3B") return a.stat.triples - b.stat.triples;
            else if (sortedBy === "-3B") return b.stat.triples - a.stat.triples;
            else if (sortedBy === "HR") return a.stat.homeRuns - b.stat.homeRuns;
            else if (sortedBy === "-HR") return b.stat.homeRuns - a.stat.homeRuns;
            else if (sortedBy === "RBI") return a.stat.rbi - b.stat.rbi;
            else if (sortedBy === "-RBI") return b.stat.rbi - a.stat.rbi;
            else if (sortedBy === "ABPH") return a.stat.atBatsPerHomeRun - b.stat.atBatsPerHomeRun;
            else if (sortedBy === "-ABPH") return b.stat.atBatsPerHomeRun - a.stat.atBatsPerHomeRun;
            else if (sortedBy === "BB") return a.stat.baseOnBalls - b.stat.baseOnBalls;
            else if (sortedBy === "-BB") return b.stat.baseOnBalls - a.stat.baseOnBalls;
            else if (sortedBy === "SO") return a.stat.strikeOuts - b.stat.strikeOuts;
            else if (sortedBy === "-SO") return b.stat.strikeOuts - a.stat.strikeOuts;
            else if (sortedBy === "SB") return a.stat.stolenBases - b.stat.stolenBases;
            else if (sortedBy === "-SB") return b.stat.stolenBases - a.stat.stolenBases;
            else if (sortedBy === "AVG") return a.stat.avg - b.stat.avg;
            else if (sortedBy === "-AVG") return b.stat.avg - a.stat.avg;
            else if (sortedBy === "GO") return a.stat.groundOuts - b.stat.groundOuts;
            else if (sortedBy === "-GO") return b.stat.groundOuts - a.stat.groundOuts;
            else if (sortedBy === "AO") return a.stat.airOuts - b.stat.airOuts;
            else if (sortedBy === "-AO") return b.stat.airOuts - a.stat.airOuts;
            else if (sortedBy === "GIDP") return a.stat.groundIntoDoublePlay - b.stat.groundIntoDoublePlay;
            else if (sortedBy === "-GIDP") return b.stat.groundIntoDoublePlay - a.stat.groundIntoDoublePlay;
            return 0; // Default case if no sorting is applied
        })
    }
    else if (group === "pitching") {
        sortedRecords = [...records].sort((a, b) => {
            if (sortedBy === "NAME") return a.team.name > b.team.name ? 1 : -1;
            else if (sortedBy === "-NAME") return a.team.name < b.team.name ? 1 : -1;
            else if (sortedBy === "ERA") return a.stat.era - b.stat.era;
            else if (sortedBy === "-ERA") return b.stat.era - a.stat.era;
            else if (sortedBy === "R") return a.stat.runs - b.stat.runs;
            else if (sortedBy === "-R") return b.stat.runs - a.stat.runs;
            else if (sortedBy === "HR") return a.stat.homeRuns - b.stat.homeRuns;
            else if (sortedBy === "-HR") return b.stat.homeRuns - a.stat.homeRuns;
            else if (sortedBy === "K") return a.stat.strikeOuts - b.stat.strikeOuts;
            else if (sortedBy === "-K") return b.stat.strikeOuts - a.stat.strikeOuts;
            else if (sortedBy === "BB") return a.stat.baseOnBalls - b.stat.baseOnBalls;
            else if (sortedBy === "-BB") return b.stat.baseOnBalls - a.stat.baseOnBalls;
            else if (sortedBy === "SOTWR") return a.stat.strikeoutWalkRatio - b.stat.strikeoutWalkRatio;
            else if (sortedBy === "-SOTWR") return b.stat.strikeoutWalkRatio - a.stat.strikeoutWalkRatio;
            else if (sortedBy === "GO") return a.stat.groundOuts - b.stat.groundOuts;
            else if (sortedBy === "-GO") return b.stat.groundOuts - a.stat.groundOuts;
            else if (sortedBy === "AO") return a.stat.airOuts - b.stat.airOuts;
            else if (sortedBy === "-AO") return b.stat.airOuts - a.stat.airOuts;
            else if (sortedBy === "GOTAO") return a.stat.groundOutsToAirouts - b.stat.groundOutsToAirouts;
            else if (sortedBy === "-GOTAO") return b.stat.groundOutsToAirouts - a.stat.groundOutsToAirouts;
            else if (sortedBy === "AVG") return a.stat.avg - b.stat.avg;
            else if (sortedBy === "-AVG") return b.stat.avg - a.stat.avg;
            else if (sortedBy === "SB") return a.stat.stolenBases - b.stat.stolenBases;
            else if (sortedBy === "-SB") return b.stat.stolenBases - a.stat.stolenBases;
            else if (sortedBy === "CS") return a.stat.caughtStealing - b.stat.caughtStealing;
            else if (sortedBy === "-CS") return b.stat.caughtStealing - a.stat.caughtStealing;
            else if (sortedBy === "SBP") return a.stat.stolenBasePercentage - b.stat.stolenBasePercentage;
            else if (sortedBy === "-SBP") return b.stat.stolenBasePercentage - a.stat.stolenBasePercentage;
            else if (sortedBy === "GIDP") return a.stat.groundIntoDoublePlay - b.stat.groundIntoDoublePlay;
            else if (sortedBy === "-GIDP") return b.stat.groundIntoDoublePlay - a.stat.groundIntoDoublePlay;
            return 0; // Default case if no sorting is applied
        })
    }

    // Render the component
    return (
        <div>
            <div className="parent">
                <table className="topTable">
                    <tbody>
                        <tr>
                            <td>
                                <div>{records[0].season}</div>
                                <button onClick={() => { setGroup("hitting"); setSortedBy("NAME"); }} className={(group === "hitting") ? "active" : "inactive"}>Batting</button>
                                <button onClick={() => { setGroup("pitching"); setSortedBy("NAME"); }} className={(group === "pitching") ? "active" : "inactive"}>Pitching</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            {props.result.loading && <p>Loading...</p>} {/* Show loading message */}
            {props.result.error && <p>Error: {props.result.error}</p>} {/* Show error message */}
            {props.result.data && (group === "hitting") && ( /* Render data when available */
                <table>
                    <tbody>
                        <tr>
                            <td className="team">Team:</td>
                            <td className="top"><button onClick={() => handleSort('RUNS')} title="Runs">Runs:</button></td>
                            <td className="top"><button onClick={() => handleSort('HIT')} title="Hits">Hits:</button></td>
                            <td className="top"><button onClick={() => handleSort('2B')} title="Doubles">2Bs:</button></td>
                            <td className="top"><button onClick={() => handleSort('3B')} title="Triples">3Bs:</button></td>
                            <td className="top"><button onClick={() => handleSort('HR')} title="Homeruns">HRs:</button></td>
                            <td className="top"><button onClick={() => handleSort('RBI')} title="Runs batted in">RBIs:</button></td>
                            <td className="top"><button onClick={() => handleSort('ABPH')} title="At Bats per Homerun">AB/PHr:</button></td>
                            <td className="top"><button onClick={() => handleSort('BB')} title="Walks">Walks:</button></td>
                            <td className="top"><button onClick={() => handleSort('SO')} title="Strikeouts">SOs:</button></td>
                            <td className="top"><button onClick={() => handleSort('SB')} title="Stolen Bases">SBs:</button></td>
                            <td className="top"><button onClick={() => handleSort('AVG')} title="Batting Average">AVG:</button></td>
                            <td className="top"><button onClick={() => handleSort('GO')} title="Groundouts">GOs:</button></td>
                            <td className="top"><button onClick={() => handleSort('AO')} title="Airouts">AOs:</button></td>
                            <td className="top"><button onClick={() => handleSort('GIDP')} title="Ground into Double Play">GIDP:</button></td>
                        </tr>
                        {sortedRecords.map(record => (
                            <tr key={record.team.id}>
                                <td className="left">{record.team.name}</td>
                                <td>{record.stat.runs}</td>
                                <td>{record.stat.hits}</td>
                                <td>{record.stat.doubles}</td>
                                <td>{record.stat.triples}</td>
                                <td>{record.stat.homeRuns}</td>
                                <td>{record.stat.rbi}</td>
                                <td>{record.stat.atBatsPerHomeRun}</td>
                                <td>{record.stat.baseOnBalls}</td>
                                <td>{record.stat.strikeOuts}</td>
                                <td>{record.stat.stolenBases}</td>
                                <td>{record.stat.avg}</td>
                                <td>{record.stat.groundOuts}</td>
                                <td>{record.stat.airOuts}</td>
                                <td>{record.stat.groundIntoDoublePlay}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
            {props.result.data && (group === "pitching") && ( /* Render data when available */
                <table>
                    <tbody>
                        <tr>
                            <td className="left">Team:</td>
                            <td className="top"><button onClick={() => handleSort('ERA')} title="Earned Run Average">ERA:</button></td>
                            <td className="top"><button onClick={() => handleSort('R')} title="Runs">Runs:</button></td>
                            <td className="top"><button onClick={() => handleSort('HR')} title="Homeruns">HRs:</button></td>
                            <td className="top"><button onClick={() => handleSort('K')} title="StrikeOuts">Ks:</button></td>
                            <td className="top"><button onClick={() => handleSort('BB')} title="Walks">BBs:</button></td>
                            <td className="top"><button onClick={() => handleSort('SOTWR')} title="Strikeout to Walk Ratio">SOtWR:</button></td>
                            <td className="top"><button onClick={() => handleSort('GO')} title="Groundouts">GOs:</button></td>
                            <td className="top"><button onClick={() => handleSort('AO')} title="Airouts">AOs:</button></td>
                            <td className="top"><button onClick={() => handleSort('GOTAO')} title="Ground out to Air outs">GOtAO:</button></td>
                            <td className="top"><button onClick={() => handleSort('AVG')} title="Opponents Batting Avg">AVG:</button></td>
                            <td className="top"><button onClick={() => handleSort('SB')} title="Stolen Bases">SBs:</button></td>
                            <td className="top"><button onClick={() => handleSort('CS')} title="Caught Stealing">CS:</button></td>
                            <td className="top"><button onClick={() => handleSort('SBP')} title="Stolen Base Percentage">SBP:</button></td>
                            <td className="top"><button onClick={() => handleSort('GIDP')} title="Ground into Double Play">GIDP:</button></td>
                        </tr>
                        {sortedRecords.map(record => (
                            <tr key={record.team.id}>
                                <td className="left">{record.team.name}</td>
                                <td>{record.stat.era}</td>
                                <td>{record.stat.runs}</td>
                                <td>{record.stat.homeRuns}</td>
                                <td>{record.stat.strikeOuts}</td>
                                <td>{record.stat.baseOnBalls}</td>
                                <td>{record.stat.strikeoutWalkRatio}</td>
                                <td>{record.stat.groundOuts}</td>
                                <td>{record.stat.airOuts}</td>
                                <td>{record.stat.groundOutsToAirouts}</td>
                                <td>{record.stat.avg}</td>
                                <td>{record.stat.stolenBases}</td>
                                <td>{record.stat.caughtStealing}</td>
                                <td>{record.stat.stolenBasePercentage}</td>
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
