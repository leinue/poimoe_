var util = require('../util/index');

var _util = {

	generatorTagList: function(_tag_list) {

		if(_tag_list != undefined) {
	   	 	_tag_list = JSON.parse(_tag_list);

	   	 	if(typeof _tag_list.list == undefined) {
				return false;   		 		
   	 		}

   	 		_tag_list = _tag_list.list;

   	 		return _tag_list;
   	 	}

	}

};

var index = {

	add: function(req, res, next) {

		var _title = req.params.title;
   	 	var _content = req.params.content;
   	 	var _uid = req.params.uid;
   	 	var _tag_list = req.params.tag_list;
   	 	var _image = req.params.image;

   	 	if(_title == undefined || _title == '') {
	      res.send(util.retMsg(401, "文章标题不能为空"));
   	 	}

   	 	if(_uid == undefined || _uid == '') {
   	 		res.send(util.retMsg(401, "缺少参数：用户id"));
   	 	}

   	 	_tag_list = _util.generatorTagList(_tag_list);

   	 	if(!_tag_list) {
   	 		res.send(util.retMsg(401, "标签参数列表非法"));
   	 	}

   	 	var User = ctrlInitial.models.User();

   	 	User.findById(_uid, function(err, u) {

   	 		if(err) {
   	 			res.send(util.retMsg(401, err.toString()));
   	 		}

   	 		if(u.length === 0) {
   	 			res.send(util.retMsg(401, "无此用户"));
   	 		}

   	 		var Themes = ctrlInitial.models.Themes();

		    var theme = new Themes({
		    	user_id: _uid,
		    	title: _title,
		    	content: _content,
		    	tag_list: _tag_list,
		    	image: _image
		    });

		    theme.save(function(err, t) {

		      if(err) {
		        res.send(util.retMsg(401, err.toString()));
		      }

		      res.send(util.retMsg(200, t));

		    });

   	 	});

	},

	remove: function(req, res, next) {

		var thisThemeId = req.params.id;

		if(thisThemeId == undefined || thisThemeId == '') {
			res.send(util.retMsg(401, "缺少参数：主题id"));
		}

		var Themes = ctrlInitial.models.Themes();

		Themes.findById(thisThemeId, function(err, theme) {

			if(err) {
	        	res.send(util.retMsg(401, err.toString()));
	      	}

	      	if(theme.length === 0) {
	      		res.send(util.retMsg(401, '无此主题'));
	      	}

	      	if(theme[0].isDeleted === true) {
	      		res.send(util.retMsg(401, '该主题已被删除'));
	      	}

			Themes._remove(thisThemeId, function(err, theme) {

				if(err) {
		        	res.send(util.retMsg(401, err.toString()));
		      	}

		      	res.send(util.retMsg(200, "删除主题成功" + theme.toString()));

			});

		});

	},

	update: function(req, res, next) {

		var _title = req.params.title;
   	 	var _content = req.params.content;
   	 	var _uid = req.params.uid;
   	 	var _tag_list = req.params.tag_list;
   	 	var _image = req.params.image;
   	 	var id = req.params._id;

		if(_title == undefined || _title == '') {
			res.send(util.retMsg(401, "主题名不能为空"));
		}

		if(_uid == undefined || _uid == '') {
			res.send(util.retMsg(401, "缺少参数：用户id"));
		}

   	 	_tag_list = _util.generatorTagList(_tag_list);

   	 	if(!_tag_list) {
   	 		res.send(util.retMsg(401, "标签参数列表非法"));
   	 	}

   	 	var User = ctrlInitial.models.User();

   	 	User.findById(_uid, function(err, u) {

   	 		if(err) {
   	 			res.send(util.retMsg(401, err.toString()));
   	 		}

   	 		if(u.length === 0) {
   	 			res.send(util.retMsg(401, "无此用户"));
   	 		}

			var Themes = ctrlInitial.models.Themes();

			Themes.findById(id, function(err, theme) {

				if(err) {
		        	res.send(util.retMsg(401, err.toString()));
		      	}

		      	if(theme.length === 0) {
		      		res.send(util.retMsg(401, '无此主题'));
		      	}

		      	Themes.update(id, {
					title: _title,
					content: _content,
					tag_list: _tag_list,
					image: _image,
					updatedAt: Date.now()
				}, function(err, theme_new) {

					if(err) {
			        	res.send(util.retMsg(401, err.toString()));
			      	}

			      	res.send(util.retMsg(200, theme_new));

				});

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
