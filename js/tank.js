import {DIRECTION, MAP_END, MAP_START, PLAYER_TANK_SPRITES, STAGE_SIZE, UNIT_SIZE} from "./data.js";

export default class Tank {
    constructor(x,y,direction) {
        this.direction = {
            direction: direction,
            times: 1
        };
        this.x = x;
        this.y = y;
    }

    update(activeKeys, previousTank) {
        let previousDirection = this.direction.direction;
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
        previousDirection === this.direction.direction ?
            this.direction.times += 1
            : this.direction.times = 1;
    }
}
