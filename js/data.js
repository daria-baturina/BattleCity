export const BASE_BLOCK_SIZE = 16;
export const UNIT_SIZE = 32;
export const STAGE_SIZE = 26 * BASE_BLOCK_SIZE;
export const MAP_START = {
    x: (512 - STAGE_SIZE)/2,
    y: (512 - STAGE_SIZE)/2,
}
export const MAP_END = {
    x: MAP_START.x + STAGE_SIZE,
    y: MAP_START.y + STAGE_SIZE,
}

export const LEVEL1 = [
    [, , , , , , , , , , , , , , , , , , , , , , , , , ],
    [, , , , , , , , , , , , , , , , , , , , , , , , , ],
    [, , 1, 1, , , 1, 1, , , 1, 1, , , 1, 1, , , 1, 1, , , 1, 1, , ],
    [, , 1, 1, , , 1, 1, , , 1, 1, , , 1, 1, , , 1, 1, , , 1, 1, , ],
    [, , 1, 1, , , 1, 1, , , 1, 1, , , 1, 1, , , 1, 1, , , 1, 1, , ],
    [, , 1, 1, , , 1, 1, , , 1, 1, , , 1, 1, , , 1, 1, , , 1, 1, , ],
    [, , 1, 1, , , 1, 1, , , 1, 1, 2, 2, 1, 1, , , 1, 1, , , 1, 1, , ],
    [, , 1, 1, , , 1, 1, , , 1, 1, 2, 2, 1, 1, , , 1, 1, , , 1, 1, , ],
    [, , 1, 1, , , 1, 1, , , 1, 1, , , 1, 1, , , 1, 1, , , 1, 1, , ],
    [, , 1, 1, , , 1, 1, , , , , , , , , , , 1, 1, , , 1, 1, , ],
    [, , 1, 1, , , 1, 1, , , , , , , , , , , 1, 1, , , 1, 1, , ],
    [, , , , , , , , , , 1, 1, , , 1, 1, , , , , , , , , , ],
    [, , , , , , , , , , 1, 1, , , 1, 1, , , , , , , , , , ],
    [1, 1, , , 1, 1, 1, 1, , , , , , , , , , , 1, 1, 1, 1, , , 1, 1],
    [2, 2, , , 1, 1, 1, 1, , , , , , , , , , , 1, 1, 1, 1, , , 2, 2],
    [, , , , , , , , , , 1, 1, , , 1, 1, , , , , , , , , , ],
    [, , , , , , , , , , 1, 1, 1, 1, 1, 1, , , , , , , , , , ],
    [, , 1, 1, , , 1, 1, , , 1, 1, 1, 1, 1, 1, , , 1, 1, , , 1, 1, , ],
    [, , 1, 1, , , 1, 1, , , 1, 1, , , 1, 1, , , 1, 1, , , 1, 1, , ],
    [, , 1, 1, , , 1, 1, , , 1, 1, , , 1, 1, , , 1, 1, , , 1, 1, , ],
    [, , 1, 1, , , 1, 1, , , 1, 1, , , 1, 1, , , 1, 1, , , 1, 1, , ],
    [, , 1, 1, , , 1, 1, , , , , , , , , , , 1, 1, , , 1, 1, , ],
    [, , 1, 1, , , 1, 1, , , , , , , , , , , 1, 1, , , 1, 1, , ],
    [, , 1, 1, , , 1, 1, , , , 1, 1, 1, 1, , , , 1, 1, , , 1, 1, , ],
    [, , , , , , , , , , , 1, , , 1, , , , , , , , , , , ],
    [, , , , , , , , , , , 1, , , 1, , , , , , , , , , , ]
];

export const PLAYER_TANK_SPRITES = [
    [0 * UNIT_SIZE, 0 * UNIT_SIZE, UNIT_SIZE, UNIT_SIZE],
    [1 * UNIT_SIZE, 0 * UNIT_SIZE, UNIT_SIZE, UNIT_SIZE],
    [2 * UNIT_SIZE, 0 * UNIT_SIZE, UNIT_SIZE, UNIT_SIZE],
    [3 * UNIT_SIZE, 0 * UNIT_SIZE, UNIT_SIZE, UNIT_SIZE],
    [4 * UNIT_SIZE, 0 * UNIT_SIZE, UNIT_SIZE, UNIT_SIZE],
    [5 * UNIT_SIZE, 0 * UNIT_SIZE, UNIT_SIZE, UNIT_SIZE],
    [6 * UNIT_SIZE, 0 * UNIT_SIZE, UNIT_SIZE, UNIT_SIZE],
    [7 * UNIT_SIZE, 0 * UNIT_SIZE, UNIT_SIZE, UNIT_SIZE]
];

export const DIRECTION = {
    "UP" : 0,
    "RIGHT" : 1,
    "DOWN" : 2,
    "LEFT" : 3,
};

export const BLOCKS = {
    0: [20 * BASE_BLOCK_SIZE, 18 * BASE_BLOCK_SIZE, BASE_BLOCK_SIZE, BASE_BLOCK_SIZE],
    1: [16 * BASE_BLOCK_SIZE, 11 * BASE_BLOCK_SIZE, BASE_BLOCK_SIZE, BASE_BLOCK_SIZE],
    2: [16 * BASE_BLOCK_SIZE, 14 * BASE_BLOCK_SIZE, BASE_BLOCK_SIZE, BASE_BLOCK_SIZE],
}

export const BULLET_SIZE = 8;
export const BULLET_SPRITES = [
    [16 * UNIT_SIZE, 0 * UNIT_SIZE, BULLET_SIZE, BULLET_SIZE],
    [16.5 * UNIT_SIZE, 0 * UNIT_SIZE, BULLET_SIZE, BULLET_SIZE],
    [17 * UNIT_SIZE, 0 * UNIT_SIZE, BULLET_SIZE, BULLET_SIZE],
    [17.5 * UNIT_SIZE, 0 * UNIT_SIZE, BULLET_SIZE, BULLET_SIZE]
];

export const BULLET_EXPLOSION_SIZE = UNIT_SIZE;
export const BULLET_EXPLOSION_SPRITES = [
    [16 * UNIT_SIZE, 2 * UNIT_SIZE, UNIT_SIZE, UNIT_SIZE],
    [17 * UNIT_SIZE, 2 * UNIT_SIZE, UNIT_SIZE, UNIT_SIZE],
    [18 * UNIT_SIZE, 2 * UNIT_SIZE, UNIT_SIZE, UNIT_SIZE]
];