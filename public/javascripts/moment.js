const moment = require("moment");
// Get the current date and time
const dateTime = moment();
const local = DeviceInfo.getDeviceLocale(); // 'en'
moment.locale(local);

const plainTextDateTime = dateTime => {
  return moment(dateTime).format("DD MMMM HH:mm a"); // 27 January 10:30 am
};

document.getElementById("datetime").innerHTML = plainTextDateTime;
