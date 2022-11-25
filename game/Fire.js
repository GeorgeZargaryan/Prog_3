const Creatures = require("./Creatures.js");
module.exports = class Fire extends Creatures {
  constructor(x, y) {
    super(x, y);
    this.energy = 10;
  }
  getNewDirections() {
    this.directions = [
      [this.x - 1, this.y - 1],
      [this.x, this.y - 1],
      [this.x + 1, this.y - 1],
      [this.x - 1, this.y],
      [this.x + 1, this.y],
      [this.x - 1, this.y + 1],
      [this.x, this.y + 1],
      [this.x + 1, this.y + 1],
    ];
  }
  mul(matrix, FireArr) {
    this.life++;
    let newCell = this.getRandomCell(this.chooseCell(0, matrix));
    if (newCell && this.life > 10) {
      let x = newCell[0];
      let y = newCell[1];
      matrix[y][x] = 1;
      let fire = new Fire(x, y);
      FireArr.push(fire);
      this.life = 0;
    }
  }
  die(matrix, FireArr) {
    matrix[this.y][this.x] = 0;
    for (let index = 0; index < FireArr.length; index++) {
      if (FireArr[index].x == this.x && FireArr[index].y == this.y) {
        FireArr.splice(index, 1);
      }
    }
  }
  eat(matrix, fireArr, grassArr, eaterArr, predatorArr) {
    this.getNewDirections();
    let newCell = this.getRandomCell(
      this.chooseCell(1, matrix)
        .concat(this.chooseCell(2, matrix))
        .concat(this.chooseCell(3, matrix))
    );
    if (newCell) {
      this.energy += 10;
      let x = newCell[0];
      let y = newCell[1];
      matrix[y][x] = 5;
      matrix[this.y][this.x] = 0;

      this.y = y;
      this.x = x;

      for (let index = 0; index < eaterArr.length; index++) {
        if (grassArr[index].x == x && grassArr[index].y == y) {
          grassArr.splice(index, 1);
        }
      }
      for (let index = 0; index < eaterArr.length; index++) {
        if (eaterArr[index].x == x && eaterArr[index].y == y) {
          eaterArr.splice(index, 1);
        }
      }
      for (let index = 0; index < predatorArr.length; index++) {
        if (predatorArr[index].x == x && predatorArr[index].y == y) {
          predatorArr.splice(index, 1);
        }
      }
      if (this.energy >= 60) {
        this.mul(matrix, fireArr);
      }
    } else {
      this.move(matrix, fireArr);
    }
  }
  move(matrix, fireArr) {
    this.energy -= 2;
    let newCell = this.getRandomCell(
      this.chooseCell(0, matrix)
        .concat(this.chooseCell(1, matrix))
        .concat(this.chooseCell(2, matrix))
        .concat(this.chooseCell(3, matrix))
    );
    if (newCell) {
      let x = newCell[0];
      let y = newCell[1];
      matrix[y][x] = 5;
      matrix[this.y][this.x] = 0;

      this.y = y;
      this.x = x;
    }
    if (this.energy <= 0) {
      this.die(matrix, fireArr);
    }
  }

};
