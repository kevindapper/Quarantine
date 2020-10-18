class Coins {
    constructor(posX, posY, size) {
        this.posX = posX;
        this.posY = posY;
        this.size = size;
    }

    update() {
        fill(100, 255, 255);
        rect(this.posX, this.posY, size, size);
    }

    remove(px, py, cx, cy) {
        return (px == cx && py == cy);
    }
}