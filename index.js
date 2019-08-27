var express = require('express');
var socket = require('socket.io');

var app = express();
var server = app.listen(8002, function(){
    console.log('Port Start');
});

app.use(express.static('public'));

var io = socket(server);
io.on('connection', (socket) => {

    console.log('socket connect', socket.id);

    socket.on('chat', function(data){
        // console.log(data);
        io.sockets.emit('chat', data);
    });

    socket.on('typing', function(data){
        socket.broadcast.emit('typing', data);
    });

});
