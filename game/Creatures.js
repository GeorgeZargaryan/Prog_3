module.exports = class Creatures {
  constructor(x, y, gender) {
    this.x = x;
    this.y = y;
    this.life = 0;
    this.gender = gender;
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
  getRandomCell(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  }
};
