const Creatures = require("./Creatures.js");
module.exports = class Grass extends Creatures {
  mul(matrix, grassArr) {
    this.life++;
    let newCell = this.getRandomCell(this.chooseCell(0, matrix));
    if (newCell && this.life > 8) {
      let x = newCell[0];
      let y = newCell[1];
      matrix[y][x] = 1;
      let grass = new Grass(x, y);
      grassArr.push(grass);
      this.life = 0;
    }
  }
};
