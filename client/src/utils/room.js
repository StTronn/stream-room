import moment from "moment";

export const formatTime = (dateTime) =>
  moment(dateTime).format("ddd MMM D YYYY, h:mm a");

export const shortFormatTime = (dateTime) =>
  moment(dateTime).format("D MMM YYYY h:mm a");
