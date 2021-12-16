export default class Sprite {
    constructor(src) {
        this.src = src;
        this.img = new Image();
    }

    async load() {
        return new Promise(resolve => {
            this.img.src = this.src;
            this.img.addEventListener('load', () => resolve(this));
        });
    }
}