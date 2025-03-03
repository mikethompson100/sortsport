import React from 'react';
import { useState } from 'react';
import StatCell from './StatCell';
import getStatClass from '../helper/getStatClass';

function TeamsTable(props) {
  const [sortedBy, setSortedBy] = useState("doubles"); // State to set by which column the data is sorted
  const [group, setGroup] = useState("hitting");  // State to set by which group data will be shown in the table (hitting/pitching)

  if (props.result.loading) {
    return <div>Loading...</div>;
  }

  const handleColumn = (field , event) => {
    const button = event.target;
    const parent = button.closest('td');
    const grandParent = parent.parentNode;
    const allButtons = grandParent.querySelectorAll('td');
    allButtons.forEach(btn => btn.classList.remove('active'));

    parent.classList.add('active'); // Add active class to column that is currently being sorted

    // If the user clicks the same sort column, reverse the sort order
    setSortedBy(prev => prev === field ? `-${field}` : field);
  };

  const teamsArray = props.result.data;

  function sortTeamDataByColumn(teamsArray, category, columnName) {
    let sortedRecords = teamsArray;
    if (category === "hitting") {
      sortedRecords = props.result.data.sort((b, a) => {
        if (columnName === "NAME") return a.team.name > b.team.name ? 1 : -1;
        else if (columnName === "-NAME") return a.team.name < b.team.name ? 1 : -1;
        else if (columnName === "RUNS") return a.hitting.runs.value - b.hitting.runs.value;
        else if (columnName === "-RUNS") return b.hitting.runs.value - a.hitting.runs.value;
        else if (columnName === "HIT") return a.hitting.hits.value - b.hitting.hits.value;
        else if (columnName === "-HIT") return b.hitting.hits.value - a.hitting.hits.value;
        else if (columnName === "2B") return a.hitting.doubles.value - b.hitting.doubles.value;
        else if (columnName === "-2B") return b.hitting.doubles.value - a.hitting.doubles.value;
        else if (columnName === "3B") return a.hitting.triples.value - b.hitting.triples.value;
        else if (columnName === "-3B") return b.hitting.triples.value - a.hitting.triples.value;
        else if (columnName === "HR") return a.hitting.homeRuns.value - b.hitting.homeRuns.value;
        else if (columnName === "-HR") return b.hitting.homeRuns.value - a.hitting.homeRuns.value;
        else if (columnName === "RBI") return a.hitting.rbi.value - b.hitting.rbi.value;
        else if (columnName === "-RBI") return b.hitting.rbi.value - a.hitting.rbi.value;
        else if (columnName === "ABPH") return a.hitting.atBatsPerHomeRun.value - b.hitting.atBatsPerHomeRun.value;
        else if (columnName === "-ABPH") return b.hitting.atBatsPerHomeRun.value - a.hitting.atBatsPerHomeRun.value;
        else if (columnName === "BB") return a.hitting.baseOnBalls.value - b.hitting.baseOnBalls.value;
        else if (columnName === "-BB") return b.hitting.baseOnBalls.value - a.hitting.baseOnBalls.value;
        else if (columnName === "SO") return a.hitting.strikeOuts.value - b.hitting.strikeOuts.value;
        else if (columnName === "-SO") return b.hitting.strikeOuts.value - a.hitting.strikeOuts.value;
        else if (columnName === "SB") return a.hitting.stolenBases.value - b.hitting.stolenBases.value;
        else if (columnName === "-SB") return b.hitting.stolenBases.value - a.hitting.stolenBases.value;
        else if (columnName === "AVG") return a.hitting.avg.value - b.hitting.avg.value;
        else if (columnName === "-AVG") return b.hitting.avg.value - a.hitting.avg.value;
        else if (columnName === "GO") return a.hitting.groundOuts.value - b.hitting.groundOuts.value;
        else if (columnName === "-GO") return b.hitting.groundOuts.value - a.hitting.groundOuts.value;
        else if (columnName === "AO") return a.hitting.airOuts.value - b.hitting.airOuts.value;
        else if (columnName === "-AO") return b.hitting.airOuts.value - a.hitting.airOuts.value;
        else if (columnName === "GIDP") return a.hitting.groundIntoDoublePlay.value - b.hitting.groundIntoDoublePlay.value;
        else if (columnName === "-GIDP") return b.hitting.groundIntoDoublePlay.value - a.hitting.groundIntoDoublePlay.value;
        return 0; // Default case if no sorting is applied
      });
    }
    else if (category === "pitching") {
      sortedRecords = props.result.data.sort((b, a) => {
        if (columnName === "NAME") return a.team.name > b.team.name ? 1 : -1;
        else if (columnName === "-NAME") return a.team.name < b.team.name ? 1 : -1;
        else if (columnName === "ERA") return a.pitching.era.value - b.pitching.era.value;
        else if (columnName === "-ERA") return b.pitching.era.value - a.pitching.era.value;
        else if (columnName === "RUNS") return a.pitching.runs.value - b.pitching.runs.value;
        else if (columnName === "-RUNS") return b.pitching.runs.value - a.pitching.runs.value;
        else if (columnName === "HR") return a.pitching.homeRuns.value - b.pitching.homeRuns.value;
        else if (columnName === "-HR") return b.pitching.homeRuns.value - a.pitching.homeRuns.value;
        else if (columnName === "K") return a.pitching.strikeOuts.value - b.pitching.strikeOuts.value;
        else if (columnName === "-K") return b.pitching.strikeOuts.value - a.pitching.strikeOuts.value;
        else if (columnName === "BB") return a.pitching.baseOnBalls.value - b.pitching.baseOnBalls.value;
        else if (columnName === "-BB") return b.pitching.baseOnBalls.value - a.pitching.baseOnBalls.value;
        else if (columnName === "SOTWR") return a.pitching.strikeoutWalkRatio.value - b.pitching.strikeoutWalkRatio.value;
        else if (columnName === "-SOTWR") return b.pitching.strikeoutWalkRatio.value - a.pitching.strikeoutWalkRatio.value;
        else if (columnName === "GO") return a.pitching.groundOuts.value - b.pitching.groundOuts.value;
        else if (columnName === "-GO") return b.pitching.groundOuts.value - a.pitching.groundOuts.value;
        else if (columnName === "AO") return a.pitching.airOuts.value - b.pitching.airOuts.value;
        else if (columnName === "-AO") return b.pitching.airOuts.value - a.pitching.airOuts.value;
        else if (columnName === "GOTAO") return a.pitching.groundOutsToAirouts.value - b.pitching.groundOutsToAirouts.value;
        else if (columnName === "-GOTAO") return b.pitching.groundOutsToAirouts.value - a.pitching.groundOutsToAirouts.value;
        else if (columnName === "AVG") return a.pitching.avg.value - b.pitching.avg.value;
        else if (columnName === "-AVG") return b.pitching.avg.value - a.pitching.avg.value;
        else if (columnName === "SB") return a.pitching.stolenBases.value - b.pitching.stolenBases.value;
        else if (columnName === "-SB") return b.pitching.stolenBases.value - a.pitching.stolenBases.value;
        else if (columnName === "CS") return a.pitching.caughtStealing.value - b.pitching.caughtStealing.value;
        else if (columnName === "-CS") return b.pitching.caughtStealing.value - a.pitching.caughtStealing.value;
        else if (columnName === "SBP") return a.pitching.stolenBasePercentage.value - b.pitching.stolenBasePercentage.value;
        else if (columnName === "-SBP") return b.pitching.stolenBasePercentage.value - a.pitching.stolenBasePercentage.value;
        else if (columnName === "GIDP") return a.pitching.groundIntoDoublePlay.value - b.pitching.groundIntoDoublePlay.value;
        else if (columnName === "-GIDP") return b.pitching.groundIntoDoublePlay.value - a.pitching.groundIntoDoublePlay.value;
        return 0; // Default case if no sorting is applied
      });
    }

    else console.log("Undefined category");

    return sortedRecords;
  }

  const renderArray = [...sortTeamDataByColumn(teamsArray, group, sortedBy)];

  // Render the component
  return (
    <div>
      <div className="parent">
        <table className="topTable">
          <tbody>
            <tr>
              <td className="season">
                <div>{props.result.data[0].season} season</div>
                <button onClick={() => { setGroup("hitting"); setSortedBy("NAME"); }} className={(group === "hitting") ? "active" : "inactive"}>Batting</button>
                <button onClick={() => { setGroup("pitching"); setSortedBy("NAME"); }} className={(group === "pitching") ? "active" : "inactive"}>Pitching</button>
              </td>
              <td className="rankLeft">
                <div><span className="topRank1">Red</span> = Rank #1</div>
                <div><span className="topRank2to5">Orange</span> = Rank #2&rarr;5</div>
                <div><span className="topRank6to10">Yellow</span> = Rank 6&rarr;10</div>
              </td>
              <td className="rankLeft">
                <div><span className="botRank1">Navy</span> = Rank #30</div>
                <div><span className="botRank2to5">Blue</span> = Rank #29&rarr;26</div>
                <div><span className="botRank6to10">Cyan</span> = Rank 25&rarr;20</div>
              </td>
              <td>
                *Columns are colored with the lowest amount in red.
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
              <td className="top"><button onClick={(e) => handleColumn('RUNS', e)}  title="Runs">Runs:</button></td>
              <td className="top"><button onClick={(e) => handleColumn('HIT', e)} title="Hits">Hits:</button></td>
              <td className="top"><button onClick={(e) => handleColumn('2B', e)} title="Doubles">2Bs:</button></td>
              <td className="top"><button onClick={(e) => handleColumn('3B', e)} title="Triples">3Bs:</button></td>
              <td className="top"><button onClick={(e) => handleColumn('HR', e)} title="Homeruns">HRs:</button></td>
              <td className="top"><button onClick={(e) => handleColumn('RBI', e)} title="Runs batted in">RBIs:</button></td>
              <td className="top"><button onClick={(e) => handleColumn('ABPH', e)} title="At Bats per Homerun">AB/PHr:</button></td>
              <td className="top"><button onClick={(e) => handleColumn('BB', e)} title="Walks">Walks:</button></td>
              <td className="top"><button onClick={(e) => handleColumn('SB', e)} title="Stolen Bases">SBs:</button></td>
              <td className="top"><button onClick={(e) => handleColumn('AVG', e)} title="Batting Average">AVG:</button></td>
              <td className="top"><button onClick={(e) => handleColumn('SO', e)} title="Strikeouts">*SOs:</button></td>
              <td className="top"><button onClick={(e) => handleColumn('GO', e)} title="Groundouts">*GOs:</button></td>
              <td className="top"><button onClick={(e) => handleColumn('AO', e)} title="Airouts">*AOs:</button></td>
              <td className="top"><button onClick={(e) => handleColumn('GIDP', e)} title="Ground into Double Play">*GIDP:</button></td>
            </tr>
            {renderArray.map(record => {

              const allHittingColumns = [
                { name: "runs", order: "desc" },
                { name: "hits", order: "desc" },
                { name: "doubles", order: "desc" },
                { name: "triples", order: "desc" },
                { name: "homeRuns", order: "desc" },
                { name: "rbi", order: "desc" },
                { name: "atBatsPerHomeRun", order: "asc" },
                { name: "baseOnBalls", order: "desc" },
                { name: "stolenBases", order: "desc" },
                { name: "avg", order: "desc" },
                { name: "strikeOuts", order: "asc" },
                { name: "groundOuts", order: "asc" },
                { name: "airOuts", order: "asc" },
                { name: "groundIntoDoublePlay", order: "asc" }
              ];

              return (
                <tr key={record.team.id}>
                  <td className="left">{record.team.name}</td>
                  {allHittingColumns.map((column) => {
                    return (
                      <StatCell
                        key={column.name}
                        stats={record.hitting}
                        column={column}
                      />
                    )
                  })}
                </tr>
              )

            })}
          </tbody>
        </table>
      )}
      {props.result.data && (group === "pitching") && ( /* Render data when available */
        <table>
          <tbody>
            <tr>
              <td className="team">Team:</td>
              <td className="top"><button onClick={(e) => handleColumn('ERA', e)} title="Earned Run Average">ERA:</button></td>
              <td className="top"><button onClick={(e) => handleColumn('RUNS', e)} title="Runs">Runs:</button></td>
              <td className="top"><button onClick={(e) => handleColumn('HR', e)} title="Homeruns">HRs:</button></td>
              <td className="top"><button onClick={(e) => handleColumn('K', e)} title="StrikeOuts">SOs:</button></td>
              <td className="top"><button onClick={(e) => handleColumn('BB', e)} title="Walks">BBs:</button></td>
              <td className="top"><button onClick={(e) => handleColumn('SOTWR', e)} title="Strikeout to Walk Ratio">SOtWR:</button></td>
              <td className="top"><button onClick={(e) => handleColumn('GO', e)} title="Groundouts">GOs:</button></td>
              <td className="top"><button onClick={(e) => handleColumn('AO', e)} title="Airouts">AOs:</button></td>
              <td className="top"><button onClick={(e) => handleColumn('GOTAO', e)} title="Ground out to Air outs">GOtAO:</button></td>
              <td className="top"><button onClick={(e) => handleColumn('AVG', e)} title="Opponents Batting Avg">AVG:</button></td>
              <td className="top"><button onClick={(e) => handleColumn('SB', e)} title="Stolen Bases">SBs:</button></td>
              <td className="top"><button onClick={(e) => handleColumn('CS', e)} title="Caught Stealing">CS:</button></td>
              <td className="top"><button onClick={(e) => handleColumn('SBP', e)} title="Stolen Base Percentage">SBP:</button></td>
              <td className="top"><button onClick={(e) => handleColumn('GIDP', e)} title="Ground into Double Play">GIDP:</button></td>
            </tr>
            {renderArray.map(record => {

              const allPitchingColumns = [
                { name: "era", order: "asc" },
                { name: "runs", order: "asc" },
                { name: "homeRuns", order: "asc" },
                { name: "strikeOuts", order: "desc" },
                { name: "baseOnBalls", order: "asc" },
                { name: "strikeoutWalkRatio", order: "desc" },
                { name: "groundOuts", order: "desc" },
                { name: "airOuts", order: "desc" },
                { name: "groundOutsToAirouts", order: "desc" },
                { name: "avg", order: "asc" },
                { name: "stolenBases", order: "asc" },
                { name: "caughtStealing", order: "desc" },
                { name: "stolenBasePercentage", order: "asc" },
                { name: "groundIntoDoublePlay", order: "desc" }
              ];
              
              return (
                <tr key={record.team.id}>
                  <td className="left">{record.team.name}</td>
                  {allPitchingColumns.map((column) => {
                    return (
                      <StatCell
                        key={column.name}
                        stats={record.pitching}
                        column={column}
                      />
                    )
                  })}
                </tr>
              )
            })}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default TeamsTable;