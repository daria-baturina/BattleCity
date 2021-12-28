import PlayerTank from "./playerTank.js";
import {
    BASE_BLOCK_SIZE, BASE_POSITION, BULLET_SIZE,
    ENEMY_TANK_START_POSITIONS, GAME_OVER_SPRITE,
    MAP_START,
    PLAYER_TANK_POSITION, STAGE_SIZE, UNIT_SIZE,
} from "./data.js";
import EnemyTank from "./enemyTank.js";
import Base from "./base.js";

export default class World {

    static createMapObjects(level) {
        let mapObjects = [];
        level.forEach((row, rowIndex) => {
            row.forEach((block, blockIndex) => {
                const type = block;
                if (type) {
                    mapObjects.push(
                        {
                            type: type,
                            x: MAP_START.x + blockIndex * BASE_BLOCK_SIZE,
                            y: MAP_START.y + rowIndex * BASE_BLOCK_SIZE,
                        }
                    )
                }
            })
        })
        let x = MAP_START.x - BASE_BLOCK_SIZE;
        let y = MAP_START.y - BASE_BLOCK_SIZE;
        for (; x <= MAP_START.x + STAGE_SIZE;) {
            mapObjects.push({
                type: -1,
                x: x,
                y: y,
            });
            mapObjects.push({
                type: -1,
                x: x,
                y: y + STAGE_SIZE + BASE_BLOCK_SIZE,
            })
            x += BASE_BLOCK_SIZE;
        }
        x -= BASE_BLOCK_SIZE;
        y += BASE_BLOCK_SIZE;
        for (; y < MAP_START.y + STAGE_SIZE; y += BASE_BLOCK_SIZE) {
            mapObjects.push({
                type: -1,
                x: x,
                y: y,
            });
            mapObjects.push({
                type: -1,
                x: x - STAGE_SIZE - BASE_BLOCK_SIZE,
                y: y,
            })
        }
        return mapObjects;
    }

    constructor(level) {
        this.map = World.createMapObjects(level);
        this.base = new Base(...BASE_POSITION);
        this.playerTank = new PlayerTank(...PLAYER_TANK_POSITION,"UP");
        this.enemyTanks = [];
        this.enemyTanks.push(new EnemyTank(...ENEMY_TANK_START_POSITIONS[0],"DOWN"));
        this.enemyTankCount = 1;
        this.enemyTankTimer = 0;

        this.objects = new Set([
            ...this.enemyTanks,
            this.playerTank,
            this.base,
            ...this.map
        ]);
    }

    update(activeKeys, timeDelta) {
        let gameSpeed = timeDelta/16;
        this.playerTank.update(activeKeys, this, gameSpeed);
        this.enemyTanks.forEach(el => el.update(this, gameSpeed, timeDelta));
        this.shouldAddEnemyTank(timeDelta);
    }

    haveCollision(a, b) {
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
        return (a.x + getSize(a) > b.x &&
            b.x + getSize(b) > a.x &&
            a.y + getSize(a) > b.y &&
            b.y + getSize(b) > a.y)
    }

    shouldAddEnemyTank(timeDelta) {
        if (this.enemyTankTimer > 10000 && this.enemyTankCount < 4) {
            let makeRandom = () => {
                const random = Math.floor(Math.random() * 3);
                if (this.checkEnemyTankPosition(random) === 0) {
                    this.enemyTanks.push(new EnemyTank(...ENEMY_TANK_START_POSITIONS[random], "DOWN"));
                    this.objects.add(this.enemyTanks[this.enemyTanks.length - 1]);
                    this.enemyTankCount += 1;
                    this.enemyTankTimer = 0;
                } else {
                    makeRandom();
                }
            }
            makeRandom();
        } else {
            this.enemyTankTimer += timeDelta;
        }
    }

    checkEnemyTankPosition(random) {
        let tankObj = {
            type: "enemyTank",
            x: ENEMY_TANK_START_POSITIONS[random][0],
            y: ENEMY_TANK_START_POSITIONS[random][1],
        }
        let result = 0;
        this.objects.forEach(obj => {
            if(this.haveCollision(obj, tankObj)) {
                result +=1
            }
        })
        return result;
    }

    updateObjects(collisions) {
        collisions.forEach(obj => {
            switch (obj.type) {
                case 1:
                    this.objects.delete(obj);
                    break;
                case "playerTank":
                    this.gameOver();
                    break;
                case "enemyTank":
                    this.objects.delete(obj);
                    this.enemyTanks.splice(this.enemyTanks.findIndex(item => item === obj),1);
                    this.enemyTankCount -= 1;
                    this.enemyTankTimer = 0;
                    break;
                case "base":
                    this.gameOver();
                    break;
            }
        })
    }

    gameOver() {
        this.objects.clear();
        this.objects.add({
            type: "gameOver",
            x: (512 - 4 * UNIT_SIZE)/2,
            y: (512 - 2 * UNIT_SIZE)/2,
            sprite: GAME_OVER_SPRITE,
        })
    }
};