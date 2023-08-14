import React, { forwardRef } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const DatePickerButton = ({ startDate, endDate, className }) => {
  const customInput = forwardRef(({ value, onClick }, ref) => (
    <button
      onClick={onClick}
      ref={ref}
      className="custom-input"
      value={value ? value : "Choose Date"}
    ></button>
  ));

  return (
    <DatePicker
      selected={startDate.val}
      onChange={(date) => startDate.set(date)}
      customInput={customInput}
      className=""
    />
  );
};

export default DatePickerButton;
