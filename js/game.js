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

function startGame(){
    var c = 1;
    for(var i = 0; i < 4; i++){
        for(var j = 0; j < 4; j++){
            if(cells[i][j] !== null){
                document.getElementById("cell" + c).innerHTML = 0;
            } else {
                document.getElementById("cell" + c).innerHTML = 1;
            }
            c++;
        }
    }
}
function initialize(){
    for (var i = 0; i < 4; i++) {
        cells.push([]);
        for (var j = 0; j < 4; j++) {
            cells.push(null);
        }
    }
    /*
    var val = Math.random() < 0.9 ? 2 : 4;
    var cellx = parseInt(Math.random() * 4, 10);
    var celly = parseInt(Math.random() * 4, 10);
    const tile = new Tile(ids[cellx][celly], cellx, celly, val);
    cells[tile.x][tile.y] = tile;
    */
   cells[0][0] = new Tile(1, 0, 0, 2);
}
function test3(){
    document.write("WORKS WORKS WORK SOWKRS WORKS");
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
    constructor(id, x, y, value) {
        this.id = id;
        this.x = x;
        this.y = y;
        this.value = value;
        this.color = black;
    }
    updatePos(x, y) {
        this.x = x;
        this.y = y;
        this.id = IDs[x][y];
    }
    getValue(){
        return this.value;
    }
    getColor() {
        return this.color;
    }
}

