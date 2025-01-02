const button = document.getElementById("start");
const timerParagraph = document.getElementById("timer");
const remainingParagraph = document.getElementById("remaining");
let timer;
let currentMinute;
let currentSecond;
var notificationGranted = false;

function formatNum(num) {
  return num.toString().padStart(2, "0");
}

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
      "HH:" + formatNum(currentMinute) + ":" + formatNum(currentSecond);

    start.style.display = "none";
    nextSpan.style.display = "block";
    currentSpan.style.display = "block";

    if (currentMinute >= 50 && currentMinute < 60) {
      remainingParagraph.innerText = `HH:${formatNum(
        69 - currentMinute
      )}:${formatNum(59 - currentSecond)}`;
    } else if (currentMinute >= 30 && currentMinute < 50) {
      remainingParagraph.innerText = `HH:${formatNum(
        49 - currentMinute
      )}:${formatNum(59 - currentSecond)}`;
    } else if (currentMinute >= 10 && currentMinute < 30) {
      remainingParagraph.innerText = `HH:${formatNum(
        29 - currentMinute
      )}:${formatNum(59 - currentSecond)}`;
    } else if (currentMinute >= 0 && currentMinute < 10) {
      remainingParagraph.innerText = `HH:${formatNum(
        9 - currentMinute
      )}:${formatNum(59 - currentSecond)}`;
    }
    if (
      (currentMinute === 10 || currentMinute === 50) &&
      currentSecond > 0 &&
      currentSecond <= 3
    ) {
      playSound("sound2.mp3");
    } else if (
      currentMinute === 30 &&
      currentSecond > 0 &&
      currentSecond <= 10
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
