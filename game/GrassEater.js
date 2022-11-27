const Creatures = require('./Creatures.js');
module.exports = class GrassEater extends Creatures{
  constructor(x, y, gender) {
    super(x, y, gender)
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
    this.life++;
    let newCell = this.getRandomCell(this.chooseCell(0));
    if (newCell && this.gender == 1 && this.life > 6) {
      let x = newCell[0];
      let y = newCell[1];
      matrix[y][x] = 2;
      let grassEater = new GrassEater(x, y, Math.round(Math.random()));
      eaterArr.push(grassEater);
      this.life = 0;
    }else{
      this.eat();
    }
  }
  die() {
    matrix[this.y][this.x] = 0;
    for (let index = 0; index < eaterArr.length; index++) {
      if (eaterArr[index].x == this.x && eaterArr[index].y == this.y) {
        eaterArr.splice(index, 1);
      }
    }
  }
  eat() {
    this.getNewDirections();
    let newCell = this.getRandomCell(this.chooseCell(1));
    if (newCell) {
      this.energy += 5;
      let x = newCell[0];
      let y = newCell[1];

      matrix[y][x] = 2;
      matrix[this.y][this.x] = 0;

      this.y = y;
      this.x = x;

      for (let index = 0; index < grassArr.length; index++) {
        if (grassArr[index].x == x && grassArr[index].y == y) {
          grassArr.splice(index, 1);
        }
      }
    } else {
      this.move();
    }
  }
  move() {
    this.energy -= 2;
    let newCell = this.getRandomCell(this.chooseCell(0)); // .concat(this.chooseCell(4, matrix))
    if (newCell) {
      let x = newCell[0];
      let y = newCell[1];
      matrix[y][x] = 2;
      matrix[this.y][this.x] = 0;

      this.y = y;
      this.x = x;
    }
    if (this.energy < 0) {
      this.die();
    }
  }
}
