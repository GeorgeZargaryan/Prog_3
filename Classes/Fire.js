// const Creatures = require("./Creatures");
class Fire extends Creatures{
  constructor(x, y) {
    super(x ,y);
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
  mul() {
    this.life++;
    let newCell = random(this.chooseCell(0));
    if (newCell && this.life > 10) {
      let x = newCell[0];
      let y = newCell[1];
      matrix[y][x] = 1;
      let fire = new Fire(x, y);
      krakArr.push(fire);
      this.life = 0;
    }
  }
  die() {
    matrix[this.y][this.x] = 0;
    for (let index = 0; index < krakArr.length; index++) {
      if (krakArr[index].x == this.x && krakArr[index].y == this.y) {
        krakArr.splice(index, 1);
      }
    }
  }
  eat() {
    this.getNewDirections();
    let newCell = random(
      this.chooseCell(1).concat(this.chooseCell(2)).concat(this.chooseCell(3))
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
        this.mul();
      }
    } else {
      this.move();
    }
  }
  move() {
    this.energy -= 2;
    let newCell = random(
      this.chooseCell(0)
        .concat(this.chooseCell(1))
        .concat(this.chooseCell(2))
        .concat(this.chooseCell(3))
    );
    if (newCell) {
      let x = newCell[0];
      let y = newCell[1];
      matrix[y][x] = 5;
      matrix[this.y][this.x] = 0;

      this.y = y;
      this.x = x;
      if (this.energy < 0) {
        this.die();
      }
    }
  }
}

// module.exports = Fire;