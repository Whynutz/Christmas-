const words = ['SANTA', 'TREE', 'SNOW', 'GIFT', 'ELF', 'REINDEER', 'SLEIGH', 'HOLLY', 'CANDY', 'STOCKING', 'MISTLETOE', 'CAROLS', 'ORNAMENT', 'WREATH', 'GINGERBREAD'];

let player1Score = 0;
let player2Score = 0;
let currentPlayer = 1;

const gameBoard = document.getElementById('game-board');
const startGameButton = document.getElementById('start-game');
const invitePlayerButton = document.getElementById('invite-player');
const player1ScoreDisplay = document.getElementById('player1-score');
const player2ScoreDisplay = document.getElementById('player2-score');

startGameButton.addEventListener('click', startGame);
invitePlayerButton.addEventListener('click', invitePlayer);

function startGame() {
    generateBoard(words);
}

function invitePlayer() {
    const inviteLink = `${window.location.href}?invite=true`;
    navigator.clipboard.writeText(inviteLink).then(() => {
        alert('Invite link copied to clipboard! Share it with your friend.');
    });
}

function generateBoard(wordList) {
    gameBoard.innerHTML = '';
    const size = 10;
    const board = Array(size).fill().map(() => Array(size).fill(''));

    wordList.forEach(word => {
        let placed = false;
        while (!placed) {
            const direction = Math.random() < 0.5 ? 'H' : 'V';
            const row = Math.floor(Math.random() * size);
            const col = Math.floor(Math.random() * size);
            if (canPlaceWord(word, row, col, direction, board)) {
                placeWord(word, row, col, direction, board);
                placed = true;
            }
        }
    });

    for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {
            const cell = document.createElement('div');
            cell.textContent = board[i][j] || String.fromCharCode(65 + Math.floor(Math.random() * 26));
            cell.addEventListener('click', () => selectCell(cell, i, j));
            gameBoard.appendChild(cell);
        }
    }
}

function canPlaceWord(word, row, col, direction, board) {
    if (direction === 'H' && col + word.length > board.length) return false;
    if (direction === 'V' && row + word.length > board.length) return false;
    for (let i = 0; i < word.length; i++) {
        if (direction === 'H' && board[row][col + i] && board[row][col + i] !== word[i]) return false;
        if (direction === 'V' && board[row + i][col] && board[row + i][col] !== word[i]) return false;
    }
    return true;
}

function placeWord(word, row, col, direction, board) {
    for (let i = 0; i < word.length; i++) {
        if (direction === 'H') board[row][col + i] = word[i];
        if (direction === 'V') board[row + i][col] = word[i];
    }
}

function selectCell(cell, row, col) {
    cell.style.backgroundColor = 'yellow';
    if (currentPlayer === 1) {
        player1Score++;
        player1ScoreDisplay.textContent = player1Score;
    } else {
        player2Score++;
        player2ScoreDisplay.textContent = player2Score;
    }
    currentPlayer = currentPlayer === 1 ? 2 : 1;
}
