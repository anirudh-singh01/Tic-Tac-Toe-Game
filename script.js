const PLAYER_X = 'X';
const PLAYER_O = 'O';

const board = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = PLAYER_X;
let scoreX = 0;
let scoreO = 0;
let gameOver = false;

const boardElement = document.getElementById('board');
const messageElement = document.getElementById('message');
const scoreXElement = document.getElementById('score-x');
const scoreOElement = document.getElementById('score-o');

function checkWin() {
    const winningCombos = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];

    for (const combo of winningCombos) {
        const [a, b, c] = combo;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            return true;
        }
    }
    return false;
}

function checkDraw() {
    return !board.includes('');
}

function handleCellClick(event) {
    if (gameOver) return;

    const cell = event.target;
    const cellIndex = parseInt(cell.getAttribute('data-index'));

    if (board[cellIndex] === '') {
        board[cellIndex] = currentPlayer;
        cell.textContent = currentPlayer;
        cell.classList.add(currentPlayer);

        if (checkWin()) {
            messageElement.textContent = `${currentPlayer} wins!`;
            updateScore(currentPlayer);
            gameOver = true;

            // Apply the winning animation to the winning cells
            const winningCombos = [
                [0, 1, 2], [3, 4, 5], [6, 7, 8],
                [0, 3, 6], [1, 4, 7], [2, 5, 8],
                [0, 4, 8], [2, 4, 6]
            ];

            for (const combo of winningCombos) {
                const [a, b, c] = combo;
                const winningCells = document.querySelectorAll(`.cell[data-index="${a}"], .cell[data-index="${b}"], .cell[data-index="${c}"]`);
                winningCells.forEach(cell => cell.classList.add('winner'));
            }
        } else if (checkDraw()) {
            messageElement.textContent = "It's a draw!";
            gameOver = true;
        } else {
            currentPlayer = currentPlayer === PLAYER_X ? PLAYER_O : PLAYER_X;
            messageElement.textContent = `Player ${currentPlayer}'s Turn`;
        }
    }
}

function handleResetClick() {
    board.fill('');
    const cells = document.querySelectorAll('.cell');
    cells.forEach(cell => {
        cell.textContent = '';
        cell.classList.remove(PLAYER_X, PLAYER_O, 'winner');
    });
    messageElement.textContent = `Player ${currentPlayer}'s Turn`;
    currentPlayer = PLAYER_X;
    gameOver = false;
    boardElement.classList.remove('game-over');
}

function updateScore(player) {
    if (player === PLAYER_X) {
        scoreX++;
        scoreXElement.textContent = `Player X: ${scoreX}`;
    } else {
        scoreO++;
        scoreOElement.textContent = `Player O: ${scoreO}`;
    }
}

function initializeBoard() {
    for (let i = 0; i < 9; i++) {
        const cell = document.createElement('div');
        cell.className = 'cell';
        cell.setAttribute('data-index', i);
        cell.addEventListener('click', handleCellClick);
        boardElement.appendChild(cell);
    }
}

document.getElementById('reset-button').addEventListener('click', handleResetClick);

initializeBoard();
messageElement.textContent = `Player ${currentPlayer}'s Turn`;
