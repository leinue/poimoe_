var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var mongoose = require('mongoose');
var request = require('request');
var lib = require('./util/index.js');

Array.prototype.indexOfA = function(id) {
	var flag = -1;
	for (var i = 0; i < this.length; i++) {
		var people = this[i];
		if(people._id.toString() === id.toString()) {
			flag = i;
			break;
		}
	};
	return flag;
};

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

var roomInfo = {};

chat.on('connection', function(socket){

	console.log('user connected to chat socket');

	var user = '';
	var username = '';
	var roomId = '';

	socket.on('enter chatting room', function(msg) {

		console.log('enter chatting room: ');

		roomId = msg.roomId;

		request.post({
			url: 'http://api.poimoe.com/kaku/room/enter',
	        encoding: 'utf8',
	        headers: {
	        	'Authorization': 'Basic ' + msg.accessToken 
	        },
	        form: msg
		},
	    function(error, response, body){
	        if(!error && response.statusCode == 200){
	        	body = JSON.parse(body);

	        	if(body.code === 200) {

		        	if(!roomInfo[roomId]) {
						roomInfo[roomId] = [];
					}

					// console.log(body);

					var data = body.message[0] || body.message;

					var people = data.people;

					roomInfo[roomId] = people;

					user = msg.people;
					username = msg.username;
					socket.join(roomId);
					chat.to(roomId).emit('sys', msg.username + '加入了房间');
				    chat.to(roomId).emit('enter chatting room succeed', body);
	        	}else {
				    chat.emit('enter chatting room succeed', body);
	        	}

	        }else{
        	    socket.emit('enter chatting room failed', {
        	    	code: response.statusCode,
        	    	message: response.body,
        	    	error: error,
        	    	headers: response.headers,
        	    	request: response.request
        	    });
	        }
	    });

	})

	socket.on('chat message', function(msg){
		console.log('msg reveived: ');

		if(!roomInfo[roomId]) {
			roomInfo[roomId] = [];
		}

		if (roomInfo[roomId].indexOfA(user) === -1) {  
	      return false;
	    }

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
				    chat.to(roomId).emit('chat message', body);
		        }else{
		            console.log(response.statusCode);
	        	    chat.to(roomId).emit('chat message', {
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

	socket.on('start draw kaku', function(msg) {

		if(!roomInfo[roomId]) {
			roomInfo[roomId] = [];
		}

		if (roomInfo[roomId].indexOfA(user) === -1) {  
	      return false;
	    }

	    chat.to(roomId).emit('get kaku path', msg);

	});

	socket.on('new layer', function(msg) {

		if(!roomInfo[roomId]) {
			roomInfo[roomId] = [];
		}

		if (roomInfo[roomId].indexOfA(user) === -1) {  
	      return false;
	    }

	    chat.to(roomId).emit('get new layer', msg);

	});

	socket.on('modify layer', function(msg) {

		if(!roomInfo[roomId]) {
			roomInfo[roomId] = [];
		}

		if (roomInfo[roomId].indexOfA(user) === -1) {  
	      return false;
	    }

	    chat.to(roomId).emit('get modify layer', msg);

	});

	socket.on('remove layer', function(msg) {

		if(!roomInfo[roomId]) {
			roomInfo[roomId] = [];
		}

		if (roomInfo[roomId].indexOfA(user) === -1) {  
	      return false;
	    }

	    chat.to(roomId).emit('get remove layer', msg);

	});

	socket.on('hide layer', function(msg) {

		if(!roomInfo[roomId]) {
			roomInfo[roomId] = [];
		}

		if (roomInfo[roomId].indexOfA(user) === -1) {  
	      return false;
	    }

	    chat.to(roomId).emit('get hide layer', msg);

	});

	socket.on('show layer', function(msg) {
		if(!roomInfo[roomId]) {
			roomInfo[roomId] = [];
		}

		if (roomInfo[roomId].indexOfA(user) === -1) {  
	      return false;
	    }

	    chat.to(roomId).emit('get show layer', msg);		
	});

	socket.on('toggle layer', function(msg) {
		if(!roomInfo[roomId]) {
			roomInfo[roomId] = [];
		}

		if (roomInfo[roomId].indexOfA(user) === -1) {  
	      return false;
	    }

	    chat.to(roomId).emit('get toggle layer', msg);		
	});

	socket.on('clear layer', function(msg) {
		if(!roomInfo[roomId]) {
			roomInfo[roomId] = [];
		}

		if (roomInfo[roomId].indexOfA(user) === -1) {  
	      return false;
	    }

	    chat.to(roomId).emit('get clear layer', msg);		
	});

	socket.on('draw image', function(msg) {
		if(!roomInfo[roomId]) {
			roomInfo[roomId] = [];
		}

		if (roomInfo[roomId].indexOfA(user) === -1) {  
	      return false;
	    }

	    chat.to(roomId).emit('get draw image', msg);		
	});

	socket.on('save image', function(msg) {

		if(!roomInfo[roomId]) {
			roomInfo[roomId] = [];
		}

		if (roomInfo[roomId].indexOfA(user) === -1) {  
	      return false;
	    }

	    request.post({
			url: 'http://api.poimoe.com/kaku/room/save/painting',
	        encoding: 'utf8',
	        headers: {
	        	'Authorization': 'Basic ' + msg.accessToken 
	        },
	        form: msg
		},
	    function(error, response, body){
	        if(!error && response.statusCode == 200){
	        	body = JSON.parse(body);
			    chat.to(roomId).emit('get save image succeed', body);
	        }else{
        	    socket.emit('get save image failed', {
        	    	code: response.statusCode,
        	    	message: response.body,
        	    	error: error,
        	    	headers: response.headers,
        	    	request: response.request
        	    });
	        }
	    });

	});

	socket.on('leave', function(msg) {
		if(!roomInfo[roomId]) {
			roomInfo[roomId] = [];
		}

		// 从房间名单中移除
	    var index = roomInfo[roomId].indexOfA(user);
	    console.log(roomInfo);
	    console.log(index);
	    if (index === -1) {
	    	return false;
	    }

		request.post({
		        url: 'http://api.poimoe.com/kaku/room/leave',
		        encoding: 'utf8',
		        headers: {
		        	'Authorization': 'Basic ' + msg.accessToken 
		        },
		        form: msg
		    },
		    function(error, response, body){
		        if(!error && response.statusCode == 200){
	        	    roomInfo[roomId].splice(index, 1);
	        	    socket.leave(roomId);// 退出房间
		            console.log(body);
				    chat.to(roomId).emit('sys', username + '退出了房间');
				    chat.to(roomId).emit('leave room succeed', body);
		        }else{
	        	    chat.to(roomId).emit('leave room failed', {
	        	    	code: response.statusCode,
	        	    	message: response.body,
	        	    	error: error,
	        	    	headers: response.headers,
	        	    	request: response.request
	        	    });
		        }
		    }
		);	});

	socket.on('disconnect', function (msg) {
		// leaveThisRoom(msg);
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
