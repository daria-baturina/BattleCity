import Tank from "./tank.js";
import {ENEMY_TANK_SPRITES} from "./data.js";

export default class EnemyTank extends Tank {
    constructor(x, y, direction) {
        super(x, y, direction);
        this.sprites = ENEMY_TANK_SPRITES;
        this.type = "playerTank";
    }

    update(map, gameSpeed) {
        let shift = gameSpeed * this.speed;
        this.previousDirection = this.direction.direction;
        let previousX = this.x;
        let previousY = this.y;
        if (this.bullet) {
            this.bullet.update(map, gameSpeed);
        }
        this.checkCollisions(map, previousX, previousY);
    }
}