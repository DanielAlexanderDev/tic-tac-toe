const arrowButton = document.getElementById("upArrow");
const downArrowButton = document.getElementById("downArrow");
const handleShowSocial = () => {
  const footer = document.getElementById("footer");
  if (footer.style.display === "none") {
    footer.style.display = "flex";
    footer.style.position = "absolute";
    footer.style.zIndex = "10";
    console.log(footer.style.display);
  } else {
    footer.style.display = "none";
  }
};
arrowButton.addEventListener("click", handleShowSocial);
downArrowButton.addEventListener("click", handleShowSocial);

const cells = [
  (topLeft = document.getElementById("top-left")),
  (topCenter = document.getElementById("top-center")),
  (topRight = document.getElementById("top-right")),
  (centerLeft = document.getElementById("center-left")),
  (center = document.getElementById("center")),
  (centerRight = document.getElementById("center-right")),
  (botLeft = document.getElementById("bot-left")),
  (botCenter = document.getElementById("bot-center")),
  (botRight = document.getElementById("bot-right")),
];
const restartButton = document.getElementById("restart-button");
restartButton.addEventListener("click", clearTable);
const text = document.getElementById("msg-text");
let currentTurn = "x";

const WIN_COMBINATIONS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

const startGame = () => {
  currentTurn = "x";
  cells.forEach((cell) => {
    cell.innerText = "";
    text.innerText = "";
    cell.classList.remove("o-cell");
    cell.classList.remove("x-cell");
    cell.removeEventListener("click", handleClick);
    cell.addEventListener("click", handleClick, { once: true });
  });
};

startGame();

function handleClick(e) {
  let cell = e.target;
  currentTurn;
  placeMark(cell, currentTurn);
  if (winnerCheck(currentTurn)) {
    text.innerText = `${currentTurn} WINS!`;
    cells.forEach((cell) => cell.removeEventListener("click", handleClick));
    return;
  }
  if (drawCheck()) {
    text.innerText = "DRAW!";
    return;
  }
  changeTurn(currentTurn);
}

function placeMark(cell, turn) {
  turn == "x"
    ? (cell.classList.add("x-cell"), (cell.innerText = "X"))
    : (cell.classList.add("o-cell"), (cell.innerText = "O"));
}

function changeTurn(turn) {
  turn == "x"
    ? ((currentTurn = "o"), (text.style = "color: #00EBFE"))
    : ((currentTurn = "x"), (text.style = "color: #CF2BD0"));
  text.innerHTML = `${currentTurn} TURN`;
}

function winnerCheck(currentTurn) {
  return WIN_COMBINATIONS.some((combination) => {
    return combination.every((index) => {
      return cells[index].classList.contains(`${currentTurn}-cell`);
    });
  });
}

function clearTable() {
  startGame();
}

function drawCheck() {
  let counter = 0;
  for (let i = 0; i < cells.length; i++) {
    if (cells[i].innerHTML == "") {
      counter++;
    }
  }
  if (counter == 0) {
    return true;
  }
}
