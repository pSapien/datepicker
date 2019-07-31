import React from 'react';
import { Input } from 'reactstrap';

import CalendarWithModal from './CalendarWithModal';
import { getFormattedDate } from './helpers';

const INPUT_DATE_TEXT_FORMAT = 'DD MMM YYYY';
MobileDateRangePickerInput.defaultProps = {
  initialOn: false,
  toggleModal: null,
  inputProps: {},
  initialStartDate: null,
  initialEndDate: null,
  showInputText: (startDate, endDate) => startDate && endDate && getFormattedDate(startDate, endDate, INPUT_DATE_TEXT_FORMAT),
};

export default function MobileDateRangePickerInput(props) {
  const { showInputText, initialOn, toggleModal, inputProps, ...rest } = props;

  const [on, setIsOn] = React.useState(initialOn) 

  const toggle = () => setIsOn(!on);

  return (
    <React.Fragment>
      <Input value={showInputText(rest.initialStartDate, rest.initialEndDate)} readOnly onClick={toggle} {...inputProps} />
      <CalendarWithModal
        isModalOpen={on}
        toggleModal={toggleModal || toggle}
        {...rest}
      />
    </React.Fragment>
  )
}