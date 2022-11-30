let socket = io();

let side = 10;

const dirtColor = document.querySelector("#dirtColor");
const grassColor = document.querySelector("#grassColor");
const eaterColor = document.querySelector("#eaterColor");
const predatorColor = document.querySelector("#predatorColor");
const waterColor = document.querySelector("#waterColor");
const fireColor = document.querySelector("#fireColor");

const statsSeason = document.querySelector("#season");
const statsGrass = document.querySelector("#grass");
const statsEater = document.querySelector("#eater");
const statsPredator = document.querySelector("#predator");
const statsWater = document.querySelector("#water");
const statsFire = document.querySelector("#fire");
const statsStone = document.querySelector("#stone");

function setup() {
  frameRate(30);
  createCanvas(80 * side, 80 * side);
  background("grey");
  noStroke();
}

function update(data) {
  for (let y = 0; y < data[0].length; y++) {
    for (let x = 0; x < data[0][y].length; x++) {
      if (data[0][y][x] == 1) {
        fill(data[3][1]);
      } else if (data[0][y][x] == 2) {
        fill(data[3][2]);
      } else if (data[0][y][x] == 3) {
        fill(data[3][3]);
      } else if (data[0][y][x] == 4) {
        fill(data[3][4]);
      } else if (data[0][y][x] == 5) {
        fill(data[3][5]);
      } else if (data[0][y][x] == 6) {
        fill(data[3][6]);
      } else {
        fill(data[3][0]);
      }
      rect(x * side, y * side, side, side);
    }
  }
  statsGrass.innerHTML = "<span>Grass Count: " + data[2].grassCount + "</span>";
  statsEater.innerHTML = "<span>Eater Count: " + data[2].eaterCount + "</span>";
  statsPredator.innerHTML =
    "<span>Predators: " + data[2].predatorCount + "</span>";
  statsWater.innerHTML = "<span>Water Count: " + data[2].waterCount + "</span>";
  statsFire.innerHTML = "<span>Fire Count: " + data[2].fireCount + "</span>";
  statsStone.innerHTML = "<span>Stone Count: " + data[2].stoneCount + "</span>";
}

function fillRandomGrass() {
  socket.emit("fill grass");
}

function setSpring() {
  socket.emit("set spring");
  dirtColor.setAttribute("id", "springDirt");
  grassColor.setAttribute("id", "springGrass");
  eaterColor.setAttribute("id", "springEater");
  predatorColor.setAttribute("id", "springPredator");
  waterColor.setAttribute("id", "springWater");
  fireColor.setAttribute("id", "springFire");
  statsSeason.innerHTML = "<span>Season: Spring</span>";
}
function setSummer() {
  socket.emit("set summer");
  dirtColor.setAttribute("id", "summerDirt");
  grassColor.setAttribute("id", "summerGrass");
  eaterColor.setAttribute("id", "summerEater");
  predatorColor.setAttribute("id", "summerPredator");
  waterColor.setAttribute("id", "summerWater");
  fireColor.setAttribute("id", "summerFire");
  statsSeason.innerHTML = "<span>Season: Summer</span>";
}
function setAutumn() {
  socket.emit("set autumn");
  dirtColor.setAttribute("id", "autumnDirt");
  grassColor.setAttribute("id", "autumnGrass");
  eaterColor.setAttribute("id", "autumnEater");
  predatorColor.setAttribute("id", "autumnPredator");
  waterColor.setAttribute("id", "autumnWater");
  fireColor.setAttribute("id", "autumnFire");
  statsSeason.innerHTML = "<span>Season: Autumn</span>";
}
function setWinter() {
  socket.emit("set winter");
  dirtColor.setAttribute("id", "winterDirt");
  grassColor.setAttribute("id", "winterGrass");
  eaterColor.setAttribute("id", "winterEater");
  predatorColor.setAttribute("id", "winterPredator");
  waterColor.setAttribute("id", "winterWater");
  fireColor.setAttribute("id", "winterFire");
  statsSeason.innerHTML = "<span>Season: Winter</span>";
}
function restart() {
  socket.emit("restart");
}

socket.on("send matrix", update);
