import {BASE_BLOCK_SIZE, MAP_END, MAP_START, UNIT_SIZE} from "./data.js";

export default class Tank {
    constructor(x,y,direction) {
        this.direction = {
            direction: direction,
            times: 1
        };
        this.x = x;
        this.y = y;
        this.moved = false;
        this.type = "playerTank";
    }

    haveCollision (a, aSize, b, bSize) {
        return (a.x + aSize > b.x &&
            b.x + bSize > a.x &&
            a.y + aSize > b.y &&
            b.y + bSize > a.y)
    }

    update(activeKeys, map) {
        console.log(map);
        let previousDirection = this.direction.direction;
        let previousX = this.x;
        let previousY = this.y;
        if (activeKeys.has('ArrowUp')) {
            if (this.y !== MAP_START.y) {
            this.y -= 1;
            }
            this.direction.direction = "UP";
        } else if (activeKeys.has('ArrowRight')) {
            if (this.x + UNIT_SIZE !== MAP_END.x) {
                this.x += 1;
            }
            this.direction.direction = "RIGHT";
        } else if (activeKeys.has('ArrowDown')) {
            if (this.y + UNIT_SIZE !== MAP_END.y) {
                this.y += 1;
            }
            this.direction.direction = "DOWN";
        } else if (activeKeys.has('ArrowLeft')) {
            if (this.x !== MAP_START.x) {
                this.x -= 1;
            }
            this.direction.direction = "LEFT";
        }

        let collision = new Set();
        map.forEach((object) => {
            collision.add(this.haveCollision(object, BASE_BLOCK_SIZE, this, UNIT_SIZE));
        });

        if (collision.has(true)) {
            this.x = previousX;
            this.y = previousY;
        }

        previousDirection === this.direction.direction ?
            this.direction.times += 1
            : this.direction.times = 1;

        this.moved = previousX === this.x && previousY === this.y;
    }
}
