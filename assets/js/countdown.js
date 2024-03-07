let timeLeft = 60;

function startTimer() {
  const timerInterval = setInterval(() => {
    timeLeft--;
    document.getElementById("timer").innerText = timeLeft.toString();
    if (timeLeft === 0) {
      endGame();
      clearInterval(timerInterval);
    }
  }, 1000);
}
