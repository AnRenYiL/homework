class Turtle {
    constructor(x, y) {
        this.presentPosition = [x, y]; // the present position
        this.allPointsArr = []; // all the points in this array
        this.allPointsArr.push(this.presentPosition);
        this.sequentialPoints = []; // use for print()
        let temp = [this.presentPosition[0], this.presentPosition[1]];
        temp.push(false);
        this.sequentialPoints.push(temp);
        // 1: east; 2: south; 3: west; 4: north
        this.direction = 1;
        // east:[1, 0]; south:[0,1]; west:[-1,0]; north:[0,-1];
        this.directionArr = [1, 0];
        this.mapArr = [];
        this.maxX = 0;
        this.minX = 0;
        this.maxY = 0;
        this.minY = 0;
        return this;
    }
    right() {
        this.direction++;
        switch (this.direction) {
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
    left() {
        this.direction--;
        switch (this.direction) {
            case 1:
                this.directionArr = [1, 0];
                break;
            case 2:
                this.directionArr = [0, 1];
                break;
            case 3:
                this.directionArr = [-1, 0];
                break;
            default:
                this.direction = 4;
                this.directionArr = [0, -1];
                break;
        }
        return this;
    }
    forward(steps) {
        for (let i = 0; i < steps; i++) {
            let temp = [this.presentPosition[0] + this.directionArr[0], this.presentPosition[1] + this.directionArr[1]];
            this.presentPosition = [temp[0], temp[1]];
            this.allPointsArr.push(this.presentPosition);
            temp.push(false);
            this.sequentialPoints.push(temp);
        }
        return this;
    }
    allPoints() {
        this.getMaxAndMin();
        let valX = 0,
            valY = 0;
        if (this.minX < 0) {
            valX = 1 - this.minX;
        }
        if (this.minY < 0) {
            valY = 1 - this.minY;
        }
        let result = [];
        this.allPointsArr.forEach(element => {
            result.push([element[0] + valX, element[1] + valY]);
        });
        return result;
    }
    print() {
        this.printMap();
        let result = '-- BEGIN LOG\n';
        let lineNumber = this.mapArr[0][1];
        this.sequentialPoints;
        for (const item of this.mapArr) {
            if (lineNumber != item[1]) {
                result += '\n';
                lineNumber = item[1];
            }
            item[2] == true ? result += '■' : result += '□';
        }
        result += '\n-- END LOG\n';
        console.log(result);
    }
    printMap() {
        this.getMaxAndMin();
        for (let i = this.minY; i <= this.maxY; i++) {
            for (let j = this.minX; j <= this.maxX + 1; j++) {
                this.mapArr.push([j, i, false]);
            }
        }
        this.mapArr.forEach((element, index) => {
            this.sequentialPoints.forEach(item => {
                if (JSON.stringify(item) === JSON.stringify(element)) {
                    this.mapArr[index][2] = true;
                }
            });
        });
    }
    getMaxAndMin() {
        for (const item of this.allPointsArr) {
            if (item[0] > this.maxX) {
                this.maxX = item[0];
            }
            if (item[0] < this.minX) {
                this.minX = item[0];
            }
            if (item[1] > this.maxY) {
                this.maxY = item[1];
            }
            if (item[1] < this.minY) {
                this.minY = item[1];
            }
        }
    }
}
// const query = 'f10-r-r-f10-l-f5-l-f10-r-f5-r-f11';
const query = process.argv[2];
if (query) {
    const arr = query.split('-');
    let startNum = 0;
    let flash;
    if (arr[0].includes('t')) {
        const coordinate = arr[0].substring(1).split(',');
        flash = new Turtle(parseInt(coordinate[0]), parseInt(coordinate[1]));
        startNum = 1;
    } else {
        flash = new Turtle(0, 0);
    }
    for (let i = startNum; i < arr.length; i++) {
        if (arr[i].includes('f')) {
            flash.forward(parseInt(arr[i].substring(1)));
        } else if (arr[i] === 'r') {
            flash.right();
        } else {
            flash.left();
        }
    }
    flash.print();
} else {
    const flash = new Turtle(0, 4)
        .forward(3)
        .left()
        .forward(3)
        .right()
        .forward(5)
        .right()
        .forward(8)
        .right()
        .forward(5)
        .right()
        .forward(3)
        .left()
        .forward(3);
    flash.print();
    console.log(flash.allPoints());
}