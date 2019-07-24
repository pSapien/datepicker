import React from 'react';
import moment from 'moment';
import { Button, Modal, ModalBody, ModalFooter } from 'reactstrap';

import Calendar from './Calendar';
import { generate12MonthsDate, DAYS_NAME, getFormattedDate, getDiff } from './helpers';

const TODAY = new Date();
CalendarWithModal.defaultProps = {
  minDate: TODAY,
  numberOfMonths: 12,
  initialStartDate: null,
  initialEndDate: null,
  format: 'ddd D MMM',
  isModalOpen: false,
  toggleModal: () => { },
  onDoneClick: () => { },
};

export default function CalendarWithModal(props) {
  const {
    minDate,
    numberOfMonths,
    initialStartDate,
    initialEndDate,
    format,
    isModalOpen,
    toggleModal,
    onDoneClick,
  } = props;
  
  const [startDate, setStartDate] = React.useState(initialStartDate);
  const [endDate, setEndDate] = React.useState(initialEndDate);

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

  function handleDoneClick() { 
    onDoneClick(startDate, endDate);
  }

  const hasDates = startDate && endDate;

  return (
    <>
      <Button onClick={toggleModal}>Open calc</Button>
      <Modal isOpen={isModalOpen} toggle={toggleModal} className="calendar-modal">
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
                <Calendar
                  date={date}
                  onSelect={selectDates}
                  startDate={startDate}
                  endDate={endDate}
                />
              ))}
            </ModalBody>
            <ModalFooter>
              <p className="selected-date">
                {getFormattedDate(startDate, endDate, format)}{' '}
                {hasDates && `(${getDiff(startDate, endDate)} nights)`}
              </p>
              <Button disabled={!hasDates} onClick={handleDoneClick}>
                Done
              </Button>
            </ModalFooter>
          </div>
        </div>
      </Modal>
    </>
  );
}