const gameboard = document.getElementById("gameboard");
let xTurn = true; 
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
    document.getElementById('winNumber').setAttribute("max", Math.max(rows, cols).toString());
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
    for (var row = 1; row <= rows; row++) {
        for (var col = 1; col <= cols; col++) {
            // alert("create tile")
            let tile = document.createElement("div");
            //tile.innerText = "X";
            tile.setAttribute("row", row.toString())
            tile.setAttribute("col", col.toString())
            //tile.addEventListener("click", click);
            tile.innerText = "";
            gameboard.appendChild(tile).className = "tile";
            gameboard.appendChild(tile).row = row;
            gameboard.appendChild(tile).col = col;
        };
    };
    gameboard.onclick = function(e){
        var target = e.target;
        alert("Row:" + target.row + " Col:" + target.col)
        if (target.innerText == ""){
            if (xTurn){
                target.innerText = "X";
            }
            else{
                target.innerText = "O";
            }
            xTurn = (!(xTurn));
        }
        else{
            alert("Click on empty spot")
        }

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