function Clock() {
  let now = new Date();
  let hours = now.getHours();
  let minutes = String(now.getMinutes()).padStart(2, "0");
  let seconds = String(now.getSeconds()).padStart(2, "0");
  let AmPm = hours >= 12 ? "PM" : "AM";

  if (hours === 0) {
    hours = 12;
  } else if (hours > 12) {
    hours = hours - 12;
  }

  document.getElementById(
    "time"
  ).innerHTML = `${hours} : ${minutes} : ${seconds} : ${AmPm}`;
}

setInterval(Clock, 1000);
Clock();
