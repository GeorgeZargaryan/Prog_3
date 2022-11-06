class Predator {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.energy = 30;
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
  chooseCell(char) {
    let arr = [];

    for (let index = 0; index < this.directions.length; index++) {
      let x = this.directions[index][0];
      let y = this.directions[index][1];

      if (x >= 0 && y >= 0 && x < matrix[0].length && y < matrix.length) {
        if (matrix[y][x] == char) {
          arr.push(this.directions[index]);
        }
      }
    }

    return arr;
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
    let newCell = random(this.chooseCell(0));
    if (newCell) {
      let x = newCell[0];
      let y = newCell[1];
      matrix[y][x] = 3;
      let predator = new Predator(x, y);
      predatorArr.push(predator);
      this.energy = 0;
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
    let newCell = random(this.chooseCell(2));
    if (newCell) {
      this.energy += 30;
      let x = newCell[0];
      let y = newCell[1];
      matrix[y][x] = 3;
      matrix[this.y][this.x] = 0;

      this.y = y;
      this.x = x;

      for (let index = 0; index < eaterArr.length; index++) {
        if (eaterArr[index].x == x && eaterArr[index].y == y) {
          eaterArr.splice(index, 1);
        }
      }

      if (this.energy > 60) {
        this.mul();
      }
    } else {
      this.move();
    }
  }
  move() {
    this.energy--;
    let newCell = random(this.chooseCell(0).concat(this.chooseCell(1)));
    if (newCell) {
      let x = newCell[0];
      let y = newCell[1];
      matrix[y][x] = 3;
      matrix[this.y][this.x] = 0;

      this.y = y;
      this.x = x;
      if (this.energy < 0) {
        this.die();
      }
    }
  }
}
