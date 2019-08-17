class Turtle {
    constructor(x, y) {
        this.presentPosition = [x, y]; // the present position
        this.allPoints = []; // all the points in this array
        this.allPoints.push(this.presentPosition);
        this.sequentialPoints = []; // sort the allPoint array
        // 1: east; 2: south; 3: west; 4: north
        this.direction = 1;
        // east:[1, 0]; south:[0,1]; west:[-1,0]; north:[0,-1];
        this.directionArr = [1, 0];
        return this;
    }
    right() {
        this.direction++;
        switch (direction) {
            case 2:
                this.directionArr = [0, 1];
                break;
            case 3:
                this.directionArr = [-1, 0];
                break;
            case 4:
                this.directionArr = [0, -1];
                break;
            default:
                this.direction = 1;
                this.directionArr = [1, 0];
                break;
        }
        return this;
    }
    forward(steps) {
        for (let i = 0; i < steps; i++) {
            let temp = [this.presentPosition[x] + this.directionArr[0], this.presentPosition[y] + this.directionArr[y]];
            this.presentPosition = temp;
            this.allPoints.push(temp);
        }
        return this;
    }
    allPoints() {
        return this.allPoints;
    }
}