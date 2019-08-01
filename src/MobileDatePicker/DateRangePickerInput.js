import React from 'react';
import { Input } from 'reactstrap';
import DateRangePicker from 'react-bootstrap-daterangepicker';

import CalendarWithModal from './CalendarWithModal';
import { getFormattedDate } from './helpers';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-daterangepicker/daterangepicker.css';

const INPUT_DATE_TEXT_FORMAT = 'DD MMM YYYY';
MobileDateRangePickerInput.defaultProps = {
  initialOn: false,
  toggleModal: null,
  inputProps: {},
  initialStartDate: null,
  initialEndDate: null,
  minDate: new Date(),
  onApply: () => {},
  showInputText: (startDate, endDate) =>
    startDate &&
    endDate &&
    getFormattedDate(startDate, endDate, INPUT_DATE_TEXT_FORMAT),
};

export default function MobileDateRangePickerInput(props) {
  const {
    showInputText,
    initialOn,
    toggleModal,
    inputProps,
    minDate,
    onApply,
    ...rest
  } = props;

  const [on, setIsOn] = React.useState(initialOn);
  const toggle = () => setIsOn(!on);

  const dateAsInputText = showInputText(
    rest.initialStartDate,
    rest.initialEndDate
  );

  return (
    <React.Fragment>
      <div className="">
        <Input
          value={dateAsInputText}
          readOnly
          onClick={toggle}
          {...inputProps}
        />
        <CalendarWithModal
          isModalOpen={on}
          toggleModal={toggleModal || toggle}
          {...rest}
        />
      </div>
      <div className="">
        <DateRangePicker onApply={onApply} minDate={minDate} autoApply>
          <Input value={dateAsInputText} readOnly {...inputProps} />
        </DateRangePicker>
      </div>
    </React.Fragment>
  );
}
