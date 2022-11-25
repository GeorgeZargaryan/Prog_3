const Grass = require("./game/Grass.js");
const GrassEater = require("./game/GrassEater.js");
const Predator = require("./game/Predator.js");
const Water = require("./game/Water.js");
const Fire = require("./game/Fire.js");

var express = require("express");
var app = express();
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

gameColorMode = ['#9b7653','green', 'yellow', 'red', 'blue','orange'];

matrix = [];

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


  io.sockets.emit("send matrix", matrix);
}
function gameMove() {
  for (let index = 0; index < grassArr.length; index++) {
    grassArr[index].mul(matrix, grassArr);
  }
  for (let index = 0; index < waterArr.length; index++) {
    waterArr[index].mul(matrix, waterArr, fireArr);
  }
  for (let index = 0; index < eaterArr.length; index++) {
    eaterArr[index].eat(matrix, eaterArr, grassArr);
  }
  for (let index = 0; index < predatorArr.length; index++) {
    predatorArr[index].eat(matrix, predatorArr, eaterArr, grassArr);
  }
  for (let index = 0; index < fireArr.length; index++) {
    fireArr[index].eat(matrix, fireArr, grassArr, eaterArr, predatorArr);
  }

  io.sockets.emit("send matrix", matrix);
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
  io.sockets.emit("send matrix", matrix);
}

function changeWeather(){
  
}

setInterval(gameMove, 500);
matrixGen(80, 1500, 150, 30, 20, 15);

server.listen(3000);

io.on("connection", function (socket) {
  createobj();
  socket.on('fill grass', fillRandomGrass)
  socket.on('change weather', )
});
