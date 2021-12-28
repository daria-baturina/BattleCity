import {BASE_BLOCK_SIZE, BULLET_SIZE, BULLET_SPRITES, UNIT_SIZE} from "./data.js";
import Explosion from "./explosion.js";

export default class Bullet {
    constructor({ x,y,tank,direction }) {
        this.x = x;
        this.y = y;
        this.type = 'bullet';
        this.width = BULLET_SIZE;
        this.height = BULLET_SIZE;
        this.sprites = BULLET_SPRITES;
        this.direction = direction;
        this.tank = tank;
        this.explosion = null;
        this.speed = 3;
    }

    haveCollision (a, b) {
        let getSize = obj => {
            switch (obj.type) {
                case -1:
                case 1:
                case 2:
                    return BASE_BLOCK_SIZE;
                case "playerTank":
                case "enemyTank":
                case "base":
                    return UNIT_SIZE;
                case "bullet":
                    return BULLET_SIZE;
            }
        }
        let result =
            a.x + getSize(a) > b.x &&
            b.x + getSize(b) > a.x &&
            a.y + getSize(a) > b.y &&
            b.y + getSize(b) > a.y
        if (result) {
            return a
        } else {
            return false
        }
    }

    getExplosionPosition() {
        switch (this.direction) {
            case "UP": return [this.x - 10, this.y - 12];
            case "RIGHT": return [this.x + BULLET_SIZE - 16, this.y - 12];
            case "DOWN": return [this.x - 10, this.y + BULLET_SIZE - 16];
            case "LEFT": return [this.x - 16, this.y - 12];
        }
    }

    update(world, gameSpeed) {
        let shift = gameSpeed * this.speed;
        if (!this.explosion) {
            switch (this.direction) {
                case "UP":
                    this.y -= shift;
                    break;
                case "RIGHT":
                    this.x += shift;
                    break;
                case "DOWN":
                    this.y += shift;
                    break;
                case "LEFT":
                    this.x -= shift;
                    break;
            }

            /*есть ли коллизии после передвижения*/
            let collisions = new Set();
            world.objects.forEach((object) => {
                if (object !== this.tank) {
                    collisions.add(this.haveCollision(object, this));
                }
            });
            let [x, y] = this.getExplosionPosition();
            if (collisions.size > 1) {
                this.explosion = new Explosion(x, y, this.tank);
                world.updateObjects(collisions);
            }
        } else {
            this.explosion.update()
        }
    }
}