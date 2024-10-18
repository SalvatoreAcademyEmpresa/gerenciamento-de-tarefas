import React from "react";
import calendarIcon from "../../assets/img/calendar.svg";

const Reminder = ({ onReminderClick }) => {
  const handleReminderClick = () => {
    window.location.href = "https://calendar.google.com/calendar/u/0/r";
  };

  return (
    <img
      src={calendarIcon}
      alt="Reminder Icon"
      className="reminder-icon"
      onClick={onReminderClick || handleReminderClick}
    />
  );
};

export default Reminder;
