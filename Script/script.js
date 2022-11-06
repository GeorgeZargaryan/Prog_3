let matrix = [];
let side = 10;
let grassArr = [];
let eaterArr = [];
let predatorArr = [];
let jurArr = [];
let krakArr = [];
function setup() {
  matrixGen(80, 1500, 100, 30, 40, m20);
  createCanvas(matrix[0].length * side, matrix.length * side);
  background("grey");

  noStroke();

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
      let x = Math.floor(random(0, matrixSize));
      let y = Math.floor(random(0, matrixSize));
      matrix[y][x] = 1;
    }
    for (let index = 0; index < grassEaterCount; index++) {
      let x = Math.floor(random(0, matrixSize));
      let y = Math.floor(random(0, matrixSize));
      matrix[y][x] = 2;
    }
    for (let index = 0; index < predatorCount; index++) {
      let x = Math.floor(random(0, matrixSize));
      let y = Math.floor(random(0, matrixSize));
      matrix[y][x] = 3;
    }
    for (let index = 0; index < waterCount; index++) {
      let x = Math.floor(random(0, matrixSize));
      let y = Math.floor(random(0, matrixSize));
      matrix[y][x] = 4;
    }
    for (let index = 0; index < fireCount; index++) {
      let x = Math.floor(random(0, matrixSize));
      let y = Math.floor(random(0, matrixSize));
      matrix[y][x] = 5;
    }
  }

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
      }
      // else if(matrix[y][x] == 4){
      //     let water = new Water(x,y);
      //     jurArr.push(water);
      // }
      else if (matrix[y][x] == 5) {
        let fire = new Fire(x, y);
        krakArr.push(fire);
      }
    }
  }
}

function draw() {
  for (let y = 0; y < matrix.length; y++) {
    const element = matrix[y];
    for (let x = 0; x < element.length; x++) {
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
        fill("grey");
      }
      rect(x * side, y * side, side, side);
    }
  }
  for (let index = 0; index < grassArr.length; index++) {
    grassArr[index].mul();
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
