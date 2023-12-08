/**
 * Takes user input and converts minutes to seconds.
 *
 * @format
 * @param {Event} e - The event parameter
 */
function getInput(e) {
  e.preventDefault();

  if (document.querySelector(".user-input").value === "") {
    alert("No time entered!");
    return;
  }

  let timeInSeconds =
    e.target.firstChild.nextElementSibling.nextElementSibling.value * 60;

  changeDisplay();

  blinkingLights();

  startTimer(timeInSeconds);
}

/**
 * Changes the display to the showcase the timer.
 */
function changeDisplay() {
  document.querySelector(".start-timer-section").style.display = "none";
  document.querySelector(".display-timer-section").style.display = "grid";
  document
    .querySelector(".cancel-button")
    .addEventListener("click", cancelFunction);
}

/**
 * Fills in div backgrounds one-by-one every second.
 */
function blinkingLights() {
  const light1 = document.querySelector(".light1");
  const light2 = document.querySelector(".light2");
  const light3 = document.querySelector(".light3");

  setTimeout(() => {
    light1.style.backgroundColor = "var(--red)";
  }, 1000);

  setTimeout(() => {
    light2.style.backgroundColor = "var(--red)";
  }, 2000);

  setTimeout(() => {
    light3.style.backgroundColor = "var(--red)";
  }, 3000);

  setTimeout(() => {
    light1.style.backgroundColor = "var(--light-gray)";
    light2.style.backgroundColor = "var(--light-gray)";
    light3.style.backgroundColor = "var(--light-gray)";
  }, 4000);

  setTimeout(blinkingLights, 4000);
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
  const display = document.querySelector(".time");
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
  document.querySelector(".form").addEventListener("submit", getInput);
}

startApp();
