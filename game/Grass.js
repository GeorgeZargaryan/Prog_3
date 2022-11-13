import {Creatures} from './Creatures.js';
export class Grass extends Creatures{

  mul() {
    this.life++;
    let newCell = random(this.chooseCell(0));
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
