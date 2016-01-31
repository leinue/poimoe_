var util = require('../util/index');

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

		if(peopleEnter == undefined || peopleEnter == '') {
			res.send(util.retMsg(401, '缺少参数：进入者id'));
		}

		if(roomId == undefined || roomId == '') {
			res.send(util.retMsg(401, '缺少参数：所进入房间id'));
		}

		var Kaku = ctrlInitial.models.Kaku();

		Kaku.findPeopleByRoomId(roomId, function(err, peopleList) {
   	 		if(err) {
   	 			res.send(util.retMsg(401, err.toString()));
   	 		}

   	 		var isPeopleHaveEntered = false;

   	 		peopleList.forEach(function(index, singlePeople) {
   	 			if(singlePeople == peopleEnter) {
   	 				isPeopleHaveEntered = true;
   	 				return false;
   	 			}
   	 		});

   	 		if(isPeopleHaveEntered) {
   	 			res.send(util.retMsg(401, '请不要重复加入同一个房间'));
   	 		}else {

   	 			peopleList.unshift(peopleEnter);

   	 			kaku.enter({
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

		Kaku.findPeopleByRoomId(roomId, function(err, peopleList) {
   	 		if(err) {
   	 			res.send(util.retMsg(401, err.toString()));
   	 		}

   	 		var isPeopleHaveEntered = false;

   	 		peopleList.forEach(function(index, singlePeople) {
   	 			if(singlePeople == peopleEnter) {
   	 				peopleList.splice(index, 1);
   	 				isPeopleHaveEntered = true;
   	 				return false;
   	 			}
   	 		});

   	 		if(!isPeopleHaveEntered) {
   	 			res.send(util.retMsg(401, '您尚未加入该房间'));
   	 		}else {

   	 			kaku.enter({
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

	},

	lock: function(req, res, next) {

	},

	remove: function(req, res, next) {

	},

	alterName: function(req, res, next) {
		
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
