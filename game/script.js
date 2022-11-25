let socket = io();
const AddGrass = document.querySelector('#addGrass');

let side = 10;

function setup(matrix) {
  frameRate(30);
  createCanvas(matrix.length * side ,matrix.length* side);
  background("grey");
  noStroke();
}

function update(matrix) {
  // console.log(matrix);
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

function fillRandomGrass(matrix){
  console.log("filled")
  grassCount = 28;
  while(grassCount > 0){
    let x = Math.floor(Math.random() * matrix.length);
    let y = Math.floor(Math.random() * matrix.length);
    if(matrix[y][x] == 0){
      matrix[y][x] = 1;
      grassCount--;
    }
  }
}

AddGrass.addEventListener('click', ()=>{
  console.log("grass Added")
  socket.emit('get matrix');
})

socket.on("send matrix", update);

socket.on('get matrix', fillRandomGrass);