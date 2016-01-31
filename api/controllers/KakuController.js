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

   	 		var kaku = new Kaku({
   	 			creator: creator,
   	 			name: name,
   	 			isLocked: isLocked,
   	 			passport: passport,
   	 			peopleLimit: peopleLimit
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

	},

	leave: function(req, res, next) {

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
