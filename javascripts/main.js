const gameboard = document.getElementById("gameboard");
let xTurn = true; 
window.createGameBoard(10,8,4);
var rows = document.getElementById('nRows').value;
var cols = document.getElementById('nCols').value;
var winNumber = document.getElementById('winNumber').value;
var firstTurn = true;
//var curTurn = "X";

//const tiles = new Array(80);

function startGame() {
    alert("start")
    //window.location="game.html";
    //const checkBox = document.getElementById('nrwos').checked;
    //createGameboard(10, 8);
    //alert("clickade på startar spel")
    document.getElementById("nCols").disabled = true;
    document.getElementById("nRows").disabled = true;
    document.getElementById("winNumber").disabled = true;
    document.getElementById("startButton").disabled = true;
    document.getElementById("gameboard").disabled = false;

    
    updateGameboard();
    
};

function updateGameboard () {
    //gameboard = document.getElementById("gameboard");
    rows = document.getElementById('nRows').value;
    cols = document.getElementById('nCols').value;
    document.getElementById('winNumber').setAttribute("max", Math.max(rows, cols).toString());
    winNumber = document.getElementById('winNumber').value;
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
            tile.innerText = "";
            tile.setAttribute("row", row.toString())
            tile.setAttribute("col", col.toString())
            tile.setAttribute("coordinate", row.toString()+","+col.toString())
            //tile.addEventListener("click", click);
            gameboard.appendChild(tile).className = "tile";
            gameboard.appendChild(tile).row = row;
            gameboard.appendChild(tile).col = col;
            
        };
    };
    gameboard.onclick = function(e){
        var target = e.target;
        //alert("Row:" + target.row + " Col:" + target.col)
        if (firstTurn || okTarget(target) && target.innerText == ""){
            if (xTurn){
                target.innerText = "X";
                firstTurn = false;
            }
            else{
                target.innerText = "O";
            }
            checkForWin(target);
            xTurn = (!(xTurn));     //av någon konstig anledning måste dessa vara i denna ordningen
            
        }
        else{
            alert("Click on emtpy spot beside a placed piece")
        }
    };
};

function okTarget(target){
    targetRow = target.row;
    targetCol = target.col;

    for(let row = -1; row <= 1; row++){
        for(let col = -1; col <= 1; col++){
            checkedRow = targetRow+row;
            checkedCol = targetCol+col;
            if ((checkedRow > 0 && checkedRow <= rows) && (checkedCol > 0 && checkedCol <= cols) && !((row == 0) && (col == 0))){
                let checkedSquare = document.querySelector('[col="'+(targetCol+col)+'"][row="'+(targetRow+row)+'"]');
                if(checkedSquare.innerText != ""){
                    return true;
                }
            }
        }
    }
    return false;
}

function checkForWin(target){
    startRow = target.row;
    startCol = target.col;

    curTurn = "X";
    if(!xTurn){
        curTurn = "O";
    }

    if(horizontalWin()){
        alert("Spelare " + curTurn + " vann!");
        return;
    }
    if(verticalWin()){
        alert("Spelare " + curTurn + " vann!");
        return;
    }
    if(diagonalWin()){
        alert("Spelare " + curTurn + " vann!");
        return;
    }
    
}

function horizontalWin(){
    counter = 1;
    var range = winNumber -1;
    var d = -1;
    for (let dir = 0; dir <= 1; dir++) {
        if (dir == 1){
            d = 1;
        }
        //console.log("direction " + d);
        for(let nTiles = 1; nTiles <= range; nTiles++){
            nextCol = startCol + (nTiles * d);
            if (nextCol > 0 && nextCol <= cols){
                //console.log("Checking: row "+startRow+" col "+nextCol);
                let nextSquare = document.querySelector('[col="'+nextCol+'"][row="'+startRow+'"]').innerText;
                //console.log("checkedTile: " + nextSquare)
                if (nextSquare == curTurn){
                    //console.log("match!")
                    counter++;
                }
                else{
                    break;
                }
            }
            else{
                break;
            }
        } 
    }
    return counter >= winNumber
}

function verticalWin(){
    counter = 1;
    var range = winNumber -1;
    var d = -1;
    for (let dir = 0; dir <= 1; dir++) {
        if (dir == 1){
            d = 1;
        }
        for(let nTiles = 1; nTiles <= range; nTiles++){
            nextRow = startRow + (nTiles * d);
            if (nextRow > 0 && nextRow <= rows){
                //console.log("Checking: row "+nextRow+" col "+startCol);
                let nextSquare = document.querySelector('[col="'+startCol+'"][row="'+nextRow+'"]').innerText;
                //console.log("checkedTile: " + nextSquare)
                if (nextSquare == curTurn){
                    //console.log("match!")
                    counter++;
                }
                else{
                    break;
                }
            }
            else{
                break;
            }
        } 
    }
    return counter >= winNumber
}
function diagonalWin(){
    counter = 1;
    var range = winNumber -1;
    var d = -1;
    for (let dir = 0; dir <= 1; dir++) {
        if (dir == 1){
            d = 1;
        }
        for(let nTiles = 1; nTiles <= range; nTiles++){
            nextRow = startRow + (nTiles * d);
            nextCol = startCol + (nTiles * d);
            if ((nextRow > 0 && nextRow <= rows) && (nextCol > 0 && nextCol <= cols)){
                //console.log("Checking: row "+nextRow+" col "+nextCol);
                let nextSquare = document.querySelector('[col="'+nextCol+'"][row="'+nextRow+'"]').innerText;
                //console.log("checkedTile: " + nextSquare)
                if (nextSquare == curTurn){
                    //console.log("match!")
                    counter++;
                }
                else{
                    break;
                }
            }
            else{
                break;
            }
        } 
    }
    if(counter >= winNumber){
        return true;
    }
    counter = 1;
    var d = -1;
    for (let dir = 0; dir <= 1; dir++) {
        if (dir == 1){
            d = 1;
        }
        for(let nTiles = 1; nTiles <= range; nTiles++){
            nextRow = startRow + (nTiles * d);
            nextCol = startCol + (nTiles * (-d));
            if ((nextRow > 0 && nextRow <= rows) && (nextCol > 0 && nextCol <= cols)){
                //console.log("Checking: row "+nextRow+" col "+nextCol);
                let nextSquare = document.querySelector('[col="'+nextCol+'"][row="'+nextRow+'"]').innerText;
                //console.log("checkedTile: " + nextSquare)
                if (nextSquare == curTurn){
                    //console.log("match!")
                    counter++;
                }
                else{
                    break;
                }
            }
            else{
                break;
            }
        } 
    }
    if(counter >= winNumber){
        return true;
    }
}
