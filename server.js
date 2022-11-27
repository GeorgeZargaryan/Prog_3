const Grass = require("./game/Grass.js");
const GrassEater = require("./game/GrassEater.js");
const Predator = require("./game/Predator.js");
const Water = require("./game/Water.js");
const Fire = require("./game/Fire.js");

var express = require("express");
var app = express();
var fs = require("fs");
var server = require("http").createServer(app);
var io = require("socket.io")(server);
app.use(express.static("."));

app.get("/", function (req, res) {
  res.redirect("game/index.html");
});

grassArr = [];
eaterArr = [];
predatorArr = [];
waterArr = [];
fireArr = [];
matrix = [];
gameColors = ['#9b7653','green', 'yellow', 'red','blue','orange'];

season = "Spring";

gameData = [matrix, season];


function matrixGen(
  matrixSize,
  grassCount,
  grassEaterCount,
  predatorCount,
  waterCount,
  fireCount
) {
  for (let index = 0; index < matrixSize; index++) {
    matrix[index] = [];
    for (let i = 0; i < matrixSize; i++) {
      matrix[index][i] = 0;
    }
  }
  while (grassCount > 0) {
    let x = Math.floor(Math.random() * matrixSize);
    let y = Math.floor(Math.random() * matrixSize);
    if (matrix[y][x] == 0) {
      matrix[y][x] = 1;
      grassCount--;
    }
  }
  while (grassEaterCount > 0) {
    let x = Math.floor(Math.random() * matrixSize);
    let y = Math.floor(Math.random() * matrixSize);
    if (matrix[y][x] == 0) {
      matrix[y][x] = 2;
      grassEaterCount--;
    }
  }
  while (predatorCount > 0) {
    let x = Math.floor(Math.random() * matrixSize);
    let y = Math.floor(Math.random() * matrixSize);
    if (matrix[y][x] == 0) {
      matrix[y][x] = 3;
      predatorCount--;
    }
  }
  while (waterCount > 0) {
    let x = Math.floor(Math.random() * matrixSize);
    let y = Math.floor(Math.random() * matrixSize);
    if (matrix[y][x] == 0) {
      matrix[y][x] = 4;
      waterCount--;
    }
  }
  while (fireCount > 0) {
    let x = Math.floor(Math.random() * matrixSize);
    let y = Math.floor(Math.random() * matrixSize);
    if (matrix[y][x] == 0) {
      matrix[y][x] = 5;
      fireCount--;
    }
  }
  season = 0;
}

function createobj() {
  for (let y = 0; y < matrix.length; y++) {
    for (let x = 0; x < matrix[y].length; x++) {
      if (matrix[y][x] == 1) {
        let grass = new Grass(x, y, Math.round(Math.random()));
        grassArr.push(grass);
      } else if (matrix[y][x] == 2) {
        let grassEater = new GrassEater(x, y, Math.round(Math.random()));
        eaterArr.push(grassEater);
      } else if (matrix[y][x] == 3) {
        let predator = new Predator(x, y, Math.round(Math.random()));
        predatorArr.push(predator);
      } else if (matrix[y][x] == 4) {
        let water = new Water(x, y, Math.round(Math.random()));
        waterArr.push(water);
      } else if (matrix[y][x] == 5) {
        let fire = new Fire(x, y, Math.round(Math.random()));
        fireArr.push(fire);
      }
    }
  }
  gameData[0] = matrix;
  io.sockets.emit("send matrix", gameData);
}
function gameMove() {
  for (let index = 0; index < grassArr.length; index++) {
    grassArr[index].mul();
  }
  for (let index = 0; index < waterArr.length; index++) {
    waterArr[index].mul();
  }
  for (let index = 0; index < eaterArr.length; index++) {
    eaterArr[index].mul();
  }
  for (let index = 0; index < predatorArr.length; index++) {
    predatorArr[index].mul();
  }
  for (let index = 0; index < fireArr.length; index++) {
    fireArr[index].mul();
  }
  gameData[0] = matrix;
  gameData[1] = season;
  gameData[2] = {
    grassCount: grassArr.length,
    eaterCount: eaterArr.length,
    predatorCount: predatorArr.length,
    waterCount: waterArr.length,
    fireCount: fireArr.length,
    weather: season // default 0 ???
  };
  gameData[3] = gameColors;
  fs.writeFileSync("stats.json", JSON.stringify(gameData[2],null,4));
  io.sockets.emit("send matrix", gameData);
}

function fillRandomGrass() {
  count = 40;
  while (count > 0) {
    let x = Math.floor(Math.random() * matrix.length);
    let y = Math.floor(Math.random() * matrix.length);
    if (matrix[y][x] == 0) {
      matrix[y][x] = 1;
      let grass = new Grass(x, y, Math.round(Math.random()));
      grassArr.push(grass);
      count--;
    }
  }
  io.sockets.emit("send matrix", gameData);
}

function setSpring() {
  season = "Spring";
  gameColors = ['#9b7653','green', 'yellow', 'red','blue','orange'];
}
function setSummer() {
  season = "Summer";
  gameColors = ['#FFDEBE', '#79D021', '#AA8500', '#f94449', '#009DCF', '#ef820d'];
}
function setAutumn() {
  season = "Autumn";
  gameColors = ['#9b7653', '#75975e', '#e6cc00', '#c2452d', '#0077b6', '#fb8500'];
}
function setWinter() {
  season = "Winter";
  gameColors = ['#C3BBC7', '#FFF8F7', '#fffd86', '#73121d', '#A1E7FF', '#dc6004'];
}
function startGame(){
  grassArr = [];
  eaterArr = [];
  predatorArr = [];
  waterArr = [];
  fireArr = [];
  matrixGen(80, 1500, 100, 60, 20, 15);
  createobj();
}

setInterval(gameMove, 500);
startGame();

server.listen(3000);

io.on("connection", function (socket) {
  socket.on("fill grass", fillRandomGrass);
  socket.on("set spring", setSpring);
  socket.on("set summer", setSummer);
  socket.on("set autumn", setAutumn);
  socket.on("set winter", setWinter);
  socket.on("restart", startGame);
});
