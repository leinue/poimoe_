var restify = require('restify');
var socketio = require('socket.io');


var server = restify.createServer({
	name: "poimoe_socket"
});
var io = socketio.listen(server);

server.get('/', function(req, res, next) {
	res.send('welcome to poimoe socket server');
});

io.sockets.on('connection', function(socket) {
	socket.emit('news', 'hello world');

	console.log('on connection');

	socket.on('my other event', function(data) {
		console.log(data);
	})

	socket.on('disconnect', function() {
		console.log('user disconnect');
	});
});

server.listen(9527, function() {
	console.log('socket.io server listening at %s', server.url);
});
