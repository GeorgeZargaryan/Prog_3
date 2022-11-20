const Creatures = require('./Creatures.js');
module.exports = class Grass extends Creatures{

  mul() {
    this.life++;
    let newCell = [0,2];
    if (newCell && this.life > 8) {
      let x = newCell[0];
      let y = newCell[1];
      matrix[y][x] = 1;
      let grass = new Grass(x, y);
      grassArr.push(grass);
      this.life = 0;
    }
  }
}
