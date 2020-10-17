var x = 0;

function changeColor(position) {
    if (x == 0) {
        position.style.background = "blue";
        x = 1;
    } else if (x == 1) {
        position.style.background = "red";
        x = 0;
    }
}