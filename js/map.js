import {BASE_BLOCK_SIZE, MAP_START} from "./data.js";

export default class Map {
    constructor(level) {
        this.map = [];
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
    }
}