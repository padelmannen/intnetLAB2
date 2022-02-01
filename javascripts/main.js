alert("Hello and welcome");
createGameboard(10,8);

const gameboard = document.querySelector("gameboard");
//const tiles = new Array(80);

function startGame() {
    //window.location="game.html";
    createGameboard(5, 5);
    return false;
  }

function createGameboard (rows, cols) {
    let gameboardTable = document.createElement("table");
    gameboardTable.className = "gameboardTable";
    alert("Createing gameboard")

    gameboard.style.setProperty('--grid-rows', rows);
    gameboard.style.setProperty('--grid-cols', cols);
    for (c = 0; c < (rows * cols); c++) {
        let tile = document.createElement("div");
        tile.innerText = "X";
        tile.addEventListener("click", () => userAction(tile, c));
        gameboard.appendChild(tile).className = "grid-item";
    };
}
