const button = document.getElementById("start");
const timerParagraph = document.getElementById("timer");
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

  timer = setInterval(() => {
    currentMinute = new Date().getMinutes();
    currentSecond = new Date().getSeconds();

    timerParagraph.innerText =
      "HH:" +
      (currentMinute > 9 ? currentMinute : "0" + currentMinute) +
      ":" +
      (currentSecond > 9 ? currentSecond : "0" + currentSecond);
    if (currentMinute % 20 === 0 && currentSecond > 0 && currentSecond <= 5) {
      if (currentMinute === 0) {
        playSound("sound2.mp3");
      } else {
        playSound("sound.mp3");
      }
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
