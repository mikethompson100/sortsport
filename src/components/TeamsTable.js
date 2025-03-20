import React, { act } from 'react';
import { useState } from 'react';
import StatCell from './StatCell';
import TeamsTableHeading from './TeamsTableHeading';
import { allHittingColumns, allPitchingColumns } from '../constants/leagueAPI';

function TeamsTable(props) {
  const [activeColumn, setActiveColumn] = useState("Name"); // State to set by which column the data is sorted
  const [group, setGroup] = useState("hitting");  // State to set by which group data will be shown in the table (hitting/pitching)
  const [flipDefault, setFlipDefault] = useState(false);

  if (props.result.loading) {
    return <div>Loading...</div>;
  }

  function clearInitialActiveColumn() {
    const initActiveCol = document.querySelector('.team');
    if (initActiveCol.classList.contains("active")) {
      initActiveCol.classList.remove("active");
    }
  }
  
  const handleColumnClick = (field) => {
    clearInitialActiveColumn();
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
      const column = allHittingColumns.find((element) => {
        return element.title === activeColumn;
      })

      sortedRecords = props.result.data.sort((b, a) => {

        if (activeColumn === "Name") {
          const sortOrder = flipDefault ? -1 : 1;
          return sortOrder * (a.team.name - b.team.name);
        }

        if (column) {
          const defaultSortOrder = column.ascend ? -1 : 1;
          const sortOrder = flipDefault ? defaultSortOrder * -1 : defaultSortOrder;
          const aValue = a[category][column.name].value;
          const bValue = b[category][column.name].value;
          return sortOrder * (aValue - bValue);
        }
        const errMessage = `Invalid column name: ${activeColumn}`;  
        throw new Error(errMessage); // Default case if no sorting is applied
      });
    }
    else if (category === "pitching") {
      const column = allPitchingColumns.find((element) => {
        return element.title === activeColumn;
      })

      sortedRecords = props.result.data.sort((b, a) => {

        if (activeColumn === "Name") {
          const sortOrder = flipDefault ? -1 : 1;
          return sortOrder * (a.team.name - b.team.name);
        }

        if (column) {
          const defaultSortOrder = column.ascend ? -1 : 1;
          const sortOrder = flipDefault ? defaultSortOrder * -1 : defaultSortOrder;
          const aValue = a[category][column.name].value;
          const bValue = b[category][column.name].value;
          return sortOrder * (aValue - bValue);
        }
        const errMessage = `Invalid column name: ${activeColumn}`;  
        throw new Error(errMessage); // Default case if no sorting is applied
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
                <button onClick={() => { setGroup("hitting"); setActiveColumn("Name");  }} className={(group === "hitting") ? "active" : "inactive"}>Batting</button>
                <button onClick={() => { setGroup("pitching"); setActiveColumn("Name");  }} className={(group === "pitching") ? "active" : "inactive"}>Pitching</button>
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
              <td className="team active">Team:</td>
              {allHittingColumns.map(element => {
                return (
                  <TeamsTableHeading 
                    title={element.title}
                    activeColumn={activeColumn}
                    ascend={element.ascend}
                    handleColumnClick={handleColumnClick}
                    flipDefault={flipDefault}
                  />
                )
              })}
            </tr>
            {renderArray.map(record => {

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
              <td className="team active">Team:</td>
              {allPitchingColumns.map(element => {
                return (
                  <TeamsTableHeading 
                    title={element.title}
                    activeColumn={activeColumn}
                    ascend={element.ascend}
                    handleColumnClick={handleColumnClick}
                    flipDefault={flipDefault}
                  />
                )
              })}
            </tr>
            {renderArray.map(record => {

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