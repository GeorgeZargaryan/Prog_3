let socket = io();

let side = 10;

const statsSeason = document.querySelector('#season');
statsSeason.innerHTML = "<span>Season: Spring</span>";
const statsGrass = document.querySelector('#grass');
const statsEater = document.querySelector('#eater');
const statsPredator = document.querySelector('#predator');
const statsWater = document.querySelector('#water');
const statsFire = document.querySelector('#fire');

function setup(matrix) {
  frameRate(30);
  createCanvas(600, 600);
  background("grey");
  noStroke();
}

function update(data) {
  for (let y = 0; y < data[0].length; y++) {
    for (let x = 0; x < data[0][y].length; x++) {
      switch (data[1]) {
        case "Summer":
          if (data[0][y][x] == 1) {
            fill("#79D021");
          } else if (data[0][y][x] == 2) {
            fill("#AA8500");
          } else if (data[0][y][x] == 3) {
            fill("#f94449");
          } else if (data[0][y][x] == 4) {
            fill("#009DCF");
          } else if (data[0][y][x] == 5) {
            fill("#ef820d");
          } else {
            fill("#FFDEBE");
          }
          break;
        case "Autumn":
          if (data[0][y][x] == 1) {
            fill("green");
          } else if (data[0][y][x] == 2) {
            fill("yellow");
          } else if (data[0][y][x] == 3) {
            fill("red");
          } else if (data[0][y][x] == 4) {
            fill("blue");
          } else if (data[0][y][x] == 5) {
            fill("orange");
          } else {
            fill("#9b7653");
          }
          break;
        case "Winter":
          
          if (data[0][y][x] == 1) {
            fill("green");
          } else if (data[0][y][x] == 2) {
            fill("yellow");
          } else if (data[0][y][x] == 3) {
            fill("red");
          } else if (data[0][y][x] == 4) {
            fill("blue");
          } else if (data[0][y][x] == 5) {
            fill("orange");
          } else {
            fill("#9b7653");
          }
          break;

        default:
          if (data[0][y][x] == 1) {
            fill("green");
          } else if (data[0][y][x] == 2) {
            fill("yellow");
          } else if (data[0][y][x] == 3) {
            fill("red");
          } else if (data[0][y][x] == 4) {
            fill("blue");
          } else if (data[0][y][x] == 5) {
            fill("orange");
          } else {
            fill("#9b7653");
          }
          break;
      }

      rect(x * side, y * side, side, side);
    }
  }
  statsGrass.innerHTML = "<span>Grass Count: " + data[2].grassCount + "</span>";
  statsEater.innerHTML = "<span>Eater Count: " + data[2].eaterCount + "</span>";
  statsPredator.innerHTML = "<span>Predators: " + data[2].predatorCount + "</span>";
  statsWater.innerHTML = "<span>Water Count: " + data[2].waterCount + "</span>";
  statsFire.innerHTML = "<span>Fire Count: " + data[2].fireCount + "</span>";
}

function fillRandomGrass() {
  socket.emit("fill grass");
}

function setSpring() {
  socket.emit("set spring");
  statsSeason.innerHTML = "<span>Season: Spring</span>";
}
function setSummer() {
  socket.emit("set summer");
  statsSeason.innerHTML = "<span>Season: Summer</span>";
}
function setAutumn() {
  socket.emit("set autumn");
  statsSeason.innerHTML = "<span>Season: Autumn</span>";
}
function setWinter() {
  socket.emit("set winter");
  statsSeason.innerHTML = "<span>Season: Winter</span>";
}
function restart(){
  socket.emit("restart");
}

socket.on("send matrix", update);
