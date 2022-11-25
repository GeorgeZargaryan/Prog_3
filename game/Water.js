const Creatures = require("./Creatures.js");
const Fire = require("./Fire.js");

module.exports = class Water extends Creatures {
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
  mul(matrix, waterArr, fireArr) {
    this.life++;
    let newCell = this.getRandomCell(this.chooseCell(0, matrix));
    let newCell2 = this.getRandomCell(this.chooseCell(5, matrix));
    if (newCell2) {
      this.wreck(matrix, fireArr, waterArr);
    }
    if (newCell && this.life > 10 && waterArr.length <= 300) {
      let x = newCell[0];
      let y = newCell[1];
      matrix[y][x] = 4;
      let water = new Water(x, y);
      waterArr.push(water);
      this.life = 0;
    }
  }
  wreck(matrix, FireArr, waterArr) {
    this.getNewDirections();
    let newCell = this.getRandomCell(this.chooseCell(5, matrix));
    if (newCell) {
      let x = newCell[0];
      let y = newCell[1];
      matrix[y][x] = 0;
      matrix[this.y][this.x] = 0;
      
      for (let index = 0; index < waterArr.length; index++) {
        if (waterArr[index].x == x && waterArr[index].y == y) {
          waterArr.splice(index, 1);
        }
      }

      this.y = y;
      this.x = x;
      
      for (let index = 0; index < FireArr.length; index++) {
        if (FireArr[index].x == x && FireArr[index].y == y) {
          FireArr.splice(index, 1);
        }
      }
    }
  }
};
