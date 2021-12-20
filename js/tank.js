import {BASE_BLOCK_SIZE, MAP_END, MAP_START, UNIT_SIZE} from "./data.js";

export default class Tank {
    constructor(x,y,direction) {
        this.direction = {
            direction: direction,
            times: 1
        };
        this.previousDirection = this.direction.direction;
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

    getDirectionForKeys(activeKeys) {
        if (activeKeys.has('ArrowUp')) {
            return "UP";
        } else if (activeKeys.has('ArrowRight')) {
            return "RIGHT";
        } else if (activeKeys.has('ArrowDown')) {
            return "DOWN";
        } else if (activeKeys.has('ArrowLeft')) {
            return "LEFT";
        }
    }

    update(activeKeys, map) {
        this.previousDirection = this.direction.direction;
        let previousX = this.x;
        let previousY = this.y;
        if (activeKeys.size !== 0) {
            this.direction.direction = this.getDirectionForKeys(activeKeys)
            if (this.direction.direction === "UP") {
                if (this.y !== MAP_START.y) {
                    this.y -= 1;
                }
            } else if (this.direction.direction === "RIGHT") {
                if (this.x + UNIT_SIZE !== MAP_END.x) {
                    this.x += 1;
                }
            } else if (this.direction.direction === "DOWN") {
                if (this.y + UNIT_SIZE !== MAP_END.y) {
                    this.y += 1;
                }
            } else if (this.direction.direction === "LEFT") {
                if (this.x !== MAP_START.x) {
                    this.x -= 1;
                }
            }
            if (this.direction.direction === "UP" || this.direction.direction === "DOWN") {
                const deltaRight = this.x % BASE_BLOCK_SIZE;
                const deltaLeft = BASE_BLOCK_SIZE - deltaRight;

                if (this.previousDirection === "RIGHT") {
                    if (deltaRight >= BASE_BLOCK_SIZE * 0.5) {
                        this.x += deltaLeft;
                    } else {
                        this.x -= deltaRight;
                    }
                } else if (this.previousDirection === "LEFT") {
                    if (deltaLeft >= BASE_BLOCK_SIZE * 0.5) {
                        this.x -= deltaRight;
                    } else {
                        this.x += deltaLeft;
                    }
                }
            } else {
                const deltaBottom = this.y % BASE_BLOCK_SIZE;
                const deltaTop = BASE_BLOCK_SIZE - deltaBottom;

                if (this.previousDirection === "UP") {
                    if (deltaTop >= BASE_BLOCK_SIZE * 0.5) {
                        this.y -= deltaBottom;
                    } else {
                        this.y += deltaTop;
                    }
                } else if (this.previousDirection === "DOWN") {
                    if (deltaBottom >= BASE_BLOCK_SIZE * 0.5) {
                        this.y += deltaTop;
                    } else {
                        this.y -= deltaBottom;
                    }
                }
            }
        }

        /*есть ли коллизии после передвижения*/
        let collision = new Set();
        map.forEach((object) => {
            collision.add(this.haveCollision(object, BASE_BLOCK_SIZE, this, UNIT_SIZE));
        });

        /*если есть коллизии оставить предыдущие значения x и y*/
        if (collision.has(true)) {
            this.x = previousX;
            this.y = previousY;
        }

        /*сдвинулся ли танк*/
        this.moved = previousX === this.x && previousY === this.y;

        /*счетчик движения в одном направлении*/
        this.previousDirection === this.direction.direction ?
            this.direction.times += 1
            : this.direction.times = 1;

    }

    getBulletStartingPosition() {
        switch (this.direction) {
            case "UP": return [this.x + 12, this.y - 4];
            case "RIGHT": return [this.x + UNIT_SIZE - 8, this.y + 12];
            case "DOWN": return [this.x + 10, this.y + UNIT_SIZE - 8];
            case "LEFT": return [this.x, this.y + 12];
        }
    }
}

