import PlayerTank from "./playerTank.js";
import {LEVEL1, MAP_START, PLAYER_TANK_POSITION, UNIT_SIZE} from "./data.js";
import Map from "./map.js";
import EnemyTank from "./enemyTank.js";

export default class World {
    constructor() {
        this.map = new Map(LEVEL1);
        this.playerTank = new PlayerTank(...PLAYER_TANK_POSITION,"UP");
        this.enemyTanks = [];
        this.enemyTanks.push(new EnemyTank(4 * UNIT_SIZE + MAP_START.x, 1 * UNIT_SIZE + MAP_START.y,"DOWN"));
    }

    update(activeKeys, timeDelta) {
        let gameSpeed = timeDelta/16;
        this.playerTank.update(activeKeys, this.map, gameSpeed);
    }
};