const gameboard = document.getElementById("gameboard");
let xTurn = true; 
window.createGameBoard(10,8,4);
var rows = document.getElementById('nRows').value;
var cols = document.getElementById('nCols').value;

//const tiles = new Array(80);

function startGame() {
    //window.location="game.html";
    //const checkBox = document.getElementById('nrwos').checked;
    //createGameboard(10, 8);
    //alert("clickade på startar spel")
    const winNumber = document.getElementById('winNumber').value;
    return false;
};

function updateGameboard () {
    //gameboard = document.getElementById("gameboard");
    rows = document.getElementById('nRows').value;
    cols = document.getElementById('nCols').value;
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
            tile.innerText = "";
            tile.setAttribute("row", row.toString())
            tile.setAttribute("col", col.toString())
            tile.setAttribute("coordinate", row.toString()+","+col.toString())
            //tile.addEventListener("click", click);
            tile.innerText = "";
            gameboard.appendChild(tile).className = "tile";
            gameboard.appendChild(tile).row = row;
            gameboard.appendChild(tile).col = col;
            
        };
    };
    gameboard.onclick = function(e){
        var target = e.target;
        //alert("Row:" + target.row + " Col:" + target.col)
        if (target.innerText == ""){
            if (xTurn){
                target.innerText = "X";
            }
            else{
                target.innerText = "O";
            }
            xTurn = (!(xTurn));     //av någon konstig anledning måste dessa vara i denna ordningen
            checkForWin(target);
        }
        else{
            alert("Click on emtpy spot")
        }
    };
};


function checkForWin(target){
    startRow = target.row;
    startCol = target.col;
    //alert(startCol);
    var curTurn = "X";
    if(xTurn){
        curTurn = "O";
    }

    var counter = 0;
    var range = document.getElementById('winNumber').value -1;
    const winNumber = document.getElementById('winNumber').value;
    
    //horizontal
    var d = -1;
    for (let dir = 0; dir <= 1; dir++) {
        if (dir == 1){
            d = 1;
        }
        console.log("direction " + d);
         for(let nTiles = 1; nTiles <= range; nTiles++){
            //console.log("nTiles " + nTiles);
            nextCol = startCol + (nTiles * d);
            if (nextCol > 0 && nextCol <= cols){
                //console.log("nextCol " + nextCol);
                console.log("Checking: row "+startRow+" col "+nextCol);
                var curCor = startRow.toString()+","+nextCol.toString()
                console.log("checking coord:"+curCor)
                var squares = document.querySelectorAll("div");
                
                for (let i = 1; i < squares.length; i++) {
                    if (squares[i].hasAttribute("coordinate")){
                        if (squares[i].getAttribute("coordinate")==curCor){
                            var nextSquareContent = squares[i].innerText;
                            console.log("checkedTile: " + nextSquareContent)
                            break;
                        };
                    };
                };


                console.log("checkedTile: " + nextSquareContent)
                if (nextSquareContent != null){
                    if (nextSquareContent == curTurn){
                        console.log("match!")
                        counter++;
                    }
                    //break;
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

    if(playerWon(counter, winNumber, curTurn)){
        return;
    }

/*     counter = 0;
    //vertical
    //kod
    if(playerWon(counter, winNumber, curTurn)){
        return;
    }

    counter = 0; //återställ counter
    //firstDiagonal
    //kod
    if(playerWon(counter, winNumber, curTurn)){
        return;
    }

    counter = 0; //återställ counter
    //secondDiagonal
    //kod
    if(playerWon(counter, winNumber, curTurn)){
        return;
    } */
};

function playerWon(counter, winNumber, curTurn){
    console.log("Win function");
    console.log(counter + "vs" + winNumber);
    if (counter >= winNumber){
        console.log("WIN");
        alert("Spelare " + curTurn + " vann!");
        return true;
    return false;
    }
}

