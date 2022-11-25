let socket = io();

let side = 10;

function setup(matrix) {
  frameRate(30);
  createCanvas(600, 600);
  background("grey");
  noStroke();
}

function update(matrix) {
  for (let y = 0; y < matrix.length; y++) {
    for (let x = 0; x < matrix[y].length; x++) {
      if (matrix[y][x] == 1) {
        fill("green");
      } else if (matrix[y][x] == 2) {
        fill("yellow");
      } else if (matrix[y][x] == 3) {
        fill("red");
      } else if (matrix[y][x] == 4) {
        fill("blue");
      } else if (matrix[y][x] == 5) {
        fill("orange");
      } else {
        fill("#9b7653");
      }
      rect(x * side, y * side, side, side);
    }
  }
}

function fillRandomGrass() {
  socket.emit('fill grass');
}

function setWeather(weather){
  socket.emit('change weather', {Season: weather})
}

// socket.on('fill grass', fillRandomGrass);
socket.on("sen matrix", fillRandomGrass);

socket.on("send matrix", update);