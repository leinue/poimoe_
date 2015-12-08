var util = require('../util/index');

var index = {

	add: function(req, res, next) {

		var thisTagName = req.params.name;
   	 	var thisTagDescription = req.params.description;

   	 	if(thisTagName == undefined || thisTagName == '') {
	      res.send(util.retMsg(401, "标签名不能为空"));
   	 	}

		var Tags = ctrlInitial.models.Tags();

	    var tag = new Tags({
	    	name: thisTagName,
	    	description: thisTagDescription
	    });

	    tag.save(function(err, t) {

	      if(err) {
	        res.send(util.retMsg(401, err.toString()));
	      }

	      res.send(util.retMsg(200, t));

	    });

	},

	remove: function(req, res, next) {

		var thisTagId = req.params.id;

		if(thisTagId == undefined || thisTagName == '') {
			res.send(util.retMsg(401, "缺少参数：标签id"));
		}

		var Tags = ctrlInitial.models.Tags();

		Tags._remove(thisTagId, function(err, tag) {

			if(err) {
	        	res.send(util.retMsg(401, err.toString()));
	      	}

	      	res.send(util.retMsg(200, "删除标签成功"));

		});

	},

	update: function(req, res, next) {

		var thisTagName = req.params.name;
		var thisTagDescription = req.params.description;
		var thisTagId = req.params.id;

		if(thisTagName == undefined || thisTagName == '') {
			res.send(util.retMsg(401, "标签名不能为空"));
		}

		var Tags = ctrlInitial.models.Tags();

		Tags.update({
			_id: thisTagId,
			name: thisTagName,
			description: thisTagDescription
		}, function(err, tag) {

			if(err) {
	        	res.send(util.retMsg(401, err.toString()));
	      	}

	      	res.send(util.retMsg(200, tag));

		});

	},

	getAll: function(req, res, next) {

		var page = req.params.page;
		var count = req.params.count;

		var Tags = ctrlInitial.models.Tags();

		Tags.findAll(page, count, function(err, tags) {

			if(err) {
	        	res.send(util.retMsg(401, err.toString()));
	      	}

	      	res.send(util.retMsg(200, tags));

		});

	},

	getAllRemoved: function(req, res, next) {

		var page = req.params.page;
		var count = req.params.count;

		var Tags = ctrlInitial.models.Tags();

		Tags.findAllRemoved(page, count, function(err, tags) {

			if(err) {
	        	res.send(util.retMsg(401, err.toString()));
	      	}

	      	res.send(util.retMsg(200, tags));

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