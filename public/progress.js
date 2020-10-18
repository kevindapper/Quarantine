function load() {
    setInterval(move(), 3000);
}

function move() {
    var elem = document.getElementById("myBar");
    var width = 0;
    var id = setInterval(frame, 30);

    function frame() {
        if (width == 100) {
            width = 0;
            elem.style.width = width + '%';
            go();
        } else {
            width++;
            elem.style.width = width + '%';
        }
    }

}