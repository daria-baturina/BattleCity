import {PLAYER_TANK_SPRITES} from "./data.js";
import Tank from "./tank.js";

export default class PlayerTank extends Tank {
    constructor(x, y, direction) {
        super(x, y, direction);
        this.sprites = PLAYER_TANK_SPRITES;
        this.type = "playerTank";
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
        } else if (activeKeys.has('Space')) {
            return this.previousDirection;
        }
    }


    update(activeKeys, world, gameSpeed) {
        let shift = gameSpeed * this.speed;
        this.previousDirection = this.direction.direction;
        let previousX = this.x;
        let previousY = this.y;
        if (this.bullet) {
            this.bullet.update(world, gameSpeed);
        }
        if (activeKeys.has("Space")) {
            this.fire(this.direction.direction);
        }
        if (activeKeys.has('ArrowUp') || activeKeys.has('ArrowRight') || activeKeys.has('ArrowDown') || activeKeys.has('ArrowLeft')) {
            this.direction.direction = this.getDirectionForKeys(activeKeys);
            this.turn(shift);
        }
        this.checkCollisions(world.objects, previousX, previousY);
    }
}

