import React from 'react';
import omit from 'lodash/omit';
import moment from 'moment';
import { DateRangePicker, DateRangePickerShape } from 'react-dates';

import {
  START_DATE,
  END_DATE,
  HORIZONTAL_ORIENTATION,
  ANCHOR_LEFT,
} from './constants';
import isInclusivelyAfterDay from './isInclusivelyAfterDay';
import 'react-dates/lib/css/_datepicker.css';

/**
 *
 * @param {*} props
 * @see https://github.com/airbnb/react-dates/blob/master/examples/DateRangePickerWrapper.jsx
 * for the implementation details
 */

export default function DesktopDateRangePickerWrapper(props) {
  const {
    autoFocus,
    initialEndDate,
    initialStartDate,
    autoFocusEndDate,
  } = props;

  const [focusedInput, setInputFocus] = React.useState(
    getDefaultInputFocus(autoFocus, autoFocusEndDate)
  );
  const [{ startDate, endDate }, setDates] = React.useState({
    startDate: initialStartDate,
    endDate: initialEndDate,
  });

  function handleDatesChange({ startDate, endDate }) {
    const { stateDateWrapper } = props;

    setDates({
      startDate: startDate && stateDateWrapper(startDate),
      endDate: endDate && stateDateWrapper(endDate),
    });
  }

  function handleFocusChange(focusedInput) {
    setInputFocus(focusedInput);
  }

  const newerProps = omit(props, [
    'autoFocus',
    'autoFocusEndDate',
    'initialStartDate',
    'initialEndDate',
    'stateDateWrapper',
  ]);

  return (
    <DateRangePicker
      {...newerProps}
      onDatesChange={handleDatesChange}
      onFocusChange={handleFocusChange}
      focusedInput={focusedInput}
      startDate={startDate}
      endDate={endDate}
    />
  );
}

DesktopDateRangePickerWrapper.defaultProps = {
  // example props for the demo
  autoFocus: false,
  autoFocusEndDate: false,
  initialStartDate: null,
  initialEndDate: null,

  // input related props
  startDateId: START_DATE,
  startDatePlaceholderText: 'Start Date',
  endDateId: END_DATE,
  endDatePlaceholderText: 'End Date',
  disabled: false,
  required: false,
  screenReaderInputMessage: '',
  showClearDates: false,
  showDefaultInputIcon: false,
  customInputIcon: null,
  customArrowIcon: null,
  customCloseIcon: null,
  block: false,
  small: false,
  regular: false,

  // calendar presentation and interaction related props
  renderMonthText: null,
  orientation: HORIZONTAL_ORIENTATION,
  anchorDirection: ANCHOR_LEFT,
  horizontalMargin: 0,
  withPortal: false,
  withFullScreenPortal: false,
  initialVisibleMonth: null,
  numberOfMonths: 2,
  keepOpenOnDateSelect: false,
  reopenPickerOnClearDates: false,
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
  minimumNights: 1,
  enableOutsideDays: false,
  isDayBlocked: () => false,
  isOutsideRange: day => !isInclusivelyAfterDay(day, moment()),
  isDayHighlighted: () => false,

  // internationalization
  displayFormat: () => 'DD MMM YYYY',
  monthFormat: 'DD MMM YYYY',
  pharses: DateRangePickerShape,

  stateDateWrapper: date => date,
};

function getDefaultInputFocus(focusOnStart, focusOnEnd) {
  if (focusOnStart) return START_DATE;
  if (focusOnEnd) return END_DATE;

  return null;
}
