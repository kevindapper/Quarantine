var app = require('express')();
var express = require("express");
var http = require('http').createServer(app);
var io = require('socket.io')(http);

app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
	res.sendFile('/public/index.html', {root: '../'});
	res.sendFile('/public/css/style.css');
});

io.on('connection', (socket) => {
    console.log('a user connected');
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
  });

http.listen(3000, () => {
  console.log('listening on *:3000');
});