export default class Game {
    constructor({ world, view }) {
        this.world = world;
        this.view = view;
        this.activeKeys = new Set;
        this.lastTime = 0;

        this.gameLoop = this.gameLoop.bind(this);
    }

    async init () {
        await this.view.init(this.world);
        /*отрисовка карты*/
        document.addEventListener('keydown', ev => {
            ev.preventDefault();
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

    gameLoop(currentTime) {
        const timeDelta = currentTime - this.lastTime;
        //получить input
        //обновить world
/*        this.previousWorld = JSON.parse(JSON.stringify(this.world));*/
        this.world.update(this.activeKeys, timeDelta);
        //обновить view (отрисовка)
        this.view.update(this.world);

        this.lastTime = currentTime;

        requestAnimationFrame(this.gameLoop);
    }
};