import World from "./world.js";
import View from "./view.js";
import Game from "./game.js";
import Sprite from "./sprite.js";
import {LEVEL1} from "./data.js";

const canvas = document.querySelector('canvas');
const sprite = new Sprite('./assets/sprite.png');

const game = new Game({
    world: new World(),
    view: new View(canvas, sprite),
    LEVEL1
});

game.init().then(() => game.start());

console.log(game);