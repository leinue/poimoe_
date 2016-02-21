var util = require('../util/index');

var _util = {

	enterRoom: function(kaku, singleKaku, peopleEnter, res) {

		var isPeopleHaveEntered = false;

		peopleList = singleKaku.people;

		for (var i = peopleList.length - 1; i >= 0; i--) {
			var singlePeople = peopleList[i]._id;
			if(singlePeople.toString() == peopleEnter.toString()) {
 				isPeopleHaveEntered = true;
 				break;
 			}
		};

 		if(isPeopleHaveEntered) {
 			res.send(util.retMsg(200, [singleKaku]));
 		}else {

 			peopleList.unshift(peopleEnter);

 			kaku.enter({
 				roomId: singleKaku._id,
 				peopleList: peopleList
 			}, function(err, newRoom) {
   	 			if(err) {
   	 				res.send(util.retMsg(401, err.toString()));
   	 			}

   	 			res.send(util.retMsg(200, [newRoom]));
 			});

 		}
	}

};

var index = {

	indexAll: function(req, res, next) {

		var page = req.params.page;
		var count = req.params.count;

		page = page || 1;
		count = count || 10;

	    var Kaku = ctrlInitial.models.Kaku();
	    Kaku.indexAll(page, count, function(err, all) {

	    	if(err) {
	          res.send(util.retMsg(400, err.toString()));
	    	}

	    	res.send(util.retMsg(200, all));

	    });
	},

	create: function(req, res, next) {
		var creator = req.params.creator;
		var name = req.params.name || ''; 
		var isLocked = req.params.isLocked || false;
		var passport = req.params.passport || '';
		var peopleLimit = req.params.peopleLimit || 4;//default to 4

		if(creator == undefined || creator == '') {
			res.send(util.retMsg(401, '缺少参数: 创建者id'));
		}

	 	var User = ctrlInitial.models.User();
   	 	User.findById(creator, function(err, ur) {

   	 		if(err) {
   	 			res.send(util.retMsg(401, err.toString()));
   	 		}

   	 		if(ur.length === 0) {
   	 			res.send(util.retMsg(401, "无此用户"));
   	 		}

   	 		var Kaku = ctrlInitial.models.Kaku();

   	 		var people = [];
   	 		people.unshift(creator);

   	 		var kaku = new Kaku({
   	 			creator: creator,
   	 			name: name,
   	 			isLocked: isLocked,
   	 			passport: passport,
   	 			peopleLimit: peopleLimit,
   	 			people: people
   	 		});

   	 		kaku.save(function(err, k) {
	   	 		if(err) {
	   	 			res.send(util.retMsg(401, err.toString()));
	   	 		}

	   	 		res.send(util.retMsg(200, k));

   	 		});

   	 	});
	},

	enter: function(req, res, next) {

		var peopleEnter = req.params.people;
		var roomId = req.params.roomId;
		var passport = req.params.passport || '';

		if(peopleEnter == undefined || peopleEnter == '') {
			res.send(util.retMsg(401, '缺少参数：进入者id'));
		}

		if(roomId == undefined || roomId == '') {
			res.send(util.retMsg(401, '缺少参数：所进入房间id'));
		}

		var Kaku = ctrlInitial.models.Kaku();

		Kaku.findPeopleByRoomId(roomId, function(err, singleKaku) {
   	 		if(err) {
   	 			res.send(util.retMsg(401, err.toString()));
   	 		}

   	 		var isRoomLocked = singleKaku.isLocked;

   	 		if(isRoomLocked === true) {

   	 			if(singleKaku.passport === passport) {

   	 				if(util.count(singleKaku.people) >= singleKaku.peopleLimit) {
	   	 				res.send(util.retMsg(401, '该房间已达到人数上限，无法进入'));
   	 				}else {
			   	 		_util.enterRoom(Kaku, singleKaku, peopleEnter, res);
   	 				}

   	 			}else {
   	 				res.send(util.retMsg(401, '密码验证失败'));
   	 			}

   	 		}else {
   	 			if(util.count(singleKaku.people) >= singleKaku.peopleLimit) {
	   	 			res.send(util.retMsg(401, '该房间已达到人数上限，无法进入'));
	   	 		}else {
		   	 		_util.enterRoom(Kaku, singleKaku, peopleEnter, res);	   	 			
	   	 		}
   	 		}

		});

	},

	leave: function(req, res, next) {
		var leaver = req.params.leaver;
		var roomId = req.params.roomId;

		if(leaver == undefined || leaver == '') {
			res.send(util.retMsg(401, '缺少参数：进入者id'));
		}

		if(roomId == undefined || roomId == '') {
			res.send(util.retMsg(401, '缺少参数：所进入房间id'));
		}

		var Kaku = ctrlInitial.models.Kaku();

		Kaku.findPeopleByRoomId(roomId, function(err, room) {
   	 		if(err) {
   	 			res.send(util.retMsg(401, err.toString()));
   	 		}

   	 		var isPeopleHaveEntered = false;

   	 		var peopleList = room.people;

   	 		for (var i = peopleList.length - 1; i >= 0; i--) {
   	 			var people = peopleList[i];
   	 			if(people._id == leaver) {
   	 				isPeopleHaveEntered = true;
   	 				peopleList.splice(i, 1);
   	 				break;
   	 			}
   	 		};

   	 		if(!isPeopleHaveEntered) {
   	 			res.send(util.retMsg(401, '您尚未加入该房间'));
   	 		}else {

   	 			Kaku.leave({
   	 				roomId: roomId,
   	 				peopleList: peopleList
   	 			}, function(err, newRoom) {
		   	 		if(err) {
		   	 			res.send(util.retMsg(401, err.toString()));
		   	 		}

		   	 		res.send(util.retMsg(200, newRoom));
   	 			});

   	 		}

		});

	},

	unlock: function(req, res, next) {

		var roomId = req.params.roomId;

		if(roomId == undefined || roomId == '') {
			res.send(util.retMsg(401, '缺少参数：房间id'));
		}

		var Kaku = ctrlInitial.models.Kaku();

		Kaku.unlock(roomId, function(err, newRoom) {
   	 		if(err) {
   	 			res.send(util.retMsg(401, err.toString()));
   	 		}

   	 		res.send(util.retMsg(200, '取消加密成功'));

		});

	},

	lock: function(req, res, next) {
		var roomId = req.params.roomId;
		var passport = req.params.passport || '';

		if(roomId == undefined || roomId == '') {
			res.send(util.retMsg(401, '缺少参数：房间id'));
		}

		var Kaku = ctrlInitial.models.Kaku();

		Kaku.unlock({
			room: roomId,
			passport: passport
		}, function(err, newRoom) {
   	 		if(err) {
   	 			res.send(util.retMsg(401, err.toString()));
   	 		}

   	 		res.send(util.retMsg(200, '加密成功'));

		});

	},

	remove: function(req, res, next) {
		var roomId = req.params.roomId;

		if(roomId == undefined || roomId == '') {
			res.send(util.retMsg(401, '缺少参数：房间id'));
		}

		var Kaku = ctrlInitial.models.Kaku();

		kaku.abort(roomId, function(err, newRoom) {
   	 		if(err) {
   	 			res.send(util.retMsg(401, err.toString()));
   	 		}

   	 		res.send(util.retMsg(200, '删除成功'));

		});
	},

	alterName: function(req, res, next) {
		var roomId = req.params.roomId;
		var name = req.params.name || '';

		if(roomId == undefined || roomId == '') {
			res.send(util.retMsg(401, '缺少参数：房间id'));
		}

		var Kaku = ctrlInitial.models.Kaku();

		Kaku.alterPassport({
			room: roomId,
			name: name
		}, function(err, newRoom) {
   	 		if(err) {
   	 			res.send(util.retMsg(401, err.toString()));
   	 		}

   	 		res.send(util.retMsg(200, '改名成功'));

		});	
	},

	alterPassport: function(req, res, next) {

		var roomId = req.params.roomId;
		var passport = req.params.passport || '';

		if(roomId == undefined || roomId == '') {
			res.send(util.retMsg(401, '缺少参数：房间id'));
		}

		var Kaku = ctrlInitial.models.Kaku();

		Kaku.alterPassport({
			room: roomId,
			passport: passport
		}, function(err, newRoom) {
   	 		if(err) {
   	 			res.send(util.retMsg(401, err.toString()));
   	 		}

   	 		res.send(util.retMsg(200, '更改密码成功'));

		});

	},

	alterPeopleLimit: function(req, res, next) {
		var roomId = req.params.roomId;
		var limit = req.params.limit || 4;

		if(roomId == undefined || roomId == '') {
			res.send(util.retMsg(401, '缺少参数：房间id'));
		}

		var Kaku = ctrlInitial.models.Kaku();

		Kaku.alterPeopleLimit({
			room: roomId,
			peopleLimit: limit
		}, function(err, newRoom) {
   	 		if(err) {
   	 			res.send(util.retMsg(401, err.toString()));
   	 		}

   	 		res.send(util.retMsg(200, '更改房间人数上限成功'));

		});

	},

	storeMessage: function(req, res, next) {

		var sender = req.params.sender;
		var roomToSend = req.params.roomId;
		var message = req.params.message;

		if(sender == undefined || sender == '') {
			res.send(util.retMsg(401, '缺少参数：发送消息者id'));
		}

		if(roomToSend == undefined || roomToSend == '') {
			res.send(util.retMsg(401, '缺少参数：房间id'));
		}

		var Kaku = ctrlInitial.models.Kaku();

		Kaku.storeMessage({
			room: roomToSend,
			sender: sender,
			content: message
		}, function(err, msg) {

			if(err) {
				res.send(util.retMsg(401, err.toString()));
			}
						
			res.send(util.retMsg(200, msg));

		});

	},

	getMessage: function(req, res, next) {
		var room = req.params.id;
		var page = req.params.page || 1;
		var count = req.params.count || 10;

		if(room == undefined || room == '') {
			res.send(util.retMsg(401, '缺少参数：房间id'));
		}

		var Kaku = ctrlInitial.models.Kaku();

		Kaku.getMessage(room, page, count, function(err, msg) {

			if(err) {
				res.send(util.retMsg(401, err.toString()));
			}

			res.send(util.retMsg(200, msg));			

		});

	},

	savePainting: function(req, res, next) {
		var room = req.params.roomId;
		var paint = req.params.paint;
		var paintUI = req.params.paintUI;

		if(room == undefined || room == '') {
			res.send(util.retMsg(401, '缺少参数：房间id'));
		}

		if(paint == undefined || paint == '') {
			res.send(util.retMsg(401, '缺少参数：绘画状态'));
		}

		if(paintUI == undefined || paintUI == '') {
			res.send(util.retMsg(401, '缺少参数：房间UI状态'));
		}

		var kaku = ctrlInitial.models.Kaku();

		Kaku.savePainting({
			room: room,
			paint: paint,
			paintUI: paintUI
		}, function(err, newPaintint) {

			if(err) {
				res.send(util.retMsg(401, err.toString()));
			}

			res.send(util.retMsg(200, '保存成功'));

		});
	}

};

var ctrlInitial = {

  models: undefined,

  init: function(model) {
    this.models = model;
    return index;
  }

};

module.exports = ctrlInitial;
