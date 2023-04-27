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
document.addEventListener('keydown', function(key) {
    if (key.keyCode == 37) {
        moveLeft();
    } else if (key.keyCode == 38) {
        moveUp();
    } else if(key.keyCode == 39) {
        moveRight();
    } else if(key.keyCode == 40) {
        moveDown();
    } else if(key.keyCode == 82){
        reset();
    }
}, true);
// MOVEMENT * * * * * * * * * * * * *
function moveLeft(){
    for(let i = 0; i < 4; i++){
        for(let j = 0; j < 4; j++){
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
    spawnRandomTile();
    updateGame();
}

function moveRight(){
    for(let i = 3; i >= 0; i = i-1){
        for(let j = 3; j >= 0; j = j-1){
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
    spawnRandomTile();
    updateGame();
}  
function moveDown(){
    for(let i = 3; i >= 0; i = i-1){
        for(let j = 3; j >= 0 ; j = j-1){
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
    spawnRandomTile();
    updateGame();
}
function moveUp(){
    for(let i = 0; i < 4; i++){
        for(let j = 0; j < 4; j++){
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
    spawnRandomTile();
    updateGame();
}

function canEat(i, j, num){
    if(i >= 4 || j >= 4 || i < 0 || j < 0){
        return false;
    }
    if(cells[i][j].getValue() == num){
      return true;
    }
    return false;
  }
function canMove(i, j){
    if(i >= 4 || j >= 4 || i < 0 || j < 0 || cells[i][j] !== null){
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
    colors();
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
function reset() {
    var t = [[]];
    for (var i = 0; i < 4; i++) {
        t.push([]);
        for (var j = 0; j < 4; j++) {
            t[i].push(null);
        }
    }
    cells = t;
    updateGame();
}
function colors(){
    for(var i = 0; i < 4; i++){
        for(var j = 0; j < 4; j++){
            var els = document.getElementsByClassName('grid-cell'+ids[i][j]);
            var temp = els[0];
            if(temp.textContent == 0){
                removeAllClass(temp);
                temp.classList.add('zero');
            } else if(temp.textContent == 2){
                removeAllClass(temp);
                temp.classList.add('two');
            } else if(temp.textContent == 4){
                removeAllClass(temp);
                temp.classList.add('four');
            } else if(temp.textContent == 8){
                removeAllClass(temp);
                temp.classList.add('eight');
            } else if(temp.textContent == 16){
                removeAllClass(temp);
                temp.classList.add('sixteen');
            } else if(temp.textContent == 32){
                removeAllClass(temp);
                temp.classList.add('thirtytwo');
            } else if(temp.textContent == 64){
                removeAllClass(temp);
                temp.classList.add('sixtyfour');
            } else if(temp.textContent == 128){
                removeAllClass(temp);
                temp.classList.add('onetwentyeight');
            } else if(temp.textContent == 256){
                removeAllClass(temp);
                temp.classList.add('twofiftysix');
            } else if(temp.textContent == 512){
                removeAllClass(temp);
                temp.classList.add('fivetwelve');
            } else if(temp.textContent == 1024){
                removeAllClass(temp);
                temp.classList.add('tentwentyfour');
            } else if(temp.textContent == 2048){
                removeAllClass(temp);
                temp.classList.add('twentyfourtyeight');
            } else {
                removeAllClass(temp);
            }
            
        }
    }
    
}
function removeAllClass(thing){
    thing.classList.remove('zero');
    thing.classList.remove('two');
    thing.classList.remove('four');
    thing.classList.remove('eight');
    thing.classList.remove('sixteen');
    thing.classList.remove('thirtytwo');
    thing.classList.remove('sixtyfour');
    thing.classList.remove('onetwentyeight');
    thing.classList.remove('twofiftysix');
    thing.classList.remove('fivetwelve');
    thing.classList.remove('tentwentyfour');
    thing.classList.remove('twentyfourtyeight');
}
// TILES STUFF * * * * * * * * * * * * *
class Tile {
    constructor(x, y, val) {
        this.x = x;
        this.y = y;
        this.value = val;
    }
    getValue(){
        return this.value;
    }
    getColor(){
        if(this.value == 2){
            return "#f9f6f2";
        }
    }
}

