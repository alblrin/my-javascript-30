let countdown;
const timerDisplay = document.querySelector('.display__time-left');
const endTime = document.querySelector('.display__end-time');

function timer(seconds) {
  const now = Date.now();
  const then = now + seconds * 1000;

  countdown = setInterval(() => {
    const secondsLeft = Math.round((then - Date.now()) / 1000);

    if(secondsLeft < 0) {
      clearInterval(countdown);
      return;
    }

    displayTimeLeft(secondsLeft);
    displayEndTime(then);
  }, 1000);
}

function displayTimeLeft(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  const display = `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`
  timerDisplay.innerText = display;
  document.title = display;
}

function displayEndTime(timestamp) {
  const end = new Date(timestamp);
  const hours = end.getHours();
  const minutes = end.getMinutes();
  endTime.textContent = `Be Back At ${hours}:${minutes < 10 ? '0' : ''}${minutes}`;
}
