import Tank from "./tank.js";
import {LEVEL1, MAP_START, UNIT_SIZE} from "./data.js";
import Map from "./map.js";

export default class World {
    map = new Map(LEVEL1);
    playerTank = new Tank(4 * UNIT_SIZE + MAP_START.x, 12 * UNIT_SIZE + MAP_START.y,"UP");
    enemyTanks = [];

    update(activeKeys, previousWorld) {
        this.playerTank.update(activeKeys, this.map.map, previousWorld.playerTank);
    }
};