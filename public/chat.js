// Make connection
var socket = io.connect('http://localhost:8002');

var message = document.getElementById('message');
var user = document.getElementById('user');
var btn = document.getElementById('send');
var output = document.getElementById('output');
var type = document.getElementById('type');

btn.addEventListener('click', function () {
    socket.emit('chat', {
        message: message.value,
        user: user.value
    });
    message.value = "";
});

message.addEventListener('keypress', function () {
    socket.emit('typing', user.value);
})

// Listen for events
socket.on('chat', function (data) {
    type.innerHTML = '';
    output.innerHTML += '<p><strong>' + data.user + ': </strong>' + data.message + '</p>';
});

socket.on('typing', function (data) {
    type.innerHTML = '<p><em>' + data + ' is typing a message...</em></p>';
});
