let socket = io();
let w;
let h;
let player1;
let player2;
let size;
var coin;
let cnv;
let coinPos;
let playerX;
let playerY;


function centerCanvas() {
    let x = (windowWidth - width) / 2;
    let y = (windowHeight - height + 100) / 2;
    cnv.position(x, y);
}

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
    socket.emit('coin spawn', size);

    socket.on('coin spawn', (cp) => {
        console.log(cp);
        coin = new Coins(cp.cx, cp.cy, cp.cs);
        coin.update();
    })

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
    player1.update();
    player2.update();
    player1.collide(player2);
    gameOver();
}

function gameOver() {

    document.getElementById("player1Score").innerHTML = player1.score;
    document.getElementById("player2Score").innerHTML = player2.score;

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

function fillSpace() {
    let i = floor(mouseX / w);
    let j = floor(mouseY / h);
    playerX = i;
    playerY = j;
}
let p1Pressed;
let p2Pressed

function go(canGo) {
    p1Pressed = false;
    p2Pressed = false
}

function keyPressed() {

    if (!p1Pressed) {
        switch (keyCode) {
            case DOWN_ARROW:
                p1Pressed = true;
                socket.emit('user 1 movement', [0, size]);
                break;
            case RIGHT_ARROW:
                p1Pressed = true;
                socket.emit('user 1 movement', [size, 0]);
                break;
            case LEFT_ARROW:
                p1Pressed = true;
                socket.emit('user 1 movement', [-size, 0]);
                break;
            case UP_ARROW:
                p1Pressed = true;
                socket.emit('user 1 movement', [0, -size]);
                break;
        }
    }
}

socket.on('user 1 movement', function(data1) {
    console.log("data1 is" + data1[0]);
    console.log("data 2 is" + data1[1]);
    player1.move(data1[0], data1[1]);
})

function keyTyped() {
    if (!p2Pressed) {
        switch (key) {
            case "s":
                p2Pressed = true;
                socket.emit('user 2 movement', [0, size]);
                break;
            case "d":
                p2Pressed = true;
                socket.emit('user 2 movement', [size, 0]);
                break;
            case "a":
                p2Pressed = true;
                socket.emit('user 2 movement', [-size, 0]);
                break;
            case "w":
                p2Pressed = true;
                socket.emit('user 2 movement', [0, -size]);
                break;
        }
    }
}

socket.on('user 2 movement', function(data1) {
    console.log("data1 is" + data1[0]);
    console.log("data 2 is" + data1[1]);
    player2.move(data1[0], data1[1]);
})