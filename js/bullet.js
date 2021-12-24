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

    haveCollision (a, aSize, b, bSize) {
        let result =
            a.x + aSize > b.x &&
            b.x + bSize > a.x &&
            a.y + aSize > b.y &&
            b.y + bSize > a.y
        if (result) {
            return [a, b]
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

    update(map, gameSpeed) {
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
            map.map.forEach((object) => {
                collisions.add(this.haveCollision(object, BASE_BLOCK_SIZE, this, BULLET_SIZE));
            });
            let [x, y] = this.getExplosionPosition();
            if (collisions.size > 1) {
                this.explosion = new Explosion(x, y, this.tank);
                map.update(...collisions);
            }
        } else {
            this.explosion.update()
        }
    }
}