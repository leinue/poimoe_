var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var mongoose = require('mongoose');
var request = require('request');
var lib = require('./util/index.js');


app.get('/', function(req, res){
  res.send('welcome to poimoe socket server');
});


// request.get({
//         url: 'http://api.poimoe.com/log',
//         encoding: 'utf8'
//     },
//     function(error, response, body){
//         if(response.statusCode == 200){
//             console.log(body);
//         }else{
//             console.log(response.statusCode);
//         }
//     }
// );

var chat = io.of('/chat');
var kaku = io.of('/kaku');

chat.on('connection', function(socket){

	console.log('user connected to chat socket');

	socket.on('chat message', function(msg){
		console.log('msg reveived: ' + msg);

		msg = JSON.parse(msg);

		request.post({
		        url: 'http://api.poimoe.com/kaku/room/chat/send',
		        encoding: 'utf8',
		        headers: {
		        	'Authorization': 'Basic ' + msg.accessToken 
		        },
		        form: msg
		    },
		    function(error, response, body){
		        if(!error && response.statusCode == 200){
		            console.log(body);
				    socket.emit('chat message', body);
		        }else{
		            console.log(response.statusCode);
	        	    socket.emit('chat message', {
	        	    	code: response.statusCode,
	        	    	message: response.body,
	        	    	error: error,
	        	    	headers: response.headers,
	        	    	request: response.request
	        	    });
		        }
		    }
		);
	});

});

kaku.on('connection', function(socket) {

	console.log('user connected to kaku socket');

	socket.on('kaku message', function(msg){
		console.log('msg reveived: ' + msg);
	    socket.emit('kaku message', msg);
	});

});

http.listen(9527, function(){
  console.log('poimoe socket server listening on *:9527');
});
