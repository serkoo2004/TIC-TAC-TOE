const xClass = 'X';

const oClass = 'O';

const WINNING_COMBINATIONS = [ 
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];
const cellElements = document.querySelectorAll('[data-cell]');
const board = document.getElementById('board');
const winningMessageElement = document.getElementById('winningMessage');
const winningMessageTextElement = document.querySelector('[data-winning-message-text]');
const turnCountTextElement = document.querySelector('[data-turn-count-text]');
const restartButton = document.getElementById('restartButton');
let oTurn;
let turnCount;

startGame();

restartButton.addEventListener('click', () => {
    startGame();
});

function startGame () {
    oTurn = false;
    turnCount = 0;
    cellElements.forEach(cell => {
        cell.classList.remove(xClass);
        cell.classList.remove(oClass);
        cell.innerText = '';
        cell.removeEventListener('click', handleClick);
        cell.addEventListener('click', handleClick); 
    });
    setBoardHoverClass();
    winningMessageElement.classList.remove('show');
}

function handleClick(e) {
    const cell = e.target;
    const currentClass = oTurn ? oClass : xClass;
    if (cell.classList.contains(xClass) || cell.classList.contains(oClass)) return;
    placeMark(cell, currentClass);
    turnCount++;
    if (checkWin(currentClass)) {
        endGame(false);
    } else if (isDraw()) {
        endGame(true);
    } else {
        swapTurns();
        setBoardHoverClass();
    }
}

function endGame(draw) {
    if (draw) {
        winningMessageTextElement.innerText = 'Berabere!';
        turnCountTextElement.innerText = '';
    } else {
        winningMessageTextElement.innerText = `${oTurn ? "O" : "X"} kazandı!`;
        turnCountTextElement.innerText = `${turnCount}. turda kazandı.`;
    }
    winningMessageElement.classList.add('show');
}

function isDraw () {
    return [...cellElements].every(cell => {
        return cell.classList.contains(xClass) || cell.classList.contains(oClass);
    });
}

function placeMark(cell, currentClass) {
    cell.classList.add(currentClass);
    cell.innerText = currentClass === xClass ? 'X' : 'O';
}

function swapTurns() {
    oTurn= !oTurn;
}

function setBoardHoverClass() {
    board.classList.remove(xClass);
    board.classList.remove(oClass);
    if (oTurn) {
        board.classList.add(oClass);
    }else {
        board.classList.add(xClass);
    }
}

function checkWin(currentClass) {
    return WINNING_COMBINATIONS.some(combination => {
        return combination.every(index => {
            return cellElements[index].classList.contains(currentClass);
        });
    });
}
