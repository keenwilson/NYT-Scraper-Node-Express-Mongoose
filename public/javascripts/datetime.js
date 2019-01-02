var dt = new Date();
currentHours = dt.getHours();
currentHours = ("0" + currentHours).slice(-2);
currentMinutes = dt.getMinutes();
currentMinutes = ("0" + currentMinutes).slice(-2);
document.getElementById("datetime").innerHTML =
  ("0" + (dt.getMonth() + 1)).slice(-2) +
  "/" +
  ("0" + dt.getDate()).slice(-2) +
  "/" +
  dt.getFullYear() +
  " " +
  currentHours +
  ":" +
  currentMinutes;
