import React from 'react';
import { MONTH_NAMES, getNumFirstDay, isDateInRange, getNumDaysInAMonth, isSameDate } from './helpers';

export default function Calendar(props) {
  const { date, onSelect, startDate, endDate } = props;
  const numMonth = date.getMonth();
  const monthName = MONTH_NAMES[numMonth];
  const year = date.getFullYear();
  
  const numFirstDay = getNumFirstDay(year, numMonth);
  const blanks = [];
  for (let i = 0; i < numFirstDay; i++) {
    blanks.push(<td className="calendar-day" />);
  }
  
  const numDaysInAMonth = getNumDaysInAMonth(year, numMonth);
  const isDateInBetweenStartAndEndDate = startDate && endDate && isDateInRange(startDate, endDate);
  const daysInMonth = [];
  for (let day = 1; day <= numDaysInAMonth; day++) {
    const todayDateObj = new Date(year, numMonth, day);
    
    const inRange = isDateInBetweenStartAndEndDate && isDateInBetweenStartAndEndDate(todayDateObj);
    const selectedClassName = inRange ? 'date_range' : '';

    const isStartDate = isSameDate(startDate);
    const isEndDate = isSameDate(endDate);
    
    const startDateClassName = isStartDate(todayDateObj) ? 'start_date' : '';
    const endDateClassName = isEndDate(todayDateObj) ? 'end_date' : ''

    daysInMonth.push(
      <td
        key={day}
        className={`calendar__date ${selectedClassName} ${startDateClassName} ${endDateClassName}`}
        onClick={() => onSelect(todayDateObj)}
      >
        {day}
      </td>
    );
  }

  const totalDaysInMonths = [...blanks, ...daysInMonth];
  const rows = constructWeekRowAndDayCells(totalDaysInMonths);

  return (
    <div className="calendar__wrapper calendar__month">
      <div className="calendar__month_name">
        {monthName} {year}
      </div>
      <table className="calendar__dates">
        <tbody>
          {rows.map(numDay => (
            <tr>{numDay}</tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function constructWeekRowAndDayCells(totalDaysInMonths) {
  let rows = [],
    cells = [];

  totalDaysInMonths.forEach((row, i) => {
    if (i % 7 !== 0) {
      // if index not equal 7 that means not go to next week
      cells.push(row);
    } else {
      // when reach next week we contain all td in last week to rows
      rows.push(cells);
      // empty container
      cells = [];
      // in current loop we still push current row to new container
      cells.push(row);
    }

    // when end loop we add remain date
    if (i === totalDaysInMonths.length - 1) rows.push(cells);
  });

  return rows;
}
