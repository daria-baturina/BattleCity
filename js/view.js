/*отвечает за отрисовку*/
import {BASE_BLOCK_SIZE, BLOCKS, DIRECTION, PLAYER_TANK_SPRITES, STAGE_SIZE, UNIT_SIZE, MAP_START} from "./data.js";

export default class View {
    constructor(canvas, sprite) {
        this.canvas = canvas;
        this.contex = canvas.getContext('2d');
        this.sprite = sprite;
    }

    async init () {
        await this.sprite.load();
    }

    update (world, previousWorld) {
        /*отрисовка уровня*/
        this.clearStage();
        this.renderMap(world.map);
        this.renderPlayerTank(world.playerTank);
    }

    clearStage() {
        this.contex.clearRect(MAP_START.x, MAP_START.y, STAGE_SIZE, STAGE_SIZE);
    }

    renderMap(map) {
        map.forEach((row, rowIndex) => {
            row.forEach((block, blockIndex) => {
                this.contex.drawImage(this.sprite.img,
                    ...BLOCKS[block],
                    MAP_START.x + blockIndex * BASE_BLOCK_SIZE, MAP_START.y + rowIndex * BASE_BLOCK_SIZE, BASE_BLOCK_SIZE, BASE_BLOCK_SIZE
                )})
            })
        }

    renderPlayerTank(playerTank) {
        console.log(playerTank);
        if (playerTank.direction.times % 2 === 0) {
            this.contex.drawImage(this.sprite.img,
                ...PLAYER_TANK_SPRITES[DIRECTION[playerTank.direction.direction] * 2 + 1],
                playerTank.x, playerTank.y, UNIT_SIZE, UNIT_SIZE
            );
        } else {
            this.contex.drawImage(this.sprite.img,
                ...PLAYER_TANK_SPRITES[DIRECTION[playerTank.direction.direction] * 2],
                playerTank.x, playerTank.y, UNIT_SIZE, UNIT_SIZE
            )
        }
    }
};