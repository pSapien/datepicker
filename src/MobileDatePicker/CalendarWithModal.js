import React from 'react';
import moment from 'moment';
import { Button, Modal, ModalBody, ModalFooter } from 'reactstrap';

import Calendar from './Calendar';
import { generate12MonthsDate, DAYS_NAME, getFormattedDate, getDiff } from './helpers';

CalendarWithModal.defaultProps = {
  minDate: new Date(),
  numberOfMonths: 12,
};


export default function CalendarWithModal(props) {
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