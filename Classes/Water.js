class Water extends Creatures{
    
    getNewDirections() {
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];
    }
    mul() {
        this.life ++;
        let newCell = random(this.chooseCell(0));
        let newCell2 = random(this.chooseCell(5))
        if(newCell2){
            this.wreck();
        }
        if (newCell && this.life > 11) {
            let x = newCell[0];
            let y = newCell[1];
            matrix[y][x] = 4;
            let water = new Water(x, y);
            jurArr.push(water);
            this.life = 0;
        }
    }
    wreck(){
        this.getNewDirections();
        let newCell = random(this.chooseCell(5));
        if (newCell) {
            this.energy += 15;
            let x = newCell[0];
            let y = newCell[1];
            matrix[y][x] = 4;
            matrix[this.y][this.x] = 0;

            this.y = y;
            this.x = x;

            for (let index = 0; index < krakArr.length; index++) {
                if (krakArr[index].x == x && krakArr[index].y == y) {
                    krakArr.splice(index, 1)
                }
            }

            if (this.energy > 60) {
                this.mul()
            }
 
        }
        
    }
}