// Board with manually placed food emoji walls
const board = [
  ['❤️', '.', '.', '🍕', '.', '.', '.', '.', '🍔', '.', '🍩', '.'],
  ['🍟', '🌭', '.', '🥪', '.', '🍔', '.', '.', '🍩', '🍕', '.', '🌭'],
  ['🍔', '.', '.', '.', '.', '.', '🍟', '.', '🍩', '.', '🥪', '🍕'],
  ['🥪', '.', '🍩', '.', '🌭', '🍕', '.', '.', '🍔', '🍟', '.', '🍩'],
  ['.', '.', '.', '🍕', '.', '🍩', '.', '🥪', '.', '.', '.', '.'],
  ['.', '🍟', '🌭', '.', '🍔', '.', '.', '🍩', '.', '🥪', '🍕', '.'],
  ['.', '.', '🥪', '.', '.', '.', '🍟', '🍔', '.', '🍩', '.', '.'],
  ['🍔', '.', '.', '🍕', '.', '🥪', '.', '.', '.', '🍩', '.', '🍟'],
  ['🍟', '🌭', '.', '🍔', '.', '.', '.', '🥪', '.', '🍩', '.', '.'],
  ['.', '.', '.', '.', '🍕', '.', '🍟', '🌭', '.', '🥪', '🍔', '.'],
  ['.', '🥪', '🍟', '.', '.', '🍔', '.', '🍕', '.', '🍩', '.', '.'],
  ['.', '.', '🍕', '.', '.', '.', '.', '.', '🥪', '.', '.', '💖']
];

const startPos = { row: 0, col: 0 };
let playerPos = { ...startPos };

const boardDiv = document.getElementById('game-board');

// Draw the board
function drawBoard() {
  boardDiv.innerHTML = '';
  for (let r = 0; r < 12; r++) {
    for (let c = 0; c < 12; c++) {
      const cellDiv = document.createElement('div');
      cellDiv.classList.add('cell');

      if (r === playerPos.row && c === playerPos.col) {
        const img = document.createElement('img');
        img.src = 'naigirl.png';
        cellDiv.appendChild(img);
      } else if (board[r][c] === '💖') {
        const img = document.createElement('img');
        img.src = 'naiboy.png';
        cellDiv.appendChild(img);
      } else if (board[r][c] !== '.') {
        cellDiv.classList.add('obstacle');
        cellDiv.textContent = board[r][c];
      }

      boardDiv.appendChild(cellDiv);
    }
  }
}

// Obstacle popup
function showPopup(message) {
  const popup = document.getElementById('popup');
  popup.textContent = message;
  popup.classList.add('show');

  setTimeout(() => {
    popup.classList.remove('show');
    playerPos = { ...startPos };
    drawBoard();
  }, 1200);
}

// Valentine popup
function showValentinePopup() {
  const valPopup = document.getElementById('valentine-popup');

  // fill HTML dynamically
  valPopup.innerHTML = `
    <p>Will you be my Valentine and Anniversary date, baby? </p>
    <p>When: Feb 27, 2025</p>
    <p>Time: 5:00 PM</p>
    <button id="yes-btn">YES</button>
    <button id="no-btn">NO... </button>
  `;
  valPopup.style.display = 'block';

  const yesBtn = document.getElementById('yes-btn');
  const noBtn = document.getElementById('no-btn');

  const noMessages = [
    "Really?", "PLEASEEEEEE", "Don't be shy! 😘",
    "Are you sure?", "WEEEEEEH", "CORNYYYY",
    "BILIS NA ABA", "PUKEPUKEPUKE", "ISA",
    "KULIT HA", "PARANG DI LOVE"
  ];
  let noIndex = 0;
  let yesSize = 20;
  let noSize = 20;

  yesBtn.style.fontSize = yesSize + "px";
  noBtn.style.fontSize = noSize + "px";

  yesBtn.onclick = () => {
  valPopup.innerHTML = `
    <p style="
      font-family: 'Quicksand', sans-serif;
      font-size: 28px;
      color: #880e4f;
      text-align: center;
      line-height: 1.5;
    ">
      Yay! never doubted you a sec, baby 💗 Happy Valentine's Day! 
    </p>
  `;
  valPopup.style.display = 'block';
};

  noBtn.onmouseover = () => {
    noBtn.style.transform = `translateX(${Math.random() * 150 - 75}px) translateY(${Math.random() * 50 - 25}px)`;
  };

  noBtn.onclick = () => {
    noBtn.textContent = noMessages[noIndex];
    noIndex = (noIndex + 1) % noMessages.length;

    noSize = Math.max(10, noSize - 2);
    noBtn.style.fontSize = noSize + "px";

    yesSize += 2;
    yesBtn.style.fontSize = yesSize + "px";

    noBtn.style.transform = `translateX(${Math.random() * 100 - 50}px) translateY(${Math.random() * 40 - 20}px)`;
  };
}

// Move player function
function movePlayer(dr, dc) {
  const newRow = playerPos.row + dr;
  const newCol = playerPos.col + dc;
  if (newRow < 0 || newRow >= 12 || newCol < 0 || newCol >= 12) return;

  const cellContent = board[newRow][newCol];

  if (cellContent !== '.' && cellContent !== '💖') {
    showPopup(`You hit ${cellContent}! YOU POOPY FATASS !!! 😆 BLEEEEEH!`);
    return;
  }

  playerPos.row = newRow;
  playerPos.col = newCol;
  drawBoard();

  if (cellContent === '💖') {
    showValentinePopup();
  }
}

// Keyboard controls
document.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowUp') movePlayer(-1, 0);
  if (e.key === 'ArrowDown') movePlayer(1, 0);
  if (e.key === 'ArrowLeft') movePlayer(0, -1);
  if (e.key === 'ArrowRight') movePlayer(0, 1);
});

drawBoard();
