let w;
let h;
let board = [
    ['', '', '', '', '', ''],
    ['', '', '', '', '', ''],
    ['', '', '', '', '', ''],
    ['', '', '', '', '', ''],
    ['', '', '', '', '', ''],
    ['', '', '', '', '', ''],
];

let b;

let player1;
let player2;

function setup() {
    createCanvas(800, 800);
    background(255);
    h = height / 6;
    w = width / 6;
    player1 = new Player(20, 20, 1);
    player2 = new Player(700, 700, 2);
    player1.show();
    player2.show();

}

function draw() {
    background(255);
    strokeWeight(4);
    for (let i = 0; i < 7; i++) {
        line(w, 0, w, height);
        line(w * i, 0, w * i, height);
        line(0, h, width, h);
        line(0, h * i, width, h * i);
    }
    player1.update();
    player2.update();
}
let playerX;
let playerY;

function fillSpace() {
    let i = floor(mouseX / w);
    let j = floor(mouseY / h);
    playerX = i;
    playerY = j;

}


function keyPressed() {

    switch (keyCode) {
        case DOWN_ARROW:
            console.log("yeee");
            player1.move(0, 60);
            break;
        case RIGHT_ARROW:
            player1.move(60, 0);
            break;
        case LEFT_ARROW:
            player1.move(-60, 0);
            break;
        case UP_ARROW:
            player1.move(0, -60);
            break;
    }
}

function keyTyped() {
    switch (key) {
        case "s":
            console.log("yeee");
            player2.move(0, 60);
            break;
        case "d":
            player2.move(60, 0);
            break;
        case "a":
            player2.move(-60, 0);
            break;
        case "w":
            player2.move(0, -60);
            break;
    }
}



/*
function mouseClicked() {
    rect(mouseX, mouseY, 30, 30);
    // prevent default
    return false;
}*/

class Player {
    constructor(posX, posY, playerNumber) {
        this.posX = posX;
        this.posY = posY;
        this.playerNumber = playerNumber;
    }

    show() {
        fill(55, 55, 55);
        rect(this.posX, this.posY, 60, 60);
    }

    update() {

        strokeWeight(4);
        fill(55, 55, 55);
        rect(this.posX, this.posY, 60, 60);

    }

    move(moveX, moveY) {

        this.posX += moveX;
        this.posY += moveY;
        this.posX = constrain(this.posX, 0, width - 60);
        this.posY = constrain(this.posY, 0, height - 60);
    }


}