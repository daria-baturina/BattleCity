/*отвечает за отрисовку*/
import {
    BASE_BLOCK_SIZE,
    BLOCKS,
    DIRECTION,
    STAGE_SIZE,
    UNIT_SIZE,
    MAP_START,
    BULLET_SIZE, BULLET_EXPLOSION_SIZE
} from "./data.js";

export default class View {
    constructor(canvas, sprite) {
        this.canvas = canvas;
        this.context = canvas.getContext('2d');
        this.sprite = sprite;
    }

    async init () {
        await this.sprite.load();
    }

    update (world) {
        this.clearStage();
        this.renderMap(world.map.map);
        this.renderPlayerTank(world.playerTank);
    }

    clearStage() {
        this.context.clearRect(MAP_START.x, MAP_START.y, STAGE_SIZE, STAGE_SIZE);
    }

    renderMap(map) {
        this.context.fillStyle = '#636363';
        this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);

        this.context.fillStyle = '#000000';
        this.context.fillRect(MAP_START.x, MAP_START.y, STAGE_SIZE, STAGE_SIZE);
        map.forEach((object) => {
            if (object.type > 0) {
            this.context.drawImage(this.sprite.img,
                ...BLOCKS[object.type],
                object.x, object.y, BASE_BLOCK_SIZE, BASE_BLOCK_SIZE
            )}
        })
    }

    renderPlayerTank(playerTank) {
        if (playerTank.direction.times % 2 === 0 && !playerTank.moved) {
            this.context.drawImage(this.sprite.img,
                ...playerTank.sprites[DIRECTION[playerTank.direction.direction] * 2 + 1],
                playerTank.x, playerTank.y, UNIT_SIZE, UNIT_SIZE
            );
        } else {
            this.context.drawImage(this.sprite.img,
                ...playerTank.sprites[DIRECTION[playerTank.direction.direction] * 2],
                playerTank.x, playerTank.y, UNIT_SIZE, UNIT_SIZE
            )
        }
        if (playerTank.bullet) {
            if (playerTank.bullet.explosion) {
                this.context.drawImage(this.sprite.img,
                    ...playerTank.bullet.explosion.sprites[(Math.floor(playerTank.bullet.explosion.timer/2))],
                    playerTank.bullet.explosion.x, playerTank.bullet.explosion.y, BULLET_EXPLOSION_SIZE, BULLET_EXPLOSION_SIZE
                )} else {
                this.context.drawImage(this.sprite.img,
                ...playerTank.bullet.sprites[DIRECTION[playerTank.bullet.direction]],
                playerTank.bullet.x, playerTank.bullet.y, BULLET_SIZE, BULLET_SIZE
            )}
        }
    }
};