/**
 * Takes user input and converts minutes to seconds.
 *
 * @format
 * @param {Event} e - The event parameter
 */
function getInput(e) {
  e.preventDefault();

  if (document.querySelector("#user-input").value === "") {
    alert("No time entered!");
    return;
  }

  let timeInSeconds =
    e.target.firstChild.nextElementSibling.nextElementSibling.value * 60;

  changeDisplay();

  startTimer(timeInSeconds);
}

/**
 * Changes the display to the showcase the timer.
 */
function changeDisplay() {
  document.querySelector("#enter-time-section").style.display = "none";

  document.querySelector("#show-timer-section").style.display = "flex";
  document
    .querySelector("#cancel-button")
    .addEventListener("click", cancelFunction);
}

/**
 * Cancels the currently running timer.
 */
function cancelFunction() {
  if (confirm("Are you sure?")) {
    setTimeout(function () {
      location.reload();
    }, 300);
  }
}

/**
 * Starts the countdown timer and checks if it has finished.
 *
 * @param {number} timeInSeconds - A number representing seconds
 */
function startTimer(timeInSeconds) {
  clearInput();
  let timer = timeInSeconds;
  const interval = setInterval(function () {
    minutesAndSeconds = getMinutesAndSeconds(timer);
    displayContent(minutesAndSeconds);
    if (--timer < 0) {
      timerFinished(interval);
    }
  }, 1000);
}

/**
 * Clears the user input field.
 */
function clearInput() {
  const time = document.querySelector("#user-input");
  time.value = "";
}

/**
 * Creates time format for UI.
 *
 * @param {number} timer - A number representing the number of seconds remaining
 * @returns {number[]} - Returns an array with the remaining seconds and minutes
 */
function getMinutesAndSeconds(timer) {
  minutes = parseInt(timer / 60, 10);
  seconds = parseInt(timer % 60, 10);

  minutes = minutes < 10 ? "0" + minutes : minutes;
  seconds = seconds < 10 ? "0" + seconds : seconds;
  return [minutes, seconds];
}

/**
 * Displays the current countdown time.
 *
 * @param {number[]} minutesAndSeconds - An array of numbers representing the
 *     remaining minutes and seconds
 */
function displayContent(minutesAndSeconds) {
  const display = document.querySelector("#display");
  display.textContent = minutesAndSeconds[0] + ":" + minutesAndSeconds[1];
}

/**
 * Shows an alert when the timer has finished.
 *
 * @param {number} interval - A number representing the interval
 */
function timerFinished(interval) {
  clearInterval(interval);
  setTimeout(function () {
    alert("Timer Ended!!");
    location.reload();
  }, 1000);
}

/**
 * Starts the application.
 */
function startApp() {
  document.querySelector("#form").addEventListener("submit", getInput);
}

startApp();
