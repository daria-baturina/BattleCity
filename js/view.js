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

    async init() {
        await this.sprite.load();
    }

    update(world) {
        this.clearStage();
        this.context.fillStyle = '#636363';
        this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);

        this.context.fillStyle = '#000000';
        this.context.fillRect(MAP_START.x, MAP_START.y, STAGE_SIZE, STAGE_SIZE);
        this.renderObjects(world.objects);
    }

    clearStage() {
        this.context.clearRect(MAP_START.x, MAP_START.y, STAGE_SIZE, STAGE_SIZE);
    }

    renderObjects(objects) {
        objects.forEach(obj => {
            switch (obj.type) {
                case 1:
                case 2:
                    this.context.drawImage(this.sprite.img,
                        ...BLOCKS[obj.type],
                        obj.x, obj.y, BASE_BLOCK_SIZE, BASE_BLOCK_SIZE
                    );
                    break;
                case "playerTank":
                    if (obj.direction.times % 2 === 0 && obj.moved) {
                        this.context.drawImage(this.sprite.img,
                            ...obj.sprites[DIRECTION[obj.direction.direction] * 2 + 1],
                            obj.x, obj.y, UNIT_SIZE, UNIT_SIZE
                        );
                    } else {
                        this.context.drawImage(this.sprite.img,
                            ...obj.sprites[DIRECTION[obj.direction.direction] * 2],
                            obj.x, obj.y, UNIT_SIZE, UNIT_SIZE
                        )
                    }
                    if (obj.bullet) {
                        if (obj.bullet.explosion) {
                            this.context.drawImage(this.sprite.img,
                                ...obj.bullet.explosion.sprites[(Math.floor(obj.bullet.explosion.timer / 2))],
                                obj.bullet.explosion.x, obj.bullet.explosion.y, BULLET_EXPLOSION_SIZE, BULLET_EXPLOSION_SIZE
                            )
                        } else {
                            this.context.drawImage(this.sprite.img,
                                ...obj.bullet.sprites[DIRECTION[obj.bullet.direction]],
                                obj.bullet.x, obj.bullet.y, BULLET_SIZE, BULLET_SIZE
                            )
                        }
                    }
                    break;
                case "enemyTank":
                    if (obj.direction.times % 2 === 0 && obj.moved) {
                        this.context.drawImage(this.sprite.img,
                            ...obj.sprites[DIRECTION[obj.direction.direction] * 2 + 1],
                            obj.x, obj.y, UNIT_SIZE, UNIT_SIZE
                        );
                    } else {
                        this.context.drawImage(this.sprite.img,
                            ...obj.sprites[DIRECTION[obj.direction.direction] * 2],
                            obj.x, obj.y, UNIT_SIZE, UNIT_SIZE
                        )
                    }
                    if (obj.bullet) {
                        if (obj.bullet.explosion) {
                            this.context.drawImage(this.sprite.img,
                                ...obj.bullet.explosion.sprites[(Math.floor(obj.bullet.explosion.timer / 2))],
                                obj.bullet.explosion.x, obj.bullet.explosion.y, BULLET_EXPLOSION_SIZE, BULLET_EXPLOSION_SIZE
                            )
                        } else {
                            this.context.drawImage(this.sprite.img,
                                ...obj.bullet.sprites[DIRECTION[obj.bullet.direction]],
                                obj.bullet.x, obj.bullet.y, BULLET_SIZE, BULLET_SIZE
                            )
                        }
                    }
                    break;
                case "base":
                    this.context.drawImage(this.sprite.img,
                        ...obj.sprites[0],
                        obj.x, obj.y, UNIT_SIZE, UNIT_SIZE
                    );
                    break;
                case "gameOver" :
                    this.context.fillStyle = '#636363';
                    this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
                    console.log(obj);
                    this.context.drawImage(this.sprite.img,
                        ...obj.sprite[0],
                        obj.x, obj.y, 4 * UNIT_SIZE, 2 * UNIT_SIZE
                    );
                    break;
            }
        })
    }
};