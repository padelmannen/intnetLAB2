//alert("Hello and welcome");

const gameboard = document.querySelector("div.gameboard");
const tiles = new Array(9);

const createGameboard = () => {
    let gameboardTable = document.createElement("table");
    gameboardTable.className = "gameboardTable";

    tiles.forEach ((tile, index) => {
        gameboard.append(tile);
        tile.innerText = "X";
        tile.addEventListener("click", () => userAction(tile, index));
    });
}
