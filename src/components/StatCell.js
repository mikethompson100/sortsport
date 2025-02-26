import React from 'react';

function StatCell(props) {
  return (
    <td className={props.nameForClass}>{props.tdValue}</td>
  )
}

export default StatCell;

