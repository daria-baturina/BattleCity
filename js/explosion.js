import {BULLET_EXPLOSION_SPRITES} from "./data.js";

export default class Explosion {
    constructor(x,y,tank) {
        this.type = 'explosion';
        this.x = x;
        this.y = y;
        this.sprites = BULLET_EXPLOSION_SPRITES;
        this.timer = 0;
        this.tank = tank;
    }
    update() {
        if (this.timer < 5) {
            this.timer++
        } else {
            this.tank.bullet.explosion = null;
            this.tank.bullet = null;
        }
    }
}