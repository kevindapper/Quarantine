/*

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

//Creating socket
let socket = io();

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

*/
let socket = io();
let w;
let h;
let player1;
let player2;
let size;

let cnv;

function centerCanvas() {
    let x = (windowWidth - width) / 2;
    let y = (windowHeight - height + 100) / 2;
    cnv.position(x, y);
}

let coin;
let coinPos;

function setup() {
    cnv = createCanvas(600, 600);
    centerCanvas();
    background(255, 0, 200);
    h = height / 12;
    w = width / 12;
    size = w;
    createCoins();
    player1 = new Player(0, 0, size, 1);
    player2 = new Player(size * 11, size * 11, size, 2);
}

function createCoins() {

    // for (let i = 0; i < 12; i++) {
    let cx = size * floor(random(11));
    let cy = size * floor(random(11));
    coin = (new Coins(cx, cy, size));

    //coinPos = "FULL";
    print(coinPos);
    print("coint pos test:  (" + cx + ", " + cy + ")" + "   (" + cx / (size) + ", " + cy / (size) + ")");
    //  }
}

function draw() {

    background(255);
    strokeWeight(4);
    for (let i = 0; i < 20; i++) {
        line(w, 0, w, height);
        line(w * i, 0, w * i, height);
        line(0, h, width, h);
        line(0, h * i, width, h * i);

    }
    coin.update();
    if (coin.remove(player1.posX, player1.posY, coin.posX, coin.posY)) {
        print("Player1");
        createCoins();
        player1.scoreUp();
    } else if (coin.remove(player2.posX, player2.posY, coin.posX, coin.posY)) {
        print("Player2");
        createCoins();
        player2.scoreUp();
    }

    /* for (let i = 0; i < coin.length; i++) {
         let p1 = dist(player1.posX, player1.posY, coin[i].posX + coin[i].size / 2, coin[i].posY + coin[i].size / 2, );
         let p2 = dist(player2.posX, player2.posY, coin[i].posX + coin[i].size / 2, coin[i].posY + coin[i].size / 2, );
        

        
     } */
    player1.update();
    player2.update();
    player1.collide(player2);
    gameOver();

}

function gameOver() {
    if (player1.score >= 5) {
        size = 0;
        alert("Player1 Wins!");
        noLoop();
    } else if (player2.score >= 5) {
        size = 0
        alert("Player2 Wins!");
        noLoop();
    }
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
            socket.emit('user 1 movement', [0, size]);
            console.log("yeee");
            //player1.move(0, 60);
            break;
        case RIGHT_ARROW:
            socket.emit('user 1 movement', [size, 0]);
            break;
        case LEFT_ARROW:
            socket.emit('user 1 movement', [-size, 0]);
            //player1.move(-60, 0);
            break;
        case UP_ARROW:
            socket.emit('user 1 movement', [0, -size]);
            //player1.move(0, -60);
            break;
    }
}

socket.on('user 1 movement', function(data1) {
    console.log("data1 is" + data1[0]);
    console.log("data 2 is" + data1[1]);
    player1.move(data1[0], data1[1]);
})

function keyTyped() {
    switch (key) {
        case "s":
            socket.emit('user 2 movement', [0, size]);
            //player2.move(0, 60);
            break;
        case "d":
            socket.emit('user 2 movement', [size, 0]);
            //player2.move(60, 0);
            break;
        case "a":
            socket.emit('user 2 movement', [-size, 0]);
            //player2.move(-60, 0);
            break;
        case "w":
            //player2.move(0, -60);
            socket.emit('user 2 movement', [0, -size]);
            break;
    }
}

socket.on('user 2 movement', function(data1) {
    console.log("data1 is" + data1[0]);
    console.log("data 2 is" + data1[1]);
    player2.move(data1[0], data1[1]);
})

/*
function mouseClicked() {
    rect(mouseX, mouseY, 30, 30);
    // prevent default
    return false;
}*/

/* 
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

*/