const tanah = document.querySelectorAll(".tanah");
const tikus = document.querySelectorAll(".tikus");
const scoreBoard = document.querySelector(".scoreBoard");
const changeBoard = document.querySelector(".changeBoard");
const resultScore = document.querySelector(".resultScore");
const result = document.querySelector(".result");
const closeButton = document.querySelector(".fa-times-circle");

let previousMole;
let stop;
let score;
let change;

function randomMole(tanah) {
  const random = Math.floor(Math.random() * tanah.length);
  const tRandom = tanah[random];

  if (tRandom == previousMole) {
    return randomMole(tanah);
  }

  previousMole = tRandom;
  return tRandom;
}

function randomNum(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}

function showMole() {
  const random = randomMole(tanah);
  const randomNumber = randomNum(800, 1000);

  random.classList.add("muncul");

  setTimeout(() => {
    if (random.classList.contains("muncul")) {
      change--;
      changeBoard.textContent = change;
    }
    random.classList.remove("muncul");
    if (change !== 0) {
      showMole();
    } else {
      result.classList.add("muncul");
      resultScore.textContent = score;
      scoreBoard.textContent = 0;
      changeBoard.textContent = 3;
      closeButton.addEventListener("click", function () {
        result.classList.remove("muncul");
      });
    }
  }, randomNumber);
}

function start() {
  change = 3;
  score = 0;
  scoreBoard.textContent = 0;
  changeBoard.textContent = 3;
  showMole();

  // setTimeout(() => {
  //   stop = true;
  // }, 10000);
}

function smash() {
  // if (this.parentNode.classList.contains("muncul")) {
  // change++;
  score++;
  // }

  this.parentNode.classList.remove("muncul");
  scoreBoard.textContent = score;
}

tikus.forEach((tks) => {
  tks.addEventListener("click", smash);
});
