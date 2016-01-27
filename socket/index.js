var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
  res.send('welcome to poimoe socket server');
});

var chat = io.of('/chat');
var kaku = io.of('/kaku');

chat.on('connection', function(socket){

	console.log('user connected to chat socket');

	// io.emit('chat message', 'hello fresh');

	socket.on('chat message', function(msg){
		console.log('msg reveived');
	    io.emit('chat message', msg);
	});

});

kaku.on('connection', function(socket) {

	console.log('user connected to kaku socket');

});

http.listen(9527, function(){
  console.log('poimoe socket server listening on *:9527');
});
