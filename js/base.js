import {BASE_SPRITES} from "./data.js";

export default class Base {
    constructor(x,y) {
        this.x = x;
        this.y = y;
        this.type = "base";
        this.destroyed = false;
        this.sprites = BASE_SPRITES;
    }
}