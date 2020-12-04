import moment from "moment";

export const formatTime = (dateTime) =>
  moment(dateTime).format("ddd MMM D YYYY, h:mm a");
