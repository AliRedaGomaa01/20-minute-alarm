const button = document.getElementById("start");
const timerParagraph = document.getElementById("timer");
let timer;

button.addEventListener("click", () => {
  clearInterval(timer);
  let currentMinute = new Date().getMinutes();
  let currentSecond = new Date().getSeconds();

  timer = setInterval(() => {
    currentSecond+=1;
    if (currentSecond === 60) {
      currentMinute+=1;
      currentSecond = 0;
    }

    timerParagraph.innerText = "HH:" + (currentMinute > 10 ? currentMinute : "0" + currentMinute) + ":" + (currentSecond > 10 ? currentSecond : "0" + currentSecond);

    if (currentMinute%20 === 0 && currentSecond > 0 && currentSecond <= 30) {
      playSound();
    }
  }, 1000);
})

function playSound() {
  const audio = new Audio("sound.mp3");
  audio.play().catch((error) => console.log("Sound playback error:", error));
}