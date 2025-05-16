import React from 'react';
import { useState } from 'react';
import StatCell from './StatCell';
import TeamsTableHeading from './TeamsTableHeading';
import useIsMobile from "../hooks/useIsMobile";
import { allHittingColumns, allPitchingColumns, teamAbbrevs } from '../constants/constants';

function TeamsTable(props) {
  const [activeColumn, setActiveColumn] = useState("Name"); // State to set by which column the data is sorted
  const [group, setGroup] = useState("hitting");  // State to set by which group data will be shown in the table (hitting/pitching)
  const [flipDefault, setFlipDefault] = useState(false);
  const isMobile = useIsMobile();
  const [isLegendActivated, setIsLegendActivated] = useState(false);
  const isLegendShown = !isMobile || isLegendActivated;

  if (props.result.loading) {
    return <div>Loading...</div>;
  }

  function getAbbrev(teamLongName) {
    const abbrev = teamAbbrevs.find(team => team.name === teamLongName)?.abbrev;
    return abbrev;
  }

  const handleColumnClick = (field) => {
    if (field === activeColumn) {
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

    if (activeColumn === "Name") {
      const cloned = [...teamsArray];
      cloned.sort((a, b) => {
        const aFirst = a.team.name < b.team.name;
        const aFirstNumber = aFirst ? -1 : 1;
        const sortOrder = flipDefault ? -1 : 1;
        return sortOrder * aFirstNumber;
      });
      return cloned;
    }

    const invalidCategory = category !== "hitting" && category !== "pitching";
    if (invalidCategory) {
      const errorMsg = `Invalid category: ${category}.`;
      throw new Error(errorMsg);
    }

    const categoryColumnObjects = category === "hitting" ? allHittingColumns : allPitchingColumns;

    const columnObject = categoryColumnObjects.find((element) => {
      return element.title === activeColumn;
    });

    sortedRecords = props.result.data.sort((b, a) => {

      if (columnObject) {
        const defaultSortOrder = columnObject.ascend ? -1 : 1;
        const sortOrder = flipDefault ? defaultSortOrder * -1 : defaultSortOrder;
        const aValue = a[category][columnObject.name].value;
        const bValue = b[category][columnObject.name].value;
        return sortOrder * (aValue - bValue);
      }
      const errMessage = `Invalid column name: ${activeColumn}`;
      throw new Error(errMessage); // Default case if no sorting is applied
    });


    return sortedRecords;
  }

  const renderArray = [...sortTeamDataByColumn(teamsArray, group)];

  let chevron = "";
  let direction = flipDefault ? "up" : "down";
  let nameClass = "team";
  if ((activeColumn === "Name")) {
    chevron = <span className={`bi bi-chevron-${direction}`}></span>
    nameClass = "team active";
  }

  // Render the component
  return (
    <>
      <div id="modal-root" className={`${(isLegendActivated) ? 'opacity-50' : 'opacity-0'}`}></div>
      <header>
        <div className='brand'>
          S0RTSP0RT
        </div>
        <div className="headerContainer">
          <div className={`season ${(isLegendActivated && isMobile) ? 'dimmed' : ''}`}>
            {isMobile ? "'" + String(props.result.data[0].season).slice(-2) : props.result.data[0].season}<span className="description">season</span>
            <a href="#" onClick={() => { setGroup("hitting"); setActiveColumn("Name"); }} className={`hitting ${group === "hitting" ? "active" : "inactive"}`}><span className="categorytext">Hitting</span></a>
            <a href="#" onClick={() => { setGroup("pitching"); setActiveColumn("Name"); }} className={`pitching ${group === "pitching" ? "active" : "inactive"}`}><span className="categorytext">Pitching</span></a>
          </div>
          <div className={`legend-toggle ${isLegendActivated ? 'legend-button-highlighted' : ''}`}>
            <a id="legend-button" href="#" onClick={() => {
              setIsLegendActivated(!isLegendActivated);
            }}>
              <i className="bi bi-info-circle"></i>
            </a>
          </div>
          <div id="color-button" className={`bi bi-palette ${(isLegendActivated && isMobile) ? 'dimmed' : ''}`}>
          </div>
          <div id="bw-button" className={`bi bi-circle-half ${(isLegendActivated && isMobile) ? 'dimmed' : ''}`}>
            <a href="#" onClick={() => {

            }}>
            </a>
          </div>
        </div>
      </header>
      {props.result.loading && <p>Loading...</p>} {/* Show loading message */}
      {props.result.error && <p>Error: {props.result.error}</p>} {/* Show error message */}
      {props.result.data && (group === "hitting") && ( /* Render data when available */
        <table>
          <tbody>
            <tr className="columnHeadings">
              <td>
                <div className="legendColumn">
                  <span>Ranks</span>
                  <div className="topRank1">1</div>
                  <div className="topRank2to5">2</div>
                  <div className="topRank2to5">3</div>
                  <div className="topRank2to5">4</div>
                  <div className="topRank2to5">5</div>
                  <div className="topRank6to10">6</div>
                  <div className="topRank6to10">7</div>
                  <div className="topRank6to10">8</div>
                  <div className="topRank6to10">9</div>
                  <div className="topRank6to10">10</div>
                  <div>...</div>
                  <div className="botRank6to10">20</div>
                  <div className="botRank6to10">21</div>
                  <div className="botRank6to10">22</div>
                  <div className="botRank6to10">23</div>
                  <div className="botRank6to10">24</div>
                  <div className="botRank2to5">25</div>
                  <div className="botRank2to5">26</div>
                  <div className="botRank2to5">27</div>
                  <div className="botRank2to5">28</div>
                  <div className="botRank2to5">29</div>
                  <div className="botRank1">30</div>
                </div>
              </td>
              <td className={nameClass}>
                <a href="#" onClick={(e) => { e.preventDefault(); handleColumnClick("Name") }}>Team:</a>{chevron}
              </td>
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
                  <td className="legendColumn"></td>
                  <td className="left">{isMobile ? getAbbrev(record.team.name) : record.team.name}</td>
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
              <td>
                <div className="legendColumn">
                  <span>Ranks</span>
                  <div className="topRank1">1</div>
                  <div className="topRank2to5">2</div>
                  <div className="topRank2to5">3</div>
                  <div className="topRank2to5">4</div>
                  <div className="topRank2to5">5</div>
                  <div className="topRank6to10">6</div>
                  <div className="topRank6to10">7</div>
                  <div className="topRank6to10">8</div>
                  <div className="topRank6to10">9</div>
                  <div className="topRank6to10">10</div>
                  <div>...</div>
                  <div className="botRank6to10">20</div>
                  <div className="botRank6to10">21</div>
                  <div className="botRank6to10">22</div>
                  <div className="botRank6to10">23</div>
                  <div className="botRank6to10">24</div>
                  <div className="botRank2to5">25</div>
                  <div className="botRank2to5">26</div>
                  <div className="botRank2to5">27</div>
                  <div className="botRank2to5">28</div>
                  <div className="botRank2to5">29</div>
                  <div className="botRank1">30</div>
                </div>
              </td>
              <td className={nameClass}>
                <a href="#" onClick={(e) => handleColumnClick("Name")}>Team:</a>{chevron}
              </td>
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
                  <td className="legendColumn"></td>
                  <td className="left">{isMobile ? getAbbrev(record.team.name) : record.team.name}</td>
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
      {isLegendShown && isLegendActivated && (
        <div id="popup-legend-modal">
          <span><strong>Ranks</strong></span>
          <div className="topRank1">1</div>
          <div className="topRank2to5">2</div>
          <div className="topRank2to5">3</div>
          <div className="topRank2to5">4</div>
          <div className="topRank2to5">5</div>
          <div className="topRank6to10">6</div>
          <div className="topRank6to10">7</div>
          <div className="topRank6to10">8</div>
          <div className="topRank6to10">9</div>
          <div className="topRank6to10">10</div>
          <div>...</div>
          <div className="botRank6to10">20</div>
          <div className="botRank6to10">21</div>
          <div className="botRank6to10">22</div>
          <div className="botRank6to10">23</div>
          <div className="botRank6to10">24</div>
          <div className="botRank2to5">25</div>
          <div className="botRank2to5">26</div>
          <div className="botRank2to5">27</div>
          <div className="botRank2to5">28</div>
          <div className="botRank2to5">29</div>
          <div className="botRank1">30</div>
        </div>
      )}
    </>
  );
}

export default TeamsTable;