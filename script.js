const button = document.getElementById("start");
const timerParagraph = document.getElementById("timer");
const remainingParagraph = document.getElementById("remaining");
let timer;
let currentMinute;
let currentSecond;
var notificationGranted = false;

button.addEventListener("click", () => {
  if ("Notification" in window) {
    Notification.requestPermission().then((permission) => {
      if (permission === "granted") {
        notificationGranted = true;
      } else {
        console.log("Notification permission denied.");
      }
    });
  } else {
    alert("Browser does not support notifications.");
  }

  clearInterval(timer);

  timer = setInterval(async () => {
    currentMinute = new Date().getMinutes();
    currentSecond = new Date().getSeconds();

    timerParagraph.innerText =
      "HH:" +
      (currentMinute > 9 ? currentMinute : "0" + currentMinute) +
      ":" +
      (currentSecond > 9 ? currentSecond : "0" + currentSecond);

    if (currentSecond === 0) {
      if (currentMinute >= 30 && currentMinute < 50){
        remainingParagraph.innerText = `next alarm in: HH:50:00`;
      } else if (currentMinute >= 10 && currentMinute < 30){
        remainingParagraph.innerText = `next alarm in: HH:30:00`;
      } else {
        remainingParagraph.innerText = `next alarm in: HH:10:00`;
      }
    }
    if (
      (currentMinute === 10 || currentMinute === 30 || currentMinute === 50) &&
      currentSecond > 0 &&
      currentSecond <= 5
    ) {
      playSound("sound2.mp3");
    }
  }, 1000);
});

function playSound(file) {
  const audio = new Audio(file);
  audio.play().catch((error) => console.log("Sound playback error:", error));

  if (notificationGranted) {
    new Notification("Time's up!", {
      body: "20 minutes have passed!",
    });
  }
}
