import React from "react";
import "./react-datetime.css";
import DateTime from "react-datetime";

let inputProps = {
  className: "form-control bg-transparent text-white outline-none w-48 ",
  placeholder: "Select Date",
};

const DateComponent = ({ dateTime, setDateTime }) => {
  return (
    <>
      <DateTime
        onChange={(date) => {
          setDateTime(date);
        }}
        value={dateTime}
        inputProps={inputProps}
        dateFormat={"ddd MMM D YYYY,"}
      />
    </>
  );
};

export default DateComponent;
