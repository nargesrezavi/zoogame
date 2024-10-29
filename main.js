
const cells = document.querySelectorAll('.cell');
const statusText = document.getElementById('status');
const restartBtn = document.getElementById('restart');
let currentPlayer = 'X';
let gameState = ["", "", "", "", "", "", "", "", ""];
let gameActive = true;

// Winning conditions
const winConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

// Handle cell click
cells.forEach(cell => {
    cell.addEventListener('click', () => {
        const index = cell.getAttribute('data-index');

        // Only proceed if the cell is empty and the game is active
        if (gameState[index] === "" && gameActive) {
            gameState[index] = currentPlayer;
            cell.textContent = currentPlayer;
            checkForWinner();
            togglePlayer();
        }
    });
});

// Check for winner
function checkForWinner() {
    let roundWon = false;

    for (let i = 0; i < winConditions.length; i++) {
        const [a, b, c] = winConditions[i];
        if (gameState[a] && gameState[a] === gameState[b] && gameState[a] === gameState[c]) {
            roundWon = true;
            break;
        }
    }

    if (roundWon) {
        statusText.textContent = `Player ${currentPlayer} Wins!`;
        gameActive = false;
    } else if (!gameState.includes("")) {
        statusText.textContent = `There is no winner!`;
        gameActive = false;
    }
}

// Toggle between players
function togglePlayer() {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    if (gameActive) {
        statusText.textContent = `Player ${currentPlayer}'s turn`;
    }
}

// Restart game
restartBtn.addEventListener('click', () => {
    currentPlayer = 'X';
    gameState = ["", "", "", "", "", "", "", "", ""];
    gameActive = true;
    statusText.textContent = `Player X's turn`;

    cells.forEach(cell => {
        cell.textContent = '';
    });
});
