class Player {
    constructor(posX, posY, playerSize, playerNumber) {
        this.homeX = posX;
        this.homeY = posY;
        this.posX = posX;
        this.posY = posY;
        this.size = playerSize;
        this.playerNumber = playerNumber;

    }

    show() {

    }

    update() {
        fill(55, 55, 55);
        rect(this.posX, this.posY, this.size, this.size);
    }

    move(moveX, moveY) {

        this.posX += moveX;
        this.posY += moveY;
        this.posX = constrain(this.posX, 0, width - this.size);
        this.posY = constrain(this.posY, 0, height - this.size);
    }

    returnHome() {
        this.posX = this.homeX;
        this.posY = this.homeY;
    }

    collide(other) {
        var d = dist(this.posX + this.size / 2, this.posY + this.size / 2, other.posX + other.size / 2, other.posY + other.size / 2, );
        print(d + "  " + other.size + this.size);
        // now see if distance between two is less than sum of two radius'
        if (d < other.size + this.size) {
            //fill(150);
            //fill(changeColor());
            this.returnHome();
            other.returnHome();
        }
    }
}