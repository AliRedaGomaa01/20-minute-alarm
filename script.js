const button = document.getElementById("start");
const timerParagraph = document.getElementById("timer");
let timer;
let currentMinute;
let currentSecond;

button.addEventListener("click", () => {
  clearInterval(timer);
  
  timer = setInterval(() => {
    currentMinute = new Date().getMinutes();
    currentSecond = new Date().getSeconds();

    timerParagraph.innerText = "HH:" + (currentMinute > 9 ? currentMinute : "0" + currentMinute) + ":" + (currentSecond > 9 ? currentSecond : "0" + currentSecond);
    if (currentMinute%20 === 0 && currentSecond > 0 && currentSecond <= 15) {
      if (currentMinute === 0) {
        playSound("sound2.mp3");
      } else {
        playSound("sound.mp3");
      }
    }
  }, 1000);
})

function playSound(file) {
  const audio = new Audio(file);
  audio.play().catch((error) => console.log("Sound playback error:", error));
}