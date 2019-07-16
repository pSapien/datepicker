import React from 'react';
import moment from 'moment';
import omit from 'lodash/omit';
import { SingleDatePicker, SingleDatePickerPhrases } from 'react-dates';

import { HORIZONTAL_ORIENTATION, ANCHOR_LEFT } from './constants';
import isInclusivelyAfterDay from './isInclusivelyAfterDay';

export default function SingleDatePickerWrapper(props) {
  const { autoFocus, initialDate } = props;

  const [focused, setFocused] = React.useState(autoFocus);
  const [date, setDate] = React.useState(initialDate);

  const handleFocusChange = ({ focused }) => setFocused(focused);
  const handleDateChange = date => setDate(date);

  const newProps = omit(props, ['autoFocus', 'initialDate']);

  return (
    <SingleDatePicker
      {...newProps}
      id="date_input"
      date={date}
      focused={focused}
      onDateChange={handleDateChange}
      onFocusChange={handleFocusChange}
      readOnly
    />
  );
}

SingleDatePickerWrapper.defaultProps = {
  // example props for the demo
  autoFocus: false,
  initialDate: null,

  // input related props
  id: 'date',
  placeholder: 'Date',
  disabled: false,
  required: false,
  screenReaderInputMessage: '',
  showClearDate: false,
  showDefaultInputIcon: false,
  customInputIcon: null,
  block: false,
  small: false,
  regular: false,
  verticalSpacing: undefined,
  keepFocusOnInput: false,

  // calendar presentation and interaction related props
  renderMonthText: null,
  orientation: HORIZONTAL_ORIENTATION,
  anchorDirection: ANCHOR_LEFT,
  horizontalMargin: 0,
  withPortal: false,
  withFullScreenPortal: false,
  initialVisibleMonth: null,
  numberOfMonths: 1,
  keepOpenOnDateSelect: false,
  reopenPickerOnClearDate: false,
  isRTL: false,

  // navigation related props
  navPrev: null,
  navNext: null,
  onPrevMonthClick() {},
  onNextMonthClick() {},
  onClose() {},

  // day presentation and interaction related props
  renderCalendarDay: undefined,
  renderDayContents: null,
  enableOutsideDays: false,
  isDayBlocked: () => false,
  isOutsideRange: day => !isInclusivelyAfterDay(day, moment()),
  isDayHighlighted: () => {},

  // internationalization props
  displayFormat: () => 'DD MMM YYYY',
  monthFormat: 'MMMM YYYY',
  phrases: SingleDatePickerPhrases,
};
