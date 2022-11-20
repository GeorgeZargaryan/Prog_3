
let socket = io()

// let matrix = [];
let side = 10;
// let grassArr = [];
// let eaterArr = [];
// let predatorArr = [];
// let jurArr = [];
// let krakArr = [];

function setup() {
  frameRate(30);
  // matrixGen(80, 1500, 100, 30, 15, 20);
  createCanvas(600 ,600);
  background("grey");

  noStroke();
}

function update(matrix) {
  console.log(matrix)
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
  // setInterval(update,1000)
  // for (let index = 0; index < grassArr.length; index++) {
  //   grassArr[index].mul();
  // }
  // for (let index = 0; index < jurArr.length; index++) {
  //   jurArr[index].mul();
  // }
  // for (let index = 0; index < eaterArr.length; index++) {
  //   eaterArr[index].eat();
  // }
  // for (let index = 0; index < predatorArr.length; index++) {
  //   predatorArr[index].eat();
  // }
  // for (let index = 0; index < krakArr.length; index++) {
  //   krakArr[index].eat();
  // }
}
// window.setup = setup;
// window.draw = draw;
/*
const fs = require("fs");

var obj =
{
    "first_name": "Valera",
    "last_name": "Hovsepyan",
    "age": 15,
    "is_tumo_student": false
}

function main(){
    fs.writeFileSync("obj.json", JSON.stringify(obj))
    fs.readFileSync("obj.json").toString();
    console.log(JSON.stringify(obj));
}
main();
*/
socket.on("send matrix",update)