// ----------------------------Step 1---------------------------
// Create the board with 9 cells
let board = ["", "", "", "", "", "", "", "", ""];

function Player(marker, name) {
  this.name = name;
  this.marker = marker;
}

// create the players Object
const player1 = new Player("X", "Player1");
const player2 = new Player("O", "Player2");

// The current player, starts with "X"
let currentPlayer = player1;

//main elements needed for event listeners
let gameStatusText = document.getElementById("now-playing");
const cells = document.getElementsByClassName("cell");
let startGamebtn = document.getElementById("newgame");
let restartGame = document.getElementById("restart");
let player1btn = document.getElementById("player1-btn");
let player2btn = document.getElementById("player2-btn");

// starting function, also used when the game gets restarted
startGame();

getPlayerNames();

// ----------------------------Step 2---------------------------
// Function to handle a player's move
function handleMove(cellIndex) {
  // Check if the clicked cell is already occupied
  if (cells[cellIndex].innerText != "") {
    alert("This field is already occupied.You can only occupy an empty space.");
    return;
  }
  // Marks the cell on the page and the board target element with the current player's marker
  else {
    cells[cellIndex].innerText = currentPlayer.marker;
    board[cellIndex] = currentPlayer.marker;
  }

  // Check for a winning combination
  if (checkWin()) {
    gameStatusText.innerText = `Congratulations ${currentPlayer.name}! You won the game!`;
    endGame(
      `${currentPlayer.name} won this game! Press Restart to play again.`
    );
  }

  // Check if the board is full (game ends in a tie)
  else if (!board.includes("")) {
    endGame(`It's a tie! Press Restart to play again.`);
  }

  // Switch the turn to the next player
  else if (currentPlayer != player2) {
    gameStatusText.innerText = `It's ${player2.name}'s turn.`;
    return (currentPlayer = player2);
  } else {
    gameStatusText.innerText = `It's ${player1.name}'s turn.`;
    return (currentPlayer = player1);
  }
}

// --------------------------------Step 3-------------------------
// Function to check for a winning combination
function checkWin() {
  const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8], // Horizontal combinations
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8], // Vertical combinations
    [0, 4, 8],
    [2, 4, 6], // Diagonal combinations
  ];

  //use the value of the winningCombinations array elements as index number of border array and to pass its value ('X' or 'O') to the winningCombinations array elements. So element with value 0 returns the value of border[0] etc.
  for (let i = 0; i < winningCombinations.length; i++) {
    for (let j = 0; j < 3; j++) {
      if (board[winningCombinations[i][j]] == "") {
        continue;
      } else {
        winningCombinations[i][j] = board[winningCombinations[i][j]];
      }
      //test if all 3 target values are the same (all 'X' or all 'O')
      if (
        winningCombinations[i][0] == winningCombinations[i][1] &&
        winningCombinations[i][1] == winningCombinations[i][2]
      ) {
        return true;
      }
    }
  }
}

// --------------------------------Step 4-------------------------
// Function to end the game and stops click event to the remaining empty cells
function endGame(message) {
  alert(message);
  for (let cell of cells) {
    cell.removeEventListener("click", cellClickHandler);
  }
}

// Add event listeners to the cells (click event for each cell)
// I moved const cells in the beginning of in the file
function startGame() {
  for (let cell of cells) {
    cell.addEventListener("click", cellClickHandler);
  }
}

function getPlayerNames() {
  player1.name = prompt("Please insert name for Player 1.");
  player2.name = prompt("Please insert name for Player 2.");
  if (player1.name == null || player1.name == "") {
    player1.name = "Player 1";
  }
  if (player2.name == null || player2.name == "") {
    player2.name = "Player 2";
  }
  player1btn.innerText = `${player1.name} (X)`;
  player2btn.innerText = `${player2.name} (O)`;
}

//restart game with same players
function newGame() {
  // clear all the cells and board array
  board = ["", "", "", "", "", "", "", "", ""];
  for (let cell of cells) {
    cell.innerText = "";
  }
  // switch back to player1 again and updates the main game message on the page
  currentPlayer = player1;
  gameStatusText.innerText = `Let the game begin!`;
  // function called to start the game again
  startGame();
}

//new game with new players
function newGameNewPlayers() {
  newGame();
  getPlayerNames();
}

// event listeners for new game & restart game buttons
startGamebtn.addEventListener("click", newGameNewPlayers);
restartGame.addEventListener("click", newGame);

// Event handler for cell clicks
function cellClickHandler() {
  const cellIndex = parseInt(this.dataset.index);
  handleMove(cellIndex);
}
