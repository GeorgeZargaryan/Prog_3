const Creatures = require("./Creatures.js");
module.exports = class Fire extends Creatures {
  constructor(x, y) {
    super(x, y);
    this.energy = 60;
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
    this.life++;
    let newCell = this.getRandomCell(this.chooseCell(0));
    if (newCell && this.life > 12) {
      let x = newCell[0];
      let y = newCell[1];
      matrix[y][x] = 1;
      let fire = new Fire(x, y, Math.round(Math.random()));
      fireArr.push(fire);
      this.life = 0;
    }
    else{
      this.eat();
    }
  }
  die() {
    matrix[this.y][this.x] = 0;
    for (let index = 0; index < fireArr.length; index++) {
      if (fireArr[index].x == this.x && fireArr[index].y == this.y) {
        fireArr.splice(index, 1);
      }
    }
  }
  eat() {
    this.getNewDirections();
    let newCell = this.getRandomCell(
      this.chooseCell(1)
        .concat(this.chooseCell(2))
        .concat(this.chooseCell(3))
    );
    if (newCell) {
      this.energy += 15;
      let x = newCell[0];
      let y = newCell[1];
      matrix[y][x] = 5;
      matrix[this.y][this.x] = 0;

      this.y = y;
      this.x = x;

      for (let index = 0; index < grassArr.length; index++) {
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
    } else {
      this.move();
    }
  }
  move() {
    this.energy -= 10;
    let newCell = this.getRandomCell(
      this.chooseCell(0)
    );
    if (newCell) {
      let x = newCell[0];
      let y = newCell[1];
      matrix[y][x] = 5;
      matrix[this.y][this.x] = 0;

      this.y = y;
      this.x = x;
    }
    if (this.energy < 0) {
      this.die();
    }
  }

};
