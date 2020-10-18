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

let coinArray = [];;

function setup() {
    cnv = createCanvas(800, 800);
    centerCanvas();
    background(255, 0, 200);
    h = height / 12;
    w = width / 12;
    size = w;
    for (let i = 0; i < 10; i++) {
        //  coinArray[i] = new Coins(size * floor(random(10)), size * floor(random(10)), size);
    }
    player1 = new Player(0, 0, size, 1);
    player2 = new Player(size * 11, size * 11, size, 2);
}

function draw() {

    background(255);
    strokeWeight(4);
    for (let i = 0; i < 20; i++) {
        line(w, 0, w, height);
        line(w * i, 0, w * i, height);
        line(0, h, width, h);
        line(0, h * i, width, h * i);
        // coin[i].update();
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
            player1.move(0, size);
            break;
        case RIGHT_ARROW:
            player1.move(size, 0);
            break;
        case LEFT_ARROW:
            player1.move(-size, 0);
            break;
        case UP_ARROW:
            player1.move(0, -size);
            break;
        case BACKSPACE:
            player1.returnHome();
            player2.returnHome();
            break;
    }
}

function keyTyped() {
    switch (key) {
        case "s":
            console.log("yeee");
            player2.move(0, size);
            break;
        case "d":
            player2.move(size, 0);
            break;
        case "a":
            player2.move(-size, 0);
            break;
        case "w":
            player2.move(0, -size);
            break;
    }
}



/*
function mouseClicked() {
    rect(mouseX, mouseY, 30, 30);
    // prevent default
    return false;
}*/