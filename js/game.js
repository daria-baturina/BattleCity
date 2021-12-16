export default class Game {
    constructor({ world, view, levels}) {
        this.world = world;
        this.view = view;
        this.levels = levels;
        this.activeKeys = new Set;
        this.previousWorld = {};

        this.gameLoop = this.gameLoop.bind(this);
    }

    async init () {
        await this.view.init(this.world);
        /*отрисовка карты*/
        document.addEventListener('keydown', ev => {
            switch (ev.code) {
                case 'ArrowUp':
                case 'ArrowRight':
                case 'ArrowDown':
                case 'ArrowLeft':
                case 'Enter':
                case 'Space':
                    this.activeKeys.add(ev.code);
            }
        })
        document.addEventListener('keyup', ev => {
            switch (ev.code) {
                case 'ArrowUp':
                case 'ArrowRight':
                case 'ArrowDown':
                case 'ArrowLeft':
                case 'Enter':
                case 'Space':
                    this.activeKeys.delete(ev.code);
            }
        })
    }

    start() {
        requestAnimationFrame(this.gameLoop);
    }

    gameLoop() {
        //получить input
        //обновить world
        this.previousWorld = JSON.parse(JSON.stringify(this.world));
        this.world.update(this.activeKeys, this.previousWorld);
        //обновить view (отрисовка)
        this.view.update(this.world);
        requestAnimationFrame(this.gameLoop);
    }
};