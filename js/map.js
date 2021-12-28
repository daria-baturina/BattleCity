import {BASE_BLOCK_SIZE, MAP_START, STAGE_SIZE} from "./data.js";

export default class Map {
    constructor(level) {
        this.map = [];
        this.toObjects(level);
    }

    update(...collisions) {
        collisions.splice(collisions.indexOf(false), 1);
        collisions.forEach(collision => {
            collision.forEach(objectOfCollision => {
                if (objectOfCollision.type === 1) {
                    const index = this.map.findIndex(object => object.x === objectOfCollision.x && object.y === objectOfCollision.y);
                    this.map.splice(index,1);
                }
            });
        })
    }


    toObjects(level) {
        level.forEach((row, rowIndex) => {
            row.forEach((block, blockIndex) => {
                const type = block;
                if (type) {
                    this.map.push(
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
            this.map.push({
                type: -1,
                x: x,
                y: y,
            });
            this.map.push({
                type: -1,
                x: x,
                y: y + STAGE_SIZE + BASE_BLOCK_SIZE,
            })
            x += BASE_BLOCK_SIZE;
        }
        x -= BASE_BLOCK_SIZE;
        y += BASE_BLOCK_SIZE;
        for (; y < MAP_START.y + STAGE_SIZE; y += BASE_BLOCK_SIZE) {
            this.map.push({
                type: -1,
                x: x,
                y: y,
            });
            this.map.push({
                type: -1,
                x: x - STAGE_SIZE - BASE_BLOCK_SIZE,
                y: y,
            })
        }
    }
}