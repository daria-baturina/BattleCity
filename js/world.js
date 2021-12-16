import Tank from "./tank.js";
import {LEVEL1, MAP_START, STAGE_SIZE, UNIT_SIZE} from "./data.js";

export default class World {
    map = [...LEVEL1];
    playerTank = new Tank(4 * UNIT_SIZE + MAP_START.x, 12 * UNIT_SIZE + MAP_START.y,"UP");
    enemyTanks = [];

    update(activeKeys, previousWorld) {
        this.playerTank.update(activeKeys, previousWorld.playerTank);
    }
};