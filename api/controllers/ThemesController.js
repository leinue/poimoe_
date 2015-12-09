var util = require('../util/index');

var index = {

	add: function(req, res, next) {

		var thisTagName = req.params.name;
   	 	var thisTagDescription = req.params.description;

   	 	if(thisTagName == undefined || thisTagName == '') {
	      res.send(util.retMsg(401, "标签名不能为空"));
   	 	}

		var Themes = ctrlInitial.models.Themes();

	    var tag = new Themes({
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

		if(thisTagId == undefined || thisTagId == '') {
			res.send(util.retMsg(401, "缺少参数：标签id"));
		}

		var Themes = ctrlInitial.models.Themes();

		Themes.findById(thisTagId, function(err, tag) {

			if(err) {
	        	res.send(util.retMsg(401, err.toString()));
	      	}

	      	if(tag.length === 0) {
	      		res.send(util.retMsg(401, '无此标签'));
	      	}

	      	if(tag[0].isDeleted === false) {
	      		res.send(util.retMsg(401, '该标签已被删除'));
	      	}

			Themes._remove(thisTagId, function(err, tag) {

				if(err) {
		        	res.send(util.retMsg(401, err.toString()));
		      	}

		      	res.send(util.retMsg(200, "删除标签成功" + tag.toString()));

			});

		});

	},

	update: function(req, res, next) {

		var thisTagName = req.params.name;
		var thisTagDescription = req.params.description;
		var thisTagId = req.params.id;

		if(thisTagName == undefined || thisTagName == '') {
			res.send(util.retMsg(401, "标签名不能为空"));
		}

		if(thisTagId == undefined || thisTagId == '') {
			res.send(util.retMsg(401, "缺少参数：标签id"));
		}

		var Themes = ctrlInitial.models.Themes();

		Themes.findById(thisTagId, function(err, tag) {

			if(err) {
	        	res.send(util.retMsg(401, err.toString()));
	      	}

	      	if(tag.length === 0) {
	      		res.send(util.retMsg(401, '无此标签'));
	      	}

	      	Themes.update({
				_id: thisTagId,
				name: thisTagName,
				description: thisTagDescription
			}, function(err, tag) {

				if(err) {
		        	res.send(util.retMsg(401, err.toString()));
		      	}

		      	res.send(util.retMsg(200, tag));

			});

	     });

	},

	getAll: function(req, res, next) {

		var page = req.params.page;
		var count = req.params.count;

		var Themes = ctrlInitial.models.Themes();

		Themes.findAll(page, count, function(err, themes) {

			if(err) {
	        	res.send(util.retMsg(401, err.toString()));
	      	}

	      	res.send(util.retMsg(200, themes));

		});

	},

	getAllRemoved: function(req, res, next) {

		var page = req.params.page;
		var count = req.params.count;

		var Themes = ctrlInitial.models.Themes();

		Themes.findAllRemoved(page, count, function(err, themes) {

			if(err) {
	        	res.send(util.retMsg(401, err.toString()));
	      	}

	      	res.send(util.retMsg(200, themes));

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
