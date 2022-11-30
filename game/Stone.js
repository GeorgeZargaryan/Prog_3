const Creatures = require("./Creatures.js");
module.exports = class Stone extends Creatures {
    constructor(x, y, mul) {
        super(x, y);
        this.life = 30;
        this.mul = mul;
      }
  loseHealth() {
    if(this.getRandomCell(this.chooseCell(2).concat(this.chooseCell(3)).concat(this.chooseCell(4)))) {
      this.life--;
    }
    else{
        this.life++;
        if(this.life > 60 && this.mul < 3 &&this.getRandomCell(this.chooseCell(0).concat(this.chooseCell(1)))){
          this.mul++;
          this.getBigger();
        }
    }
    if (this.life < 0) {
      this.die();
    }
  }
  getBigger(){
    let newCell = this.getRandomCell(this.chooseCell(0).concat(this.chooseCell(1)));
    if (newCell) {
      let x = newCell[0];
      let y = newCell[1];
      matrix[y][x] = 6;
      let stone = new Stone(x, y, this.mul);
      stoneArr.push(stone);
      this.life = 30;
    }
  }
  die() {
    matrix[this.y][this.x] = 0;
    for (let index = 0; index < stoneArr.length; index++) {
      if (stoneArr[index].x == this.x && stoneArr[index].y == this.y) {
        stoneArr.splice(index, 1);
      }
    }
  }
};
