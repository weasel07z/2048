var gameBoard;
var gameOver = false;
var cells = [[]];
var ids = [[1, 2, 3, 4],
           [5, 6, 7, 8],
           [9, 10, 11, 12],
           [13, 14, 15, 16]];

/*
class Grid {
    constructor(size) {
        this.size = size;
        this.IDs = [];
    }
    create() {
        var c = 1;
        for (var i = 0; i < this.size; i++) {
            var row = cells[i] = [];
            var row2 = this.IDs[i] = [];
            for (var j = 0; j < this.size; j++) {
                row.push(null);
                row2.push(c);
                c++;
            }
        }
    }
    availableCells() {
        var available = [];
        for (var i = 0; i < this.size; i++) {
            for (var j = 0; j < this.size; j++) {
                if (cells[i][j] == null) {
                    available.push({ x: i, y: j });
                }
            }
        }
        return available;
    }
    addRandomTile() {
        if (!!this.availableCells().length) {
            var val = Math.random() < 0.9 ? 2 : 4;
            var cell = this.availableCells[Math.random() * this.availableCells.length];
            const tile = new Tile(IDs[cell.x][cell.y], cell.x, cell.y, val);
            this.setCell(tile);
        }
    }
    initialTiles() {
        for (var i = 0; i < 2; i++) {
            this.addRandomTile();
        }
    }
    setCell(tile) {
        cells[tile.x][tile.y] = tile;
    }
    getCell(cell) {
        return cells[cell.x][cell.y];
    }
    removeTile(tile) {
        cells[tile.x][tile.y] = null;
    }
}
*/
function moveLeft(){
    for(var i = 0; i < cells.length; i++){
        for(var j = 0; j < cells[0].length; j++){
            if(cells[i][j] === null){
                continue;
            }
            var num = cells[i][j].getValue();
            var newI = i;
            var newJ = j;
            while(canMove(newI, newJ-1)){
                newJ--;
            }
            if(canEat(newI, newJ-1, num)){
                const tile1 = new Tile(newI, newJ-1, num*2);
                cells[i][j] = null;
                cells[newI][newJ-1] = tile1;
            } else {
                const tile2 = new Tile(newI, newJ, num);
                cells[i][j] = null;
                cells[newI][newJ] = tile2; 
            }
        }
    }
}

function moveRight(){
    for(var i = cells.length-1; i >= 0; i--){
        for(var j = cells[0].length-1; j >= 0; j--){
            if(cells[i][j] === null){
                continue;
            }
            var num = cells[i][j].getValue();
            var newI = i;
            var newJ = j;
            while(canMove(newI, newJ+1)){
                newJ++;
            }
            if(canEat(newI, newJ+1, num)){
                const tile3 = new Tile(newI, newJ+1, num*2);
                cells[i][j] = null;
                cells[newI][newJ+1] = tile3;
            } else {
                const tile4 = new Tile(newI, newJ, num);
                cells[i][j] = null;
                cells[newI][newJ] = tile4; 
            }
        }
    }
}  
function moveDown(){
    /*
    for(var i = 3; i > -1; i--){
        for(var j = 3; j > -1; j--){
            if(cells[i][j] === null){
                continue;
            }
            var num = cells[i][j].getValue();
            var newI = i;
            var newJ = j;
            while(canMove(newI+1, newJ)){
                newI++;
            }
            if(canEat(newI+1, newJ, num)){
                const tile1 = new Tile(newI+1, newJ, num*2);
                cells[i][j] = null;
                cells[newI+1][newJ] = tile1;
            } else {
                const tile2 = new Tile(newI, newJ, num);
                cells[i][j] = null;
                cells[newI][newJ] = tile2; 
            }
        }
    }
    */
    for(var i = 0; i < cells.length; i++){
        for(var j = 0; j < cells[0].length; j++){
            if(cells[i][j] === null){
                continue;
            }
            var num = cells[i][j].getValue();
            var newI = i;
            var newJ = j;
            while(canMove(newI-1, newJ)){
                newI--;
            }
            if(canEat(newI-1, newJ, num)){
                const tile1 = new Tile(newI-1, newJ, num*2);
                cells[i][j] = null;
                cells[newI-1][newJ] = tile1;
            } else {
                const tile2 = new Tile(newI, newJ, num);
                cells[i][j] = null;
                cells[newI][newJ] = tile2; 
            }
        }
    }
}
function moveUp(){
    for(var i = 0; i < cells.length; i++){
        for(var j = 0; j < cells[0].length; j++){
            if(cells[i][j] === null){
                continue;
            }
            var num = cells[i][j].getValue();
            var newI = i;
            var newJ = j;
            while(canMove(newI-1, newJ)){
                newI--;
            }
            if(canEat(newI-1, newJ, num)){
                const tile1 = new Tile(newI-1, newJ, num*2);
                cells[i][j] = null;
                cells[newI-1][newJ] = tile1;
            } else {
                const tile2 = new Tile(newI, newJ, num);
                cells[i][j] = null;
                cells[newI][newJ] = tile2; 
            }
        }
    }
}

function canEat(i, j, num){
    if(i >= cells.length || j >= cells[0].length || i < 0 || j < 0){
        return false;
    }
    if(cells[i][j].getValue() == num){
      return true;
    }
    return false;
  }
function canMove(i, j){
    if(i >= cells.length || j >= cells[0].length || i < 0 || j < 0 || cells[i][j] !== null){
        return false;
    }
    return true;
}
function updateGame(){
    var c = 1;
    for(var i = 0; i < 4; i++){
        for(var j = 0; j < 4; j++){
            if(cells[i][j] !== null){
                document.getElementById("cell" + c).innerHTML = cells[i][j].getValue();
            } else {
                document.getElementById("cell" + c).innerHTML = 0;
            }
            c++;
        }
    }
}
function initialize(){
    for (var i = 0; i < 4; i++) {
        cells.push([]);
        for (var j = 0; j < 4; j++) {
            cells[i].push(null);
        }
    }
    spawnRandomTile();
    spawnRandomTile();
    updateGame();
}
function test3(){
    document.write("WORKS WORKS WORK SOWKRS WORKS");
}
function spawnRandomTile(){
    var val = Math.random() < 0.9 ? 2 : 4;
    var cellx = parseInt(Math.random() * 4, 10);
    var celly = parseInt(Math.random() * 4, 10);
    while(cells[cellx][celly] !== null){
        cellx = parseInt(Math.random() * 4, 10);
        celly = parseInt(Math.random() * 4, 10);
    }
    const tile = new Tile(cellx, celly, val);
    cells[cellx][celly] = tile;
}
function test2() {
    document.getElementById("cell3").innerHTML = 10;
}
function displayGrid(){
    //document.getElementById("cell2").innerHTML = this.getCell();

    /*
    for(var x = 0; x < size; x++){
        for(var y = 0; y < size; y++){
            
            if(cells[x][y] == null){
                document.getElementById("cell1").innerHTML = 0;
            } else {
                document.getElementById("cell2").innerHTML = 1;
            }
        }
    }
    */
    //document.getElementById("cell1").innerHTML = grid.getCell(grid.cells[2][2]);
}

// TILES STUFF * * * * * * * * * * * * *
class Tile {
    constructor(x, y, val) {
        this.x = x;
        this.y = y;
        this.value = val;
    }
    updatePos(x, y) {
        this.x = x;
        this.y = y;
    }
    getValue(){
        return this.value;
    }
}

