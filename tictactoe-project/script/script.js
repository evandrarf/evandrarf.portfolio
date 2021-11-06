// mekanik game
const CIRCLE_CLASS = "circle";
const X_CLASS = "x";
const WINNING_COMBINATION = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

// element game
const cellElements = document.querySelectorAll("[data-cell]");
let circleTurn;
const board = document.getElementById("board");
const winningMessageText = document.querySelector("[data-winning-message-text]");
const winningMessageElement = document.getElementById("winningMessage");
const restartButton = document.getElementById("restartButton");

// permainan

startGame();

restartButton.addEventListener("click", startGame);

function startGame() {
  circleTurn = false;
  cellElements.forEach((cell) => {
    cell.classList.remove(CIRCLE_CLASS);
    cell.classList.remove(X_CLASS);
    cell.removeEventListener("click", handleClick);
    cell.addEventListener("click", handleClick, { once: true });
  });
  setBoardHover();
  winningMessageElement.classList.remove("show");
}

// function handleclick
function handleClick(e) {
  const cell = e.target;

  // menentukan giliran
  const currentClass = circleTurn ? CIRCLE_CLASS : X_CLASS;
  placeMark(cell, currentClass);

  //   menentukan peraturan
  if (checkWin(currentClass)) {
    endGame(false);
  } else if (isDraw()) {
    endGame(true);
  }

  // tukar giliran
  swapTurns();
  setBoardHover();
}

// fungsi yang diperlukan

function placeMark(cell, currentClass) {
  cell.classList.add(currentClass);
}

function swapTurns() {
  circleTurn = !circleTurn;
}

function setBoardHover() {
  board.classList.remove(X_CLASS);
  board.classList.remove(CIRCLE_CLASS);

  if (circleTurn) {
    board.classList.add(CIRCLE_CLASS);
  } else {
    board.classList.add(X_CLASS);
  }
}

function endGame(draw) {
  if (draw) {
    winningMessageText.innerText = "Draw";
  } else {
    winningMessageText.innerText = `${circleTurn ? "O" : "X"} WIN!`;
  }
  winningMessageElement.classList.add("show");
}

function isDraw() {
  return [...cellElements].every((cell) => {
    return cell.classList.contains(X_CLASS) || cell.classList.contains(CIRCLE_CLASS);
  });
}

function checkWin(currentClass) {
  return WINNING_COMBINATION.some((combination) => {
    return combination.every((index) => {
      return cellElements[index].classList.contains(currentClass);
    });
  });
}
