
const boxes = document.querySelectorAll(".box");
const currentPlayerDisplay = document.getElementById("current-player");
const scoreXDisplay = document.getElementById("score-x");
const scoreODisplay = document.getElementById("score-o");
const newGameButton = document.querySelector(".new-game");

let currentPlayer = "X";
let board = ["", "", "", "", "", "", "", "", ""];
let scoreX = 0;
let scoreO = 0;

function handleClick(event) {
    const index = event.target.dataset.index;

  
    if (board[index] !== "") return;

    board[index] = currentPlayer;
    event.target.textContent = currentPlayer;
    checkWinner();
    switchPlayer();
}

function switchPlayer() {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    currentPlayerDisplay.textContent = currentPlayer;
}

function checkWinner() {
    const winningCombinations = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];

    for (const combination of winningCombinations) {
        const [a, b, c] = combination;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
           
            boxes[a].classList.add("win");
            boxes[b].classList.add("win");
            boxes[c].classList.add("win");
            updateScore();
            return;
        }
    }

    
    if (!board.includes("")) {
        setTimeout(() => {
            alert("It's a draw!");
            resetGame();
        }, 200);
    }
}

function updateScore() {
    if (currentPlayer === "X") {
        scoreX++;
        scoreXDisplay.textContent = scoreX;
    } else {
        scoreO++;
        scoreODisplay.textContent = scoreO;
    }

    setTimeout(() => {
        alert(`Player ${currentPlayer} wins!`);
        resetGame();
    }, 200);
}

function resetGame() {
    board.fill("");
    boxes.forEach(box => {
        box.textContent = "";
        box.classList.remove("win");
    });
    currentPlayer = "X";
    currentPlayerDisplay.textContent = currentPlayer;
}

function newGame() {
    resetGame();
    scoreX = 0;
    scoreO = 0;
    scoreXDisplay.textContent = scoreX;
    scoreODisplay.textContent = scoreO;
}


boxes.forEach(box => {
    box.addEventListener("click", handleClick);
});

newGameButton.addEventListener("click", newGame);
