const LINES = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];
const boardEl = document.getElementById("board");
const statusEl = document.getElementById("status");
const scoreEl = document.getElementById("score");
const scores = { X: 0, O: 0, Draw: 0 };
let board, player, over;

const cells = Array.from({ length: 9 }, (_, i) => {
  const b = document.createElement("button");
  b.className = "cell";
  b.setAttribute("aria-label", "Square " + (i + 1));
  b.addEventListener("click", () => play(i));
  boardEl.appendChild(b);
  return b;
});

function newGame() {
  board = Array(9).fill(null);
  player = "X";
  over = false;
  cells.forEach(c => { c.textContent = ""; c.className = "cell"; c.disabled = false; });
  statusEl.textContent = "X's turn";
}

function play(i) {
  if (over || board[i]) return;
  board[i] = player;
  cells[i].textContent = player;
  cells[i].classList.add(player);
  cells[i].disabled = true;

  const line = LINES.find(l => l.every(k => board[k] === player));
  if (line) {
    line.forEach(k => cells[k].classList.add("win"));
    return end(player + " wins!", player);
  }
  if (board.every(Boolean)) return end("It's a draw.", "Draw");

  player = player === "X" ? "O" : "X";
  statusEl.textContent = player + "'s turn";
}

function end(message, key) {
  over = true;
  scores[key]++;
  statusEl.textContent = message;
  cells.forEach(c => c.disabled = true);
  renderScore();
}

function renderScore() {
  scoreEl.textContent = `X ${scores.X} · O ${scores.O} · Draws ${scores.Draw}`;
}

document.getElementById("restart").addEventListener("click", newGame);
renderScore();
newGame();