import Tank from "./tank.js";
import {DIRECTION, DIRECTION_NUM, ENEMY_TANK_SPRITES} from "./data.js";

export default class EnemyTank extends Tank {
    constructor(x, y, direction) {
        super(x, y, direction);
        this.sprites = ENEMY_TANK_SPRITES;
        this.type = "enemyTank";
        this.moved = true;
        this.turnTimer = 0;
    }

    update(world, gameSpeed, timeDelta) {
        let shift = gameSpeed * this.speed;
        this.previousDirection = this.direction.direction;
        let previousX = this.x;
        let previousY = this.y;
/*        const randomDirection = Math.floor(Math.random() * 4);*/
        if (!this.moved) {
            let randomDirection = Math.random() <= 0.5 ? DIRECTION[this.previousDirection] + 1 : DIRECTION[this.previousDirection] - 1;
            if (randomDirection === -1) {
                randomDirection = 3;
            } else if (randomDirection === 4) {
                randomDirection = 0;
            }
            this.direction.direction = DIRECTION_NUM[randomDirection];
        }
        this.turn(shift);
        if (this.bullet) {
            this.bullet.update(world, gameSpeed);
        } else {
            this.fire(this.direction.direction);
        }
        this.checkCollisions(world.objects, previousX, previousY);

    }

    shouldTurn(timeDelta) {
        this.turnTimer += timeDelta;

        return this.turnTimer > 1000;
    }

    turnRandomly() {
        const randomDirection = Math.floor(Math.random() * 4);

        this.turnTimer = 0;
        this.turn(randomDirection);
    }
}