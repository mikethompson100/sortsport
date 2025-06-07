import React, { useEffect, useRef } from 'react';
import { useState } from 'react';
import StatCell from './StatCell';
import TeamsTableHeading from './TeamsTableHeading';
import useIsMobile from "../hooks/useIsMobile";
import useIs1200 from "../hooks/useIs1200";
import { allHittingColumns, allPitchingColumns, teamAbbrevs } from '../constants/constants';


function TeamsTable(props) {
  const [activeColumn, setActiveColumn] = useState("Name"); // State to set by which column the data is sorted
  const [group, setGroup] = useState("hitting");  // State to set by which group data will be shown in the table (hitting/pitching)
  const [flipDefault, setFlipDefault] = useState(false);
  const [colorful, setColorful] = useState(true);
  const isMobile = useIsMobile();
  const is1200 = useIs1200();
  const [isLegendActivated, setIsLegendActivated] = useState(false);
  const isLegendShown = !isMobile || isLegendActivated;
  const closeRef = useRef();
  const infoRef = useRef();

  useEffect(() => {
    if (isLegendActivated) {
      closeRef.current?.focus();
    }
    else { infoRef.current?.focus(); }
  }, [isLegendActivated]);

  useEffect(() => {
    if (is1200) {
      setIsLegendActivated(false);
    }
  }, [is1200]);

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
      {isLegendActivated && <div id="modal-root" onClick={() => setIsLegendActivated(false)} className="opacity-50"></div>}
      <header>
        <div className="headerLeft">
          <span className='brand'>
            <h1 className="sortsport"></h1>
          </span>
          <span>
            {isMobile ? "'" + String(props.result.data[0].season).slice(-2) : props.result.data[0].season}<span className="description">season</span>
          </span>
        </div>
        <div className="headerCenter headerContainer">
          <div className={`season ${(isLegendActivated) ? 'dimmed' : ''}`}>
            <a href="#" onClick={() => { setGroup("hitting"); setActiveColumn("Name"); }} className={`hitting ${group === "hitting" ? "active" : "inactive"}`}><span className="visually-hidden">button for changing the view to batting statistics</span><span className="categorytext">Hitting</span></a>
            <a href="#" onClick={() => { setGroup("pitching"); setActiveColumn("Name"); }} className={`pitching ${group === "pitching" ? "active" : "inactive"}`}><span className="visually-hidden">button for changing the view to pitching statistics</span><span className="categorytext">Pitching</span></a>
          </div>
        </div>
        <div className="headerRight">
          <div className={`legend-toggle ${isLegendActivated ? 'legend-button-highlighted' : ''}`}>
            <a id="legend-button" ref={infoRef} href="#" onClick={() => { setIsLegendActivated(!isLegendActivated); }}><i className="bi bi-info-circle"></i><span className='visually-hidden'>Toggle link to show or hide color legend popup that includes column heading descriptions</span></a>
          </div>
          {!colorful && <div id="color-button" className={`bi bi-circle-half ${(isLegendActivated) ? 'dimmed' : ''}`}><a href="#" onClick={() => { setColorful(!colorful); }}><span className='visually-hidden'>Toggle link to turn on or off the color palette mode</span></a></div>
          }
          {colorful && <div id="bw-button" className={`bi bi-circle-half ${(isLegendActivated) ? 'dimmed' : ''}`}><a href="#" onClick={() => { setColorful(!colorful); }}><span className='visually-hidden'>Toggle link to turn on or off the black and white mode</span></a>
          </div>
          }
        </div>
      </header>
      {props.result.loading && <p>Loading...</p>} {/* Show loading message */}
      {props.result.error && <p>Error: {props.result.error}</p>} {/* Show error message */}
      <main>
        {props.result.data && (group === "hitting") && ( /* Render data when available */
          <table className={colorful ? "" : "bw"}>
            <tbody>
              <tr className="columnHeadings">
                <td className={colorful ? "" : "hideDesktopLegend"}>
                  <aside className="legendColumn">
                    <div className="legendTitle">Ranks</div>
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
                    <div>...</div>
                    <div>...</div>
                    <div>...</div>
                    <div>...</div>
                    <div>...</div>
                    <div>...</div>
                    <div>...</div>
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
                  </aside>
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
                          allDataSorted={renderArray}
                          group={group}
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
          <table className={colorful ? "" : "bw"}>
            <tbody>
              <tr className="columnHeadings">
                <td className={colorful ? "" : "hideDesktopLegend"}>
                  <aside className="legendColumn">
                    <div className="legendTitle">Ranks</div>
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
                    <div>...</div>
                    <div>...</div>
                    <div>...</div>
                    <div>...</div>
                    <div>...</div>
                    <div>...</div>
                    <div>...</div>
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
                  </aside>
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
                          allDataSorted={renderArray}
                          group={group}
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
            <a href="#" ref={closeRef} onClick={() => setIsLegendActivated(false)} className="closeButton bi bi-x"></a>
            <div>
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
              <div className="topRank botRank">...</div>
              <div className="topRank botRank">...</div>
              <div className="topRank botRank">...</div>
              <div className="topRank botRank">...</div>
              <div className="topRank botRank">...</div>
              <div className="topRank botRank">...</div>
              <div className="topRank botRank">...</div>
              <div className="topRank botRank">...</div>
              <div className="topRank botRank">...</div>
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

            <div className="legendColumnHeadings">
              <div className="lCHColumn">
                <div className="lCHContainer"><strong>Hitting</strong></div>
                <div className="lCHContainer"><div>Runs</div><div>= Runs</div></div>
                <div className="lCHContainer"><div>Hit</div><div>= Hits</div></div>
                <div className="lCHContainer"><div>2b</div><div>= Doubles</div></div>
                <div className="lCHContainer"><div>3b</div><div>= Triples</div></div>
                <div className="lCHContainer"><div>Hr</div><div>= Homeruns</div></div>
                <div className="lCHContainer"><div>Rbi</div><div>= Runs Batted In</div></div>
                <div className="lCHContainer"><div>Abph</div><div>= At Bat Per Homerun</div></div>
                <div className="lCHContainer"><div>Bb</div><div>= Walks</div></div>
                <div className="lCHContainer"><div>Sb</div><div>= Stolen Bases</div></div>
                <div className="lCHContainer"><div>Avg</div><div>= Batting Average</div></div>
                <div className="lCHContainer"><div>So</div><div>= Strikeouts</div></div>
                <div className="lCHContainer"><div>Go</div><div>= Groundouts</div></div>
                <div className="lCHContainer"><div>Ao</div><div>= Airouts</div></div>
                <div className="lCHContainer"><div>Gidp</div><div>= Ground into Double Plays</div></div>
              </div>
              <div className="lCHColumn">
                <div className="lCHContainer"><strong>Pitching</strong></div>
                <div className="lCHContainer"><div>Era</div><div>= Earned Run Average</div></div>
                <div className="lCHContainer"><div>Runs</div><div>= Runs given up</div></div>
                <div className="lCHContainer"><div>Hr</div><div>= Homeruns given up</div></div>
                <div className="lCHContainer"><div>So</div><div>= Strikeouts</div></div>
                <div className="lCHContainer"><div>Bb</div><div>= Walks given up</div></div>
                <div className="lCHContainer"><div>SoWr</div><div>= Strikeouts to Walks ratio</div></div>
                <div className="lCHContainer"><div>Go</div><div>= Groundouts</div></div>
                <div className="lCHContainer"><div>Ao</div><div>= Airouts</div></div>
                <div className="lCHContainer"><div>GoAo</div><div>= Groundouts to Airouts ratio</div></div>
                <div className="lCHContainer"><div>Avg</div><div>= Opponent's Batting Average</div></div>
                <div className="lCHContainer"><div>Sb</div><div>= Stolen Bases allowed</div></div>
                <div className="lCHContainer"><div>Cs</div><div>= Caught Stealing</div></div>
                <div className="lCHContainer"><div>SbP</div><div>= Stolen base percentage</div></div>
                <div className="lCHContainer"><div>Gidp</div><div>= Ground into Double Plays</div></div>
              </div>
            </div>
          </div>
        )}
      </main>
    </>
  );
}

export default TeamsTable;