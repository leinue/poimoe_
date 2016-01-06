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

		if(thisTagId == undefined || thisTagId == '') {
			res.send(util.retMsg(401, "缺少参数：标签id"));
		}

		var Tags = ctrlInitial.models.Tags();

		Tags.findById(thisTagId, function(err, tag) {

			if(err) {
	        	res.send(util.retMsg(401, err.toString()));
	      	}

	      	if(tag.length === 0) {
	      		res.send(util.retMsg(401, '无此标签'));
	      	}

	      	if(tag[0].isDeleted === false) {
	      		res.send(util.retMsg(401, '该标签已被删除'));
	      	}

			Tags._remove(thisTagId, function(err, tag) {

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

		var Tags = ctrlInitial.models.Tags();

		Tags.findById(thisTagId, function(err, tag) {

			if(err) {
	        	res.send(util.retMsg(401, err.toString()));
	      	}

	      	if(tag.length === 0) {
	      		res.send(util.retMsg(401, '无此标签'));
	      	}

	      	Tags.update(thisTagId, {
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

	},

	search: function(req, res, next) {

		var name = req.params.name;
		var page = req.params.page;
		var count = req.params.count;

		if(name == '' || name == undefined) {
			res.send(util.retMsg(401, '搜索内容不能为空'));
		}

		var Tags = ctrlInitial.models.Tags();

		Tags.search(name, page, count, function(err, tags) {

			if(err) {
				res.send(util.retMsg(401, err.toString()));
			}

			res.send(util.retMsg(200, tags));

		});

	},

	searchSite: function(req, res, next) {

		var val = req.params.val;
		var page = req.params.page;
		var count = req.params.count;

		if(val == '' || val == undefined) {
			res.send(util.retMsg(401, '搜索内容不能为空'));
		}

		var Tags = ctrlInitial.models.Tags();

		var Themes = ctrlInitial.models.Themes();

		Themes.search(val, page, count, function(err, theme) {

			if(err) {
				res.send(util.retMsg(400, err.toString()));
			}

			res.send(util.retMsg(200, theme));	

		});

		// Tags.searchSite(val, page, count, function(err, content) {

		// 	if(err) {
		// 		res.send(util.retMsg(401, err.toString()));
		// 	}

		// 	var Themes = ctrlInitial.models.Themes();

		// 	var themesAvailable = [];

		// 	content.forEach(function(tag, key) {

		// 		var _id = tag._id;

		// 		Themes.findAll(page, count, function(err, theme) {

		// 			if(err) {
		// 				util.send(util.retMsg(400, err.toString()));
		// 			}

		// 		});

		// 	});

		// })


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
