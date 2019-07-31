import React from 'react';
import moment from 'moment';
import {
  Button,
  Modal,
  ModalBody,
  ModalFooter
} from 'reactstrap';

import Calendar from './Calendar';
import {
  generate12MonthsDate,
  DAYS_NAME,
  getFormattedDate,
  getDiff,
  isSameDate,
} from './helpers';

const TODAY = new Date();
CalendarWithModal.defaultProps = {
  minDate: TODAY,
  numMonths: 12,
  initialStartDate: null,
  initialEndDate: null,
  format: 'ddd D MMM',
  isModalOpen: false,
  toggleModal: () => { },
  onDoneClick: () => { },
  showFormattedDate: (startDate, endDate, format) => getFormattedDate(startDate, endDate, format),
  showNumNights: (startDate, endDate) => `(${getDiff(startDate, endDate)} nights)`,
  buttonText: 'Done',
};

export default function CalendarWithModal(props) {
  const {
    minDate,
    numMonths,
    initialStartDate,
    initialEndDate,
    format,
    isModalOpen,
    toggleModal,
    onDoneClick,
    showNumNights,
    showFormattedDate,
    buttonText,
  } = props;
  
  const [startDate, setStartDate] = React.useState(initialStartDate);
  const [endDate, setEndDate] = React.useState(initialEndDate);

  const dates = generate12MonthsDate(minDate, numMonths);

  const selectDates = date => {
    if (!startDate) {
      setStartDate(date);

      return;
    }
    
    const userHasAlreadySelectedDates = (startDate && endDate);
    const startDateIsAfterEndDate = moment(startDate).isAfter(date);
    const startDateIsSameOfEndDate = isSameDate(startDate)(date);

    if (userHasAlreadySelectedDates || startDateIsAfterEndDate || startDateIsSameOfEndDate) { 
      setStartDate(date);
      setEndDate(null);

      return;
    }
 
   setEndDate(date);
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
                  monthDate={date}
                  onSelect={selectDates}
                  startDate={startDate}
                  endDate={endDate}
                />
              ))}
            </ModalBody>
            <ModalFooter>
              <p className="selected-date">
                {showFormattedDate(startDate, endDate, format)}{' '}
                 {hasDates && showNumNights(startDate, endDate)}
              </p>
              <Button disabled={!hasDates} onClick={handleDoneClick}>
                {buttonText}
              </Button>
            </ModalFooter>
          </div>
        </div>
      </Modal>
    </>
  );
}