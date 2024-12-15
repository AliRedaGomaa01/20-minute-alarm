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

    timerParagraph.innerText = "HH:" + (currentMinute > 9 ? currentMinute : "0" + currentMinute) + ":" + (currentSecond > 9 ? currentSecond : "0" + currentSecond);
    if (currentMinute%20 === 0 && currentSecond > 0 && currentSecond <= 30) {
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