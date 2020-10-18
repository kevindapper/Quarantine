let socket = io();
let w;
let h;
let player1;
let player2;
let size;

var cnv;

function centerCanvas() {
    var x = (windowWidth - width) / 2;
    var y = (windowHeight - height + 100) / 2;
    cnv.position(x, y);
}

let coin;

function setup() {
    cnv = createCanvas(800, 800);
    centerCanvas();
    background(255, 0, 200);
    h = height / 12;
    w = width / 12;
    size = w;
    for (let i = 0; i < 10; i++) {
        coinArray.push(new Coins(size * floor(random(10)), size * floor(random(10)), size));
    }
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
    createCoins();
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
        player1.playerScore();
        createCoins();
    } else if (coin.remove(player2.posX, player2.posY, coin.posX, coin.posY)) {
        print("Player2");
        player2.playerScore();
        createCoins();
    }
    player1.update();
    player2.update();
    player1.collide(player2);
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