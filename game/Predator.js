const Creatures = require("./Creatures.js");

module.exports = class Predator extends Creatures {
  constructor(x, y, gender) {
    super(x, y, gender);
    this.energy = 30;
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
  mul() {
    this.life ++;
    let newCell = this.getRandomCell(this.chooseCell(0, matrix));
    if (newCell && this.gender == 1 && this.life > 7) {
      let x = newCell[0];
      let y = newCell[1];
      matrix[y][x] = 3;
      let predator = new Predator(x, y, Math.round(Math.random()));
      predatorArr.push(predator);
      this.life = 0;
    }
    else{
      this.eat();
    }

  }
  die() {
    matrix[this.y][this.x] = 0;
    for (let index = 0; index < predatorArr.length; index++) {
      if (predatorArr[index].x == this.x && predatorArr[index].y == this.y) {
        predatorArr.splice(index, 1);
      }
    }
  }
  eat() {
    this.getNewDirections();
    let grass = this.getRandomCell(this.chooseCell(1));
    let grassEater = this.getRandomCell(this.chooseCell(2));
    if (grassEater) {
      this.energy += 30;
      let x = grassEater[0];
      let y = grassEater[1];
      matrix[y][x] = 3;
      matrix[this.y][this.x] = 0;

      this.y = y;
      this.x = x;

      for (let index = 0; index < eaterArr.length; index++) {
        if (eaterArr[index].x == x && eaterArr[index].y == y) {
          eaterArr.splice(index, 1);
        }
      }
    } else if (grass) {
      this.energy += 10;
      let x = grass[0];
      let y = grass[1];
      matrix[y][x] = 3;
      matrix[this.y][this.x] = 0;

      this.y = y;
      this.x = x;

      for (let index = 0; index < grassArr.length; index++) {
        if (grassArr[index].x == x && grassArr[index].y == y) {
          grassArr.splice(index, 1);
        }
      }
    }
    else{
      this.move();
    }
  }
  move() {
    this.energy -= 10;
    let newCell = this.getRandomCell(this.chooseCell(0));
    if (newCell) {
      let x = newCell[0];
      let y = newCell[1];
      matrix[y][x] = 3;
      matrix[this.y][this.x] = 0;

      this.y = y;
      this.x = x;
    }
    if (this.energy <= 0) {
      this.die();
    }
  }
};
