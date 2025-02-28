import React from 'react';
import getStatClass from '../helper/getStatClass';

const StatCell = ({ stats, column }) => {
  const nameForClass = getStatClass(stats[column.name].rank, column.order);
  return ( <td className={nameForClass}>{stats[column.name].value}</td> )
};

export default StatCell;