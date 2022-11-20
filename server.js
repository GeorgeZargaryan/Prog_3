var express = require("express");
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
app.use(express.static("."));

app.get("/", function (req, res) {
  res.redirect("game/index.html");
});

// app.listen(3000, function(){
//    console.log("Example is running on port 3000");
// });


// io.on('connection', function (socket) {
//    socket.on("socket on", function (data) {
//        io.sockets.emit("on", data);
//    });
// });

const Grass = require("./game/Grass.js");
const GrassEater = require("./game/GrassEater.js");
const Predator = require("./game/Predator.js");
const Water = require("./game/Water.js");
const Fire = require("./game/Fire.js");

let grassArr = [];
let eaterArr = [];
let predatorArr = [];
let jurArr = [];
let krakArr = [];
let matrix = [];


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
  for (let index = 0; index < grassCount; index++) {
    let x = Math.floor(Math.random() * matrixSize);
    let y = Math.floor(Math.random() * matrixSize);
    matrix[y][x] = 1;
  }
  for (let index = 0; index < grassEaterCount; index++) {
    let x = Math.floor(Math.random() * matrixSize);
    let y = Math.floor(Math.random() * matrixSize);
    matrix[y][x] = 2;
  }
  for (let index = 0; index < predatorCount; index++) {
    let x = Math.floor(Math.random() * matrixSize);
    let y = Math.floor(Math.random() * matrixSize);
    matrix[y][x] = 3;
  }
  for (let index = 0; index < waterCount; index++) {
    let x = Math.floor(Math.random() * matrixSize);
    let y = Math.floor(Math.random() * matrixSize);
    matrix[y][x] = 4;
  }
  for (let index = 0; index < fireCount; index++) {
    let x = Math.floor(Math.random() * matrixSize);
    let y = Math.floor(Math.random() * matrixSize);
    matrix[y][x] = 5;
  }
}

function createobj() {
  for (let y = 0; y < matrix.length; y++) {
    for (let x = 0; x < matrix[y].length; x++) {
      if (matrix[y][x] == 1) {
        let grass = new Grass(x, y);
        grassArr.push(grass);
      } else if (matrix[y][x] == 2) {
        let grassEater = new GrassEater(x, y);
        eaterArr.push(grassEater);
      } else if (matrix[y][x] == 3) {
        let predator = new Predator(x, y);
        predatorArr.push(predator);
      } else if (matrix[y][x] == 4) {
        let water = new Water(x, y);
        jurArr.push(water);
      } else if (matrix[y][x] == 5) {
        let fire = new Fire(x, y);
        krakArr.push(fire);
      }
    }
  }
  io.sockets.emit('send matrix', matrix);
}
function gameMove(){
  for (let index = 0; index < grassArr.length; index++) {
    grassArr[index].mul(matrix);
  }
  for (let index = 0; index < jurArr.length; index++) {
    jurArr[index].mul();
  }
  for (let index = 0; index < eaterArr.length; index++) {
    eaterArr[index].eat();
  }
  for (let index = 0; index < predatorArr.length; index++) {
    predatorArr[index].eat();
  }
  for (let index = 0; index < krakArr.length; index++) {
    krakArr[index].eat();
  }
}

setInterval(gameMove,1000)
matrixGen(80, 1500, 100, 30, 15, 20);



// var express = require('express');
// var app = express();
// var server = require('http').createServer(app);
// var io = require('socket.io')(server);

// var messages = [];

// app.use(express.static("."));

// app.get('/', function (req, res) {
//    res.redirect('index.html');
// });

server.listen(3000);

io.on('connection', function (socket) {
  createobj();
});
