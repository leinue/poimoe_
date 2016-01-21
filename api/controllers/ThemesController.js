var util = require('../util/index');

var _util = {

	generatorTagList: function(_tag_list) {

		console.log(typeof _tag_list);

		if(_tag_list != undefined) {

			if(_tag_list.length > 0) {

		   	 	_tag_list = JSON.parse(_tag_list);

		   	 	if(typeof _tag_list.list == undefined) {
					return false;   		 		
	   	 		}

	   	 		_tag_list = _tag_list.list;

	   	 		return _tag_list;

			}else {
				return true;
			}

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
	      // res.send(util.retMsg(401, "文章标题不能为空"));
	      _title = 'poimoe';
   	 	}

   	 	if(_uid == undefined || _uid == '') {
   	 		res.send(util.retMsg(401, "缺少参数：用户id"));
   	 	}

   	 	var User = ctrlInitial.models.User();

   	 	User.findById(_uid, function(err, ur) {

   	 		if(err) {
   	 			res.send(util.retMsg(401, err.toString()));
   	 		}

   	 		if(ur.length === 0) {
   	 			res.send(util.retMsg(401, "无此用户"));
   	 		}

   	 		var posts = ur[0].posts;

   	 		var Themes = ctrlInitial.models.Themes();

   	 		var TagLength = util.count(_tag_list);

   	 		if(TagLength === 0) {
			    var theme = new Themes({
			    	user_id: _uid,
			    	title: _title,
			    	content: _content,
			    	image: _image
			    });
   	 		}else {
   	 			var theme = new Themes({
			    	user_id: _uid,
			    	title: _title,
			    	content: _content,
			    	tag_list: _tag_list,
			    	image: _image
			    });
   	 		}

		    theme.save(function(err, t) {

		      if(err) {
		        res.send(util.retMsg(401, err.toString()));
		      }

		      posts.unshift(t._id);

		      User.updatePosts(ur[0]._id, posts, function(err, u) {

		      	if(err) {
		      		res.send(util.retMsg(401, err.toString()));
		      	}

				var Tags = ctrlInitial.models.Tags();

				Tags.updateCiteCount(_tag_list, true, function(err, tagNew, result) {

					if(err) {
						res.send(util.retMsg(401, err.toString()));
					}

					var Timeline = ctrlInitial.models.Timeline();

					Timeline.updateMessageQueue({
						uid: _uid,
						message: t._id
					}, function(err, tl) {

						if(err) {
							res.send(util.retMsg(401, '发布成功，推送到时间线失败'));
						}

				      	res.send(util.retMsg(200, t));

					});

				});

		      });

		    });

   	 	});

	},

	remove: function(req, res, next) {

		var thisThemeId = req.params.id;

		if(thisThemeId == undefined || thisThemeId == '') {
			res.send(util.retMsg(401, "缺少参数：主题id"));
		}

		var Themes = ctrlInitial.models.Themes();

		Themes.find({
			_id: thisThemeId,
			isDeleted: false
		}, function(err, theme) {

			if(err) {
	        	res.send(util.retMsg(401, err.toString()));
	      	}

	      	if(theme.length === 0) {
	      		res.send(util.retMsg(401, '无此主题'));
	      	}

	      	if(theme[0].isDeleted === true) {
	      		res.send(util.retMsg(401, '该主题已被删除'));
	      	}

			Themes._remove(theme[0], function(err, theme) {

				if(err) {
		        	res.send(util.retMsg(401, err.toString()));
		      	}

				var Tags = ctrlInitial.models.Tags();

				Tags.updateCiteCount(theme.tag_list, false, function(err, tagNew, result) {

					if(err) {
						res.send(util.retMsg(401, err.toString()));
					}

			      	res.send(util.retMsg(200, "删除主题成功"));

				});

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

	      	util.seekFavourited(req, res, themes);

		});

	},

	getByUid: function(req, res, next) {

		var uid = req.params.uid;
		var page = req.params.page;
		var count = req.params.count;

		if(uid == 'undefined' || uid == '') {
			res.send(util.retMsg(401, '缺少参数：用户id'));
		}

		var User = ctrlInitial.models.User();

   	 	User.findById(uid, function(err, u) {

   	 		if(err) {
   	 			res.send(util.retMsg(401, err.toString()));
   	 		}

   	 		if(u.length === 0) {
   	 			res.send(util.retMsg(401, "无此用户"));
   	 		}

			var Themes = ctrlInitial.models.Themes();

			Themes.findByUid(uid, page, count, function(err, themes) {

	   	 		if(err) {
   		 			res.send(util.retMsg(401, err.toString()));
	   	 		}

		      	util.seekFavourited(req, res, themes);

			});

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

	      	util.seekFavourited(req, res, themes);

		});

	},

	getHotThemes: function(req, res, next) {

		var Themes = ctrlInitial.models.Themes();

		Themes.getHotThemes(function(err, themes) {

			if(err) {
				res.send(util.retMsg(401, err.toString()));
			}

			res.send(util.retMsg(200, themes));

		});

	},

	selectOneTheme: function(req, res, next) {

		var tid = req.params.tid;

		if(tid =='' || tid == undefined) {
			res.send(util.retMsg(401, '主题id不能为空'));
		}

		var Themes = ctrlInitial.models.Themes();

		Themes.find({
			isDeleted: false,
			_id: tid
		}).populate('user_id').populate('tag_list').exec(function(err, theme) {

			if(err) {
				res.send(util.retMsg(401, err.toString()));
			}

	      	util.seekFavourited(req, res, theme);

  	      	// res.send(util.retMsg(200, theme));

		});

	},

	repostTheme: function(req, res, next) {

		var tid = req.params.tid;
		var uid = req.params.uid;

		if(tid == '' || tid == undefined) {
			res.send(util.retMsg(401, '主题id不能为空'));
		}

		if(uid == '' || uid == undefined) {
			res.send(util.retMsg(401, '缺少参数：用户id'));
		}

		var Themes = ctrlInitial.models.Themes();

		Themes.find({
			isDeleted: false,
			_id: tid
		}, function(err, theme) {

			if(err) {
				res.send(util.retMsg(401, err.toString()));
			}

			if(theme.length === 0) {
				res.send(util.retMsg(401, '无此主题'));
			}

			var User = ctrlInitial.models.User();

			User.find({
				_id: uid,
				isDeleted: false,
				isBlocked: false
			}).exec(function(err, user) {

				if(err) {
					res.send(util.retMsg(401, err.toString()));
				}				

				if(user.length === 0) {
					res.send(util.retMsg(401, '该用户不存在或已被锁定'));
				}

				var themeReposted = theme[0];

				var repost = new Themes({
			    	user_id: uid,
			    	repost: tid,
			    	isRepost: true,
			    	tag_list: themeReposted.tag_list,
					image: themeReposted.image,
					reposterName: user[0].username
			    });

			    repost.save(function(err, re) {

					if(err) {
						res.send(util.retMsg(401, err.toString()));
					}				

					themeReposted.reposter.unshift(uid);

					Themes.update(tid, {
						repostCount: themeReposted.repostCount + 1,
						reposter: themeReposted.reposter
					}, function(err, theme_new) {

						if(err) {
				        	res.send(util.retMsg(401, err.toString()));
				      	}

				      	var Timeline = ctrlInitial.models.Timeline();

						Timeline.updateMessageQueue({
							uid: _uid,
							message: t._id
						}, function(err, tl) {

							if(err) {
								res.send('转发成功，推送到时间线失败');
							}

					      	res.send(util.retMsg(200, t));

						});

				      	res.send(util.retMsg(200, theme_new));

					});

			    });

			});

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
