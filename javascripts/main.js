const gameboard = document.getElementById("gameboard");
const xTurn = true; 
window.createGameBoard(10,8,4);

//const tiles = new Array(80);

function startGame() {
    //window.location="game.html";
    //const checkBox = document.getElementById('nrwos').checked;
    //createGameboard(10, 8);
    //alert("clickade på startar spel")
    const gameboard = document.getElementById("gameboard");
    const rows = document.getElementById('nRows').value;
    const cols = document.getElementById('nCols').value;
    const winNumber = document.getElementById('winNumber').value;
    if (okValues(rows, cols, winNumber)){
        alert("startar spelet");
    };

    return false;
};

function updateGameboard () {
    const gameboard = document.getElementById("gameboard");
    const rows = document.getElementById('nRows').value;
    const cols = document.getElementById('nCols').value;
    const winNumber = document.getElementById('winNumber').value;
    gameboard.innerHTML = '';  //nollställer gameboard
    createGameBoard(rows, cols, winNumber);

    // let gameboardTable = document.createElement("table");
    // gameboardTable.className = "gameboardTable";
    //alert("Createing gameboard" + rows + cols)
};

function createGameBoard(rows, cols, winNumber){
    const gameboard = document.getElementById("gameboard");
    gameboard.style.setProperty('--grid-rows', rows);
    gameboard.style.setProperty('--grid-cols', cols);
    //alert("styled")
    for (c = 0; c < (rows * cols); c++) {
        // alert("create tile")
        let tile = document.createElement("div");
        //tile.innerText = "X";
        tile.addEventListener("click", click);
        gameboard.appendChild(tile).className = "tile";
    };
};

function click(){
    alert("button clicked")
    if (xTurn){
        tile.innerText = "X";
    }
    else{
        tile.innerText = "O";
    }
    xTurn = (!(xTurn));
};

function okValues(rows, cols, winNumber){
    //alert("kollar om godkända värden")
    if (rows < 3 || cols < 3){
        alert("At least a 3x3 board");
        return false;
    }
    else if (winNumber > rows && winNumber > cols){
        alert("Winning condition cant be greater than the biggest dimension (" + Math.max(rows, cols) + ")");
        return false;
    }
    //alert(winNumber);
    else if (winNumber < 3){
        alert("At least 3 in a row to win");
        return false;
    }
}