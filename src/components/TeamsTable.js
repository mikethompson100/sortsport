import React from 'react';
import { useState } from 'react';

function TeamsTable(props) {
    const [sortedBy, setSortedBy] = useState("doubles"); // State to set by which column the data is sorted
    const [group, setGroup] = useState("hitting");  // State to set by which group data will be shown in the table (hitting/pitching)
    if (props.result.loading) {
        return <div>Loading...</div>;
    }

    const handleSort = (field) => {
        // If the user clicks the same sort column, reverse the sort order
        setSortedBy(prev => prev === field ? `-${field}` : field);
    };  
  
    const teamsArray = props.result.data;

     function sortTeams(teamsArray, category, stat, ascending = true) {
        teamsArray.sort((a, b) => {
            const aValue = a[category]?.[stat]?.value ?? 0; // Default to 0 if missing
            const bValue = b[category]?.[stat]?.value ?? 0;
            return ascending ? aValue - bValue : bValue - aValue;
        });
        return teamsArray;
    }
    console.log("teamsArray:", teamsArray);
    console.log("group:", group);
    console.log("sortedBy:", sortedBy);
    const sortedRecords = sortTeams(teamsArray, group, sortedBy, true);
    console.log(`teams sorted by current setSorted state value: `, sortedRecords); 

 /*
      if (group === "hitting") {
        sortedRecords = [props.result.data.sort((a, b) => {
            if (sortedBy === "NAME") return a.team.name > b.team.name ? 1 : -1;
            else if (sortedBy === "-NAME") return a.team.name < b.team.name ? 1 : -1;
            else if (sortedBy === "RUNS") return a.hitting.runs.value - b.hitting.runs.value;
            else if (sortedBy === "-RUNS") return b.hitting.runs.value - a.hitting.runs.value;
            else if (sortedBy === "HIT") return a.hitting.hits.value - b.hitting.hits.value;
            else if (sortedBy === "-HIT") return b.hitting.hits.value - a.hitting.hits.value;
            else if (sortedBy === "2B") return a.hitting.doubles.value - b.hitting.doubles.value;
            else if (sortedBy === "-2B") return b.hitting.doubles.value - a.hitting.doubles.value;
            else if (sortedBy === "3B") return a.hitting.triples.value - b.hitting.triples.value;
            else if (sortedBy === "-3B") return b.hitting.triples.value - a.hitting.triples.value;
            else if (sortedBy === "HR") return a.hitting.homeRuns.value - b.hitting.homeRuns.value;
            else if (sortedBy === "-HR") return b.hitting.homeRuns.value - a.hitting.homeRuns.value;
            else if (sortedBy === "RBI") return a.hitting.rbi.value - b.hitting.rbi.value;
            else if (sortedBy === "-RBI") return b.hitting.rbi.value - a.hitting.rbi.value;
            else if (sortedBy === "ABPH") return a.hitting.atBatsPerHomeRun.value - b.hitting.atBatsPerHomeRun.value;
            else if (sortedBy === "-ABPH") return b.hitting.atBatsPerHomeRun.value - a.hitting.atBatsPerHomeRun.value;
            else if (sortedBy === "BB") return a.hitting.baseOnBalls.value - b.hitting.baseOnBalls.value;
            else if (sortedBy === "-BB") return b.hitting.baseOnBalls.value - a.hitting.baseOnBalls.value;
            else if (sortedBy === "SO") return a.hitting.strikeOuts.value - b.hitting.strikeOuts.value;
            else if (sortedBy === "-SO") return b.hitting.strikeOuts.value - a.hitting.strikeOuts.value;
            else if (sortedBy === "SB") return a.hitting.stolenBases.value - b.hitting.stolenBases.value;
            else if (sortedBy === "-SB") return b.hitting.stolenBases.value - a.hitting.stolenBases.value;
            else if (sortedBy === "AVG") return a.hitting.avg.value - b.hitting.avg.value;
            else if (sortedBy === "-AVG") return b.hitting.avg.value - a.hitting.avg.value;
            else if (sortedBy === "GO") return a.hitting.groundOuts.value - b.hitting.groundOuts.value;
            else if (sortedBy === "-GO") return b.hitting.groundOuts.value - a.hitting.groundOuts.value;
            else if (sortedBy === "AO") return a.hitting.airOuts.value - b.hitting.airOuts.value;
            else if (sortedBy === "-AO") return b.hitting.airOuts.value - a.hitting.airOuts.value;
            else if (sortedBy === "GIDP") return a.hitting.groundIntoDoublePlay.value - b.hitting.groundIntoDoublePlay.value;
            else if (sortedBy === "-GIDP") return b.hitting.groundIntoDoublePlay.value - a.hitting.groundIntoDoublePlay.value;
            return 0; // Default case if no sorting is applied
        })
    }
    else if (group === "pitching") {
        sortedRecords = props.result.data.sort((a, b) => {
            if (sortedBy === "NAME") return a.team.name > b.team.name ? 1 : -1;
            else if (sortedBy === "-NAME") return a.team.name < b.team.name ? 1 : -1;
            else if (sortedBy === "ERA") return a.pitching.era.value - b.pitching.era.value;
            else if (sortedBy === "-ERA") return b.pitching.era.value - a.pitching.era.value;
            else if (sortedBy === "R") return a.pitching.runs.value - b.pitching.runs.value;
            else if (sortedBy === "-R") return b.pitching.runs.value - a.pitching.runs.value;
            else if (sortedBy === "HR") return a.pitching.homeRuns.value - b.pitching.homeRuns.value;
            else if (sortedBy === "-HR") return b.pitching.homeRuns.value - a.pitching.homeRuns.value;
            else if (sortedBy === "K") return a.pitching.strikeOuts.value - b.pitching.strikeOuts.value;
            else if (sortedBy === "-K") return b.pitching.strikeOuts.value - a.pitching.strikeOuts.value;
            else if (sortedBy === "BB") return a.pitching.baseOnBalls.value - b.pitching.baseOnBalls.value;
            else if (sortedBy === "-BB") return b.pitching.baseOnBalls.value - a.pitching.baseOnBalls.value;
            else if (sortedBy === "SOTWR") return a.pitching.strikeoutWalkRatio.value - b.pitching.strikeoutWalkRatio.value;
            else if (sortedBy === "-SOTWR") return b.pitching.strikeoutWalkRatio.value - a.pitching.strikeoutWalkRatio.value;
            else if (sortedBy === "GO") return a.pitching.groundOuts.value - b.pitching.groundOuts.value;
            else if (sortedBy === "-GO") return b.pitching.groundOuts.value - a.pitching.groundOuts.value;
            else if (sortedBy === "AO") return a.pitching.airOuts.value - b.pitching.airOuts.value;
            else if (sortedBy === "-AO") return b.pitching.airOuts.value - a.pitching.airOuts.value;
            else if (sortedBy === "GOTAO") return a.pitching.groundOutsToAirouts.value - b.pitching.groundOutsToAirouts.value;
            else if (sortedBy === "-GOTAO") return b.pitching.groundOutsToAirouts.value - a.pitching.groundOutsToAirouts.value;
            else if (sortedBy === "AVG") return a.pitching.avg.value - b.pitching.avg.value;
            else if (sortedBy === "-AVG") return b.pitching.avg.value - a.pitching.avg.value;
            else if (sortedBy === "SB") return a.pitching.stolenBases.value - b.pitching.stolenBases.value;
            else if (sortedBy === "-SB") return b.pitching.stolenBases.value - a.pitching.stolenBases.value;
            else if (sortedBy === "CS") return a.pitching.caughtStealing.value - b.pitching.caughtStealing.value;
            else if (sortedBy === "-CS") return b.pitching.caughtStealing.value - a.pitching.caughtStealing.value;
            else if (sortedBy === "SBP") return a.pitching.stolenBasePercentage.value - b.pitching.stolenBasePercentage.value;
            else if (sortedBy === "-SBP") return b.pitching.stolenBasePercentage.value - a.pitching.stolenBasePercentage.value;
            else if (sortedBy === "GIDP") return a.pitching.groundIntoDoublePlay.value - b.pitching.groundIntoDoublePlay.value;
            else if (sortedBy === "-GIDP") return b.pitching.groundIntoDoublePlay.value - a.pitching.groundIntoDoublePlay.value;
            return 0; // Default case if no sorting is applied
        })
      } 
     }*/

    const renderArray = [...sortedRecords];
    //console.log("renderArray: ", renderArray);

    // Render the component
    return (
        <div>
            <div className="parent">
                <table className="topTable">
                    <tbody>
                        <tr>
                            <td>
                                <div>2024 season</div>
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
                        {renderArray.map(record => (
                            <tr key={record.team.id}>
                                <td className="left">{record.team.name}</td>
                                <td>{record.hitting.runs.value}</td>
                                <td>{record.hitting.hits.value}</td>
                                <td>{record.hitting.doubles.value}</td>
                                <td>{record.hitting.triples.value}</td>
                                <td>{record.hitting.homeRuns.value}</td>
                                <td>{record.hitting.rbi.value}</td>
                                <td>{record.hitting.atBatsPerHomeRun.value}</td>
                                <td>{record.hitting.baseOnBalls.value}</td>
                                <td>{record.hitting.strikeOuts.value}</td>
                                <td>{record.hitting.stolenBases.value}</td>
                                <td>{record.hitting.avg.value}</td>
                                <td>{record.hitting.groundOuts.value}</td>
                                <td>{record.hitting.airOuts.value}</td>
                                <td>{record.hitting.groundIntoDoublePlay.value}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
            {props.result.data && (group === "pitching") && ( /* Render data when available */
                <table>
                    <tbody>
                        <tr>
                            <td className="team">Team:</td>
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
                        {renderArray.map(record => (
                            <tr key={record.team.id}>
                                <td className="left">{record.team.name}</td>
                                <td>{record.pitching.era.value}</td>
                                <td>{record.pitching.runs.value}</td>
                                <td>{record.pitching.homeRuns.value}</td>
                                <td>{record.pitching.strikeOuts.value}</td>
                                <td>{record.pitching.baseOnBalls.value}</td>
                                <td>{record.pitching.strikeoutWalkRatio.value}</td>
                                <td>{record.pitching.groundOuts.value}</td>
                                <td>{record.pitching.airOuts.value}</td>
                                <td>{record.pitching.groundOutsToAirouts.value}</td>
                                <td>{record.pitching.avg.value}</td>
                                <td>{record.pitching.stolenBases.value}</td>
                                <td>{record.pitching.caughtStealing.value}</td>
                                <td>{record.pitching.stolenBasePercentage.value}</td>
                                <td>{record.pitching.groundIntoDoublePlay.value}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}

export default TeamsTable;
