import React from 'react';
import moment from 'moment';
import { ModalHeader, Modal, Button, ModalBody, ModalFooter } from 'reactstrap';

const DAYS_NAME = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

const generate12MonthsDate = (date, numberOfMonths) =>
  Array.from({ length: numberOfMonths + 1 }).map(
    (_, idx) => new Date(date.getFullYear(), date.getMonth() + idx)
  );

const getFormattedDate = (startDate, endDate) => {
  const format = date => moment(date).format('ddd D MMM');
  let res = '';

  if (startDate) res = `${format(startDate)} - `;
  if (endDate) res += format(endDate);

  return res;
};

const getDiff = (startDate, endDate) =>
  moment(endDate).diff(moment(startDate), 'days');

MobileDatePicker.defaultProps = {
  minDate: new Date(),
  numberOfMonths: 12,
};

export default function MobileDatePicker(props) {
  const [on, setOn] = React.useState(true);

  const { minDate, numberOfMonths } = props;
  const [startDate, setStartDate] = React.useState(null);
  const [endDate, setEndDate] = React.useState(null);

  const toggle = () => setOn(!on);

  const dates = generate12MonthsDate(minDate, numberOfMonths);

  const selectDates = date => {
    if (!startDate) {
      setStartDate(date);

      return;
    }

    if (moment(startDate).isBefore(date)) {
      setEndDate(date);
    } else {
      setStartDate(date);
    }
  };

  const hasDates = startDate && endDate;

  return (
    <>
      <Button onClick={toggle}>Open calc</Button>
      <Modal isOpen={on} toggle={toggle} className="calendar-modal">
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalCenterTitle">
                Modal title
              </h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
              <div className="calendar__vertical-header">
                <table className="calendar__vertical-day-names">
                  <thead className="calendar__row">
                    <tr>
                      {DAYS_NAME.map(dayName => (
                        <th className="calendar__day-name" key={dayName}>
                          {dayName}
                        </th>
                      ))}
                    </tr>
                  </thead>
                </table>
              </div>
            </div>
            <ModalBody>
              {dates.map(date => (
                <Calendar date={date} onSelect={selectDates} startDate={startDate} endDate={endDate} />
              ))}
            </ModalBody>
            <ModalFooter>
              <p className="selected-date">
                {getFormattedDate(startDate, endDate)}{' '}
                {hasDates && `(${getDiff(startDate, endDate)} nights)`}
              </p>
              <Button disabled={!hasDates}>
                Done
              </Button>
            </ModalFooter>
          </div>
        </div>
      </Modal>
    </>
  );
}

const monthNames = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];

const getNumDaysInAMonth = (year, month) =>
  new Date(year, month + 1, 0).getDate();
const getNumFirstDay = (year, numMonth) => new Date(year, numMonth, 1).getDay();
const isDateInRage = (startDate, endDate) => (dateToCheck) => {
  return dateToCheck >= startDate && dateToCheck <= endDate
}
const isSameDate = dateToBeChecked => date => moment(date).isSame(moment(dateToBeChecked));

function Calendar(props) {
  const { date, onSelect, startDate, endDate } = props;
  const numMonths = date.getMonth();
  const monthName = monthNames[numMonths];
  const year = date.getFullYear();
  const isDateInBetweenStartAndEndDate = startDate && endDate && isDateInRage(startDate, endDate);

  const numFirstDay = getNumFirstDay(year, numMonths);
  const blanks = [];
  for (let i = 0; i < numFirstDay; i++) {
    blanks.push(<td className="calendar-day" />);
  }

  const numDaysInAMonth = getNumDaysInAMonth(year, numMonths);
  const daysInMonth = [];
  for (let day = 1; day <= numDaysInAMonth; day++) {
    const todayDateObj = new Date(year, numMonths, day);
    
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
