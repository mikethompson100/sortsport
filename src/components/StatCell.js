import React from 'react';
import getStatClass from '../helper/getStatClass';

const StatCell = ({ stats, column, allDataSorted, group }) => {
  const greaterRows = allDataSorted.filter((e) => e[group][column.name].value > stats[column.name].value);
  const lesserRows = allDataSorted.filter((e) => e[group][column.name].value < stats[column.name].value);
  const nameForClass = getStatClass(greaterRows.length, lesserRows.length, column.ascend);
  return (<td className={nameForClass}>{stats[column.name].value}</td>)
};

export default StatCell;