import React, { act } from 'react';
import { useState } from 'react';
import StatCell from './StatCell';
import TeamsTableHeading from './TeamsTableHeading';

function TeamsTable(props) {
  const [activeColumn, setActiveColumn] = useState("Name"); // State to set by which column the data is sorted
  const [group, setGroup] = useState("hitting");  // State to set by which group data will be shown in the table (hitting/pitching)
  const [flipDefault, setFlipDefault] = useState(false);

  if (props.result.loading) {
    return <div>Loading...</div>;
  }


  const handleColumnClick = (field) => {
    if(field === activeColumn) {
      setFlipDefault(!flipDefault);
    }
    else {
      setFlipDefault(false);
    }
    setActiveColumn(field);
  };

  const teamsArray = props.result.data;

  function sortTeamDataByColumn(teamsArray, category) {
    let sortedRecords = teamsArray;
    if (category === "hitting") {
      sortedRecords = props.result.data.sort((b, a) => {
console.log("activeColumn:", activeColumn);
          console.log("a:", a);
        if (activeColumn === "Name") {
          const sortOrder = flipDefault ? -1 : 1;
          return sortOrder * (a.team.name - b.team.name);
        }
        else if (activeColumn === "Runs") {
          const sortOrder = flipDefault ? -1 : 1;
          return sortOrder * (a.hitting.runs.value - b.hitting.runs.value);
        }
        else if (activeColumn === "Hit") {
          const sortOrder = flipDefault ? -1 : 1;
          return sortOrder * (a.hitting.hits.value - b.hitting.hits.value);
        }        
        else if (activeColumn === "2b") {
          const sortOrder = flipDefault ? -1 : 1;
          return sortOrder * (a.hitting.doubles.value - b.hitting.doubles.value);
        }        
        else if (activeColumn === "3b") {
          const sortOrder = flipDefault ? -1 : 1;
          return sortOrder * (a.hitting.triples.value - b.hitting.triples.value);
        }       
        else if (activeColumn === "Hr") {
          const sortOrder = flipDefault ? -1 : 1;
          return sortOrder * (a.hitting.homeRuns.value - b.hitting.homeRuns.value);
        }      
        else if (activeColumn === "Rbi") {
          const sortOrder = flipDefault ? -1 : 1;
          return sortOrder * (a.hitting.rbi.value - b.hitting.rbi.value);
        }   
        else if (activeColumn === "Abph") {
          const sortOrder = flipDefault ? 1 : -1;
          return sortOrder * (a.hitting.atBatsPerHomeRun.value - b.hitting.atBatsPerHomeRun.value);
        }  
        else if (activeColumn === "Bb") {
          const sortOrder = flipDefault ? -1 : 1;
          return sortOrder * (a.hitting.baseOnBalls.value - b.hitting.baseOnBalls.value);
        } 
        else if (activeColumn === "Sb") {
          const sortOrder = flipDefault ? -1 : 1;
          return sortOrder * (a.hitting.stolenBases.value - b.hitting.stolenBases.value);
        } 
        else if (activeColumn === "Avg") {
          const sortOrder = flipDefault ? -1 : 1;
          return sortOrder * (a.hitting.avg.value - b.hitting.avg.value);
        } 
        else if (activeColumn === "So") {
          const sortOrder = flipDefault ? 1 : -1;
          return sortOrder * (a.hitting.strikeOuts.value - b.hitting.strikeOuts.value);
        } 
        else if (activeColumn === "Go") {
          const sortOrder = flipDefault ? 1 : -1;
          return sortOrder * (a.hitting.groundOuts.value - b.hitting.groundOuts.value);
        } 
        else if (activeColumn === "Ao") {
          const sortOrder = flipDefault ? 1 : -1;
          return sortOrder * (a.hitting.airOuts.value - b.hitting.airOuts.value);
        } 
        else if (activeColumn === "Gidp") {
          const sortOrder = flipDefault ? 1 : -1;
          return sortOrder * (a.hitting.groundIntoDoublePlay.value - b.hitting.groundIntoDoublePlay.value);
        }
                 
        return 0; // Default case if no sorting is applied
      });
    }
    else if (category === "pitching") {
      sortedRecords = props.result.data.sort((b, a) => {
        if (activeColumn === "NAME") return a.team.name > b.team.name ? 1 : -1;
        else if (activeColumn === "-NAME") return a.team.name < b.team.name ? 1 : -1;
        else if (activeColumn === "ERA") return a.pitching.era.value - b.pitching.era.value;
        else if (activeColumn === "-ERA") return b.pitching.era.value - a.pitching.era.value;
        else if (activeColumn === "RUNS") return a.pitching.runs.value - b.pitching.runs.value;
        else if (activeColumn === "-RUNS") return b.pitching.runs.value - a.pitching.runs.value;
        else if (activeColumn === "HR") return a.pitching.homeRuns.value - b.pitching.homeRuns.value;
        else if (activeColumn === "-HR") return b.pitching.homeRuns.value - a.pitching.homeRuns.value;
        else if (activeColumn === "K") return a.pitching.strikeOuts.value - b.pitching.strikeOuts.value;
        else if (activeColumn === "-K") return b.pitching.strikeOuts.value - a.pitching.strikeOuts.value;
        else if (activeColumn === "BB") return a.pitching.baseOnBalls.value - b.pitching.baseOnBalls.value;
        else if (activeColumn === "-BB") return b.pitching.baseOnBalls.value - a.pitching.baseOnBalls.value;
        else if (activeColumn === "SOTWR") return a.pitching.strikeoutWalkRatio.value - b.pitching.strikeoutWalkRatio.value;
        else if (activeColumn === "-SOTWR") return b.pitching.strikeoutWalkRatio.value - a.pitching.strikeoutWalkRatio.value;
        else if (activeColumn === "GO") return a.pitching.groundOuts.value - b.pitching.groundOuts.value;
        else if (activeColumn === "-GO") return b.pitching.groundOuts.value - a.pitching.groundOuts.value;
        else if (activeColumn === "AO") return a.pitching.airOuts.value - b.pitching.airOuts.value;
        else if (activeColumn === "-AO") return b.pitching.airOuts.value - a.pitching.airOuts.value;
        else if (activeColumn === "GOTAO") return a.pitching.groundOutsToAirouts.value - b.pitching.groundOutsToAirouts.value;
        else if (activeColumn === "-GOTAO") return b.pitching.groundOutsToAirouts.value - a.pitching.groundOutsToAirouts.value;
        else if (activeColumn === "AVG") return a.pitching.avg.value - b.pitching.avg.value;
        else if (activeColumn === "-AVG") return b.pitching.avg.value - a.pitching.avg.value;
        else if (activeColumn === "SB") return a.pitching.stolenBases.value - b.pitching.stolenBases.value;
        else if (activeColumn === "-SB") return b.pitching.stolenBases.value - a.pitching.stolenBases.value;
        else if (activeColumn === "CS") return a.pitching.caughtStealing.value - b.pitching.caughtStealing.value;
        else if (activeColumn === "-CS") return b.pitching.caughtStealing.value - a.pitching.caughtStealing.value;
        else if (activeColumn === "SBP") return a.pitching.stolenBasePercentage.value - b.pitching.stolenBasePercentage.value;
        else if (activeColumn === "-SBP") return b.pitching.stolenBasePercentage.value - a.pitching.stolenBasePercentage.value;
        else if (activeColumn === "GIDP") return a.pitching.groundIntoDoublePlay.value - b.pitching.groundIntoDoublePlay.value;
        else if (activeColumn === "-GIDP") return b.pitching.groundIntoDoublePlay.value - a.pitching.groundIntoDoublePlay.value;
        return 0; // Default case if no sorting is applied
      });
    }

    else console.log("Undefined category");

    return sortedRecords;
  }

  const renderArray = [...sortTeamDataByColumn(teamsArray, group)];

  // Render the component
  return (
    <div>
      <div className="parent">
        <table className="topTable">
          <tbody>
            <tr>
              <td className="season">
                <div>{props.result.data[0].season} season</div>
                <button onClick={() => { setGroup("hitting"); setActiveColumn("Runs"); }} className={(group === "hitting") ? "active" : "inactive"}>Batting</button>
                <button onClick={() => { setGroup("pitching"); setActiveColumn("Runs"); }} className={(group === "pitching") ? "active" : "inactive"}>Pitching</button>
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
            <tr className="columnHeadings">
              <td className="team">Team:</td>
              <TeamsTableHeading title="Runs" activeColumn={activeColumn} ascend={false} handleColumnClick={handleColumnClick} flipDefault={flipDefault} /> 
              <TeamsTableHeading title="Hit" activeColumn={activeColumn} ascend={false} handleColumnClick={handleColumnClick} flipDefault={flipDefault} />
              <TeamsTableHeading title="2b" activeColumn={activeColumn} ascend={false} handleColumnClick={handleColumnClick} flipDefault={flipDefault} />
              <TeamsTableHeading title="3b" activeColumn={activeColumn} ascend={false} handleColumnClick={handleColumnClick} flipDefault={flipDefault} />
              <TeamsTableHeading title="Hr" activeColumn={activeColumn} ascend={false} handleColumnClick={handleColumnClick} flipDefault={flipDefault} />
              <TeamsTableHeading title="Rbi" activeColumn={activeColumn} ascend={false} handleColumnClick={handleColumnClick} flipDefault={flipDefault} />
              <TeamsTableHeading title="Abph" activeColumn={activeColumn} ascend={true} handleColumnClick={handleColumnClick} flipDefault={flipDefault} />
              <TeamsTableHeading title="Bb" activeColumn={activeColumn} ascend={false} handleColumnClick={handleColumnClick} flipDefault={flipDefault} />
              <TeamsTableHeading title="Sb" activeColumn={activeColumn} ascend={false} handleColumnClick={handleColumnClick} flipDefault={flipDefault} />
              <TeamsTableHeading title="Avg" activeColumn={activeColumn} ascend={false} handleColumnClick={handleColumnClick} flipDefault={flipDefault} />
              <TeamsTableHeading title="So" activeColumn={activeColumn} ascend={true} handleColumnClick={handleColumnClick} flipDefault={flipDefault} />
              <TeamsTableHeading title="Go" activeColumn={activeColumn} ascend={true} handleColumnClick={handleColumnClick} flipDefault={flipDefault} />
              <TeamsTableHeading title="Ao" activeColumn={activeColumn} ascend={true} handleColumnClick={handleColumnClick} flipDefault={flipDefault} />
              <TeamsTableHeading title="Gidp" activeColumn={activeColumn} ascend={true} handleColumnClick={handleColumnClick} flipDefault={flipDefault} />
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
          <tr className="columnHeadings">
              <td className="team">Team:</td>
              <td className="top"><button onClick={(e) => handleColumnClick('ERA', e)} title="Earned Run Average">ERA:</button></td>
              <td className="top"><button onClick={(e) => handleColumnClick('RUNS', e)} title="Runs">Runs:</button></td>
              <td className="top"><button onClick={(e) => handleColumnClick('HR', e)} title="Homeruns">HRs:</button></td>
              <td className="top"><button onClick={(e) => handleColumnClick('K', e)} title="StrikeOuts">SOs:</button></td>
              <td className="top"><button onClick={(e) => handleColumnClick('BB', e)} title="Walks">BBs:</button></td>
              <td className="top"><button onClick={(e) => handleColumnClick('SOTWR', e)} title="Strikeout to Walk Ratio">SOtWR:</button></td>
              <td className="top"><button onClick={(e) => handleColumnClick('GO', e)} title="Groundouts">GOs:</button></td>
              <td className="top"><button onClick={(e) => handleColumnClick('AO', e)} title="Airouts">AOs:</button></td>
              <td className="top"><button onClick={(e) => handleColumnClick('GOTAO', e)} title="Ground out to Air outs">GOtAO:</button></td>
              <td className="top"><button onClick={(e) => handleColumnClick('AVG', e)} title="Opponents Batting Avg">AVG:</button></td>
              <td className="top"><button onClick={(e) => handleColumnClick('SB', e)} title="Stolen Bases">SBs:</button></td>
              <td className="top"><button onClick={(e) => handleColumnClick('CS', e)} title="Caught Stealing">CS:</button></td>
              <td className="top"><button onClick={(e) => handleColumnClick('SBP', e)} title="Stolen Base Percentage">SBP:</button></td>
              <td className="top"><button onClick={(e) => handleColumnClick('GIDP', e)} title="Ground into Double Play">GIDP:</button></td>
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