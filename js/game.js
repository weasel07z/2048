var gameBoard;
var gameOver = false;

function Grid(size){
    this.size = size;
    this.cells = [];
    this.create();
    this.IDs = [];
}
Grid.prototype.create = function() {
    var c = 1;
    for (var i = 0; i < this.size; i++) {
        var row = this.cells[i] = [];
        var row2 = this.IDs[i] = [];
        for(var j = 0; j < this.size; j++) {
            row.push(null);
            row2.push(c);
            c++;
        }
    }
};
Grid.prototype.availableCells = function() {
    var available = [];
    for(var i = 0; i < this.size; i++){
        for(var j = 0; j < this.size; j++) {
            if(cells[i][j] == null){
                available.push({x:i, y:j});
            }
        }
    }
    return available;
};
Grid.prototype.addRandomTile = function() {
    if(!!this.availableCells().length){
        var val = Math.random() < 0.9 ? 2 : 4;
        var cell = this.availableCells[Math.random()*this.availableCells.length];
        var tile = new Tile(IDs[cell.x][cell.y], cell.x, cell.y, val);
        this.setCell(tile);
    }
};
Grid.prototype.initialTiles = function() {
    for(var i = 0; i < 2; i++){
        this.addRandomTile();
    }
};
Grid.prototype.setCell = function(tile) {
    this.cells[tile.x][tile.y] = tile;
};
Grid.prototype.getCell = function(cell) {
    return this.cells[cell.x][cell.y];
};
Grid.prototype.removeTile = function(tile){
    this.cells[tile.x][tile.y] = null;
};

function startGame(){
    var grid = new Grid(4);
    grid.initialTiles();
}
function test3(){
    document.write("WORKS WORKS WORK SOWKRS WORKS");
}
function display(){
    for(var x = 0; x < size; x++){
        for(var y = 0; y < size; y++){
            if(cells[x][y] == null){
                document.getElementById("cell1").innerHTML = 0;
            } else {
                document.getElementById("cell2").innerHTML = 1;
            }
        }
    }
}

// TILES STUFF * * * * * * * * * * * * *
function Tile(id, x, y, value) {
    this.id = id;
    this.x = x;
    this.y = y;
    this.value = value;
    this.color = black;
}
Tile.prototype.updatePos = function(x, y){
    this.x = x;
    this.y = y;
    this.id = IDs[x][y];
};
Tile.prototype.getColor = function(){
    return this.color;
};
