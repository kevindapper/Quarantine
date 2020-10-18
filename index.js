var app = require('express')();
var express = require("express");
var http = require('http').createServer(app);
var io = require('socket.io')(http);

app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
    res.sendFile('/public/index.html', { root: '../' });
    res.sendFile('/public/css/style.css');
});

io.on('connection', (socket) => {
    console.log('a user connected');
    console.log("your id is: " + socket.id);
    let connectedPlayers = 0;
    socket.on('disconnect', () => {
        console.log('user disconnected');
        socket.removeAllListeners();
    });
    socket.on('chat message', (msg) => {
        console.log('message: ' + msg);
    });
    socket.on('user click', (data) => {
        console.log("a user clicked the button. :)");
        //io.emit('user click');
        io.sockets.emit('user click', data);
    })
    socket.on('user 1 movement', (data1, data2) => {
        console.log("user 1 has moved");
        io.sockets.emit('user 1 movement', data1, data2);
    })
    socket.on('user 2 movement', (data1, data2) => {
        console.log("user 2 has moved");
        io.sockets.emit('user 2 movement', data1, data2);
    })
    let cp;
    socket.on('coin spawn', (data) => {
        console.log("coins spawn serverside hit");
        cp = {
            cx: data * Math.floor(Math.random() * 11),
            cy: data * Math.floor(Math.random() * 11),
            cs: data,
        }

        io.sockets.emit('coin spawn', cp);
    })
    socket.on('coin update', (data) => {

        io.sockets.emit('coin update', cp);
    })

});

http.listen(3000, () => {
    console.log('listening on *:3000');
});