import React, { Component } from 'react';
import ReactDayPicker from 'react-day-picker/lib/src/DayPicker';
import "react-day-picker/lib/style.css";
import { splitProps, zeroTime } from './utils';
import dayjs from 'dayjs';

let defaultProps = {
  className: '',
  dayPickerRef: () => {},
  getTodayButtonLabel: (locale) => '',
  hideTodayButton: false,
  isRange: false,
  labels: ReactDayPicker.defaultProps.labels,
  onChange: () => {},
  pickerClassName: ''
};

export default class DayPicker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: props.date,
      monthToDisplay: props.date
    };
  }

  handleCaptionChange = ({ month, year, captionIndex }) => {
    let monthToDisplay = captionIndex === 0 ?
      new Date(year, month) :
      dayjs(new Date(year, month)).subtract(1, 'month').toDate();

    this.setState({ monthToDisplay });
  }

  handleMonthChange = date => {
    this.setState({ monthToDisplay: date });
  };

  handleTodayClick = () => {
    this.props.onChange(zeroTime(new Date()));
  };

  render() {
    let {
      className,
      dayPickerRef,
      isRange,
      hideTodayButton,
      onChange, // eslint-disable-line no-unused-vars
      getTodayButtonLabel,
      locale,
      pickerClassName,
      ...restProps
    } = this.props;

    let { monthToDisplay } = this.state;

    let splittedProps = splitProps(restProps, Object.keys(ReactDayPicker.propTypes));
    let commonProps = splittedProps[0];
    let pickerSpecificProps = splittedProps[1];

    let todayButton = hideTodayButton ? null : (
      <button
        type="button"
        className={`btn btn-sm btn-default opuscapita_day-picker__today-button`}
        onClick={this.handleTodayClick}
        tabIndex={-1}
      >
        {getTodayButtonLabel(locale)}
      </button>
    );

    return (
      <div className={`opuscapita_day-picker ${className}`} { ...commonProps }>
        <div className={`opuscapita_day-picker__header`}></div>
        <div className={`opuscapita_day-picker__picker`}>
          <ReactDayPicker
            ref={el => dayPickerRef(el)}
            className={pickerClassName}
            locale={locale}
            firstDayOfWeek={locale === 'en' ? 0 : 1}
            onMonthChange={this.handleMonthChange}
            onWeekClick={() => {}}
            tabIndex={-1}
            showWeekNumbers={true}
            { ...pickerSpecificProps }
            month={monthToDisplay}
          />
        </div>
        <div className={`opuscapita_day-picker__footer`}>
          {todayButton}
        </div>
      </div>
    );
  }
}

DayPicker.defaultProps = defaultProps;