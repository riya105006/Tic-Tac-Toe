const cells = document.querySelectorAll(".cell");
let currentPlayer = "X";
let board = ["", "", "", "", "", "", "", "", ""];
let gameOver = false;

const winScreen = document.getElementById("win-screen");
const winText = document.getElementById("win-text");
const status = document.querySelector("#status");

const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],

    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],

    [0, 4, 8],
    [2, 4, 6]
];

// ---------- Check Winner ----------
function checkWinner() {

    for (let combo of winningCombinations) {

        const [a, b, c] = combo;

        if (
            board[a] !== "" &&
            board[a] === board[b] &&
            board[b] === board[c]
        ) {

            gameOver = true;
            status.textContent = `Player ${currentPlayer} won the game!`;

            // Highlight winning cells
            cells[a].classList.add("win");
            cells[b].classList.add("win");
            cells[c].classList.add("win");

            // Show overlay after 1.5 sec
            setTimeout(() => {
                winText.textContent = `${currentPlayer} WON!`;
                winScreen.classList.remove("hidden");
            }, 1500);

            return true;
        }
    }

    return false;
}

// ---------- Cell Click ----------
cells.forEach((cell, index) => {

    cell.addEventListener("click", () => {

        if (gameOver || board[index] !== "") return;

        board[index] = currentPlayer;

        cell.textContent = currentPlayer;
        cell.classList.add(currentPlayer.toLowerCase());

        // Winner
        if (checkWinner()) return;

        // Draw
        if (board.every(square => square !== "")) {

            gameOver = true;
            status.textContent = "It's a Draw!";

            setTimeout(() => {
                winText.textContent = "TIE GAME!";
                winScreen.classList.remove("hidden");
            }, 1500);

            return;
        }

        // Change Player
        currentPlayer = currentPlayer === "X" ? "O" : "X";
        status.textContent = `Player ${currentPlayer}'s Turn`;

    });

});

// ---------- Restart ----------
document.querySelectorAll(".restart-btn").forEach(button => {

    button.addEventListener("click", () => {

        board = ["", "", "", "", "", "", "", "", ""];
        currentPlayer = "X";
        gameOver = false;

        cells.forEach(cell => {

            cell.textContent = "";
            cell.classList.remove("x", "o", "win");

        });

        status.textContent = "Player X's Turn";

        winScreen.classList.add("hidden");
        winText.textContent = "";

    });

});