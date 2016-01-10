var util = require('../util/index');

var index = {

	follow: function(req, res, next) {

		var followerId = req.params.followerId;
		var followingId = req.params.followingId;

		if(followingId == undefined || followerId == undefined || followingId == '' || followerId == '') {
			res.send(util.retMsg(401, '缺少id参数'));
		}

		if(followingId == followerId) {
			res.send(util.retMsg(401, "关注者ID和被关注者ID不可重复"));
		}

		var relations = ctrlInitial.models.Relations();
		var user = ctrlInitial.models.User();

		user.findById(followerId, function(err, follower) {
			if(err) {
				res.send(util.retMsg(401, err.toString()));
			}

			if(follower.length === 0) {
				res.send(util.retMsg(401, "该关注者ID不存在"));
			}

			if(follower[0].isBlocked === true) {
				res.send(util.retMsg(401, "该关注者已被锁定，无权操作"));
			}

			if(follower[0].isDeleted === true) {
				res.send(util.retMsg(401, "该关注者已被删除，无权操作"));
			}

			user.findById(followingId, function(err, following) {
				if(err) {
					res.send(util.retMsg(401, err.toString()));
				}

				if(following.length === 0) {
					res.send(util.retMsg(401, "该被关注者ID不存在"));
				}

				if(following[0].isBlocked === true) {
					res.send(util.retMsg(401, "该被关注者已被锁定，无权操作"));
				}

				if(following[0].isDeleted === true) {
					res.send(util.retMsg(401, "该被关注者已被删除，无权操作"));
				}

				relations.find({
					user_id: followerId
				}, function(err, relation_follower) {
					if(err) {
						res.send(util.retMsg(401, err.toString()));
					}

					if(relation_follower.length === 0) {
						//如果用户在relations里没有记录则先插入
						var relation = new relations({
							user_id: follower[0]._id,
							follow: [following[0]._id]
					    });

					    relation.save(function(err, r) {

					      if(err) {
					        res.send(util.retMsg(401, err.toString()));
					      }

					      res.send(util.retMsg(200, r));

					    });
					}else {
						//如果有则直接push
						//检查是否重复关注

				      	relations.hasId(follower[0]._id, following[0]._id, function(err, u, exist) {

				      		if(err) {
				      			res.send(util.retMsg(401, err.toString()));
				      		}

				      		if(exist) {
				      			res.send(util.retMsg(401, '请不要重复关注'));
				      		}

				      		var query = {
					        	user_id: follower[0]._id
					      	};

					      	var options = {
					        	new: true
					      	};

				      		relation_follower[0].follow.push(following[0]._id);

					      	var update = {
					        	follow: relation_follower[0].follow
					      	};

					      	relations.findOneAndUpdate(query, update, options, function(err, new_follow) {

					      		if(err) {
				      				res.send(util.retMsg(401, err.toString()));
				      			}

				      			res.send(util.retMsg(200, new_follow));

					      	});

				      	});

					}

				});

			});

		});

	},

	unfollow: function(req, res, next) {

		var unfollowerId = req.params.unfollowerId;
		var unfollowingId = req.params.unfollowingId;

		if(unfollowerId == undefined || unfollowerId == '') {
			res.send(util.retMsg(401, "缺少参数：取消关注者id"));
		}

		if(unfollowingId == undefined || unfollowingId == '') {
			res.send(util.retMsg(401, "缺少参数：被取消关注者id"));
		}

		var relations = ctrlInitial.models.Relations();
		var user = ctrlInitial.models.User();

		user.findById(unfollowerId, function(err, unfollower) {
			if(err) {
				res.send(util.retMsg(401, err.toString()));
			}

			if(unfollower.length === 0) {
				res.send(util.retMsg(401, "该关注者ID不存在"));
			}

			if(unfollower[0].isBlocked === true) {
				res.send(util.retMsg(401, "该关注者已被锁定，无权操作"));
			}

			if(unfollower[0].isDeleted === true) {
				res.send(util.retMsg(401, "该关注者已被删除，无权操作"));
			}

			user.findById(unfollowingId, function(err, unfollowing) {
				if(err) {
					res.send(util.retMsg(401, err.toString()));
				}

				if(unfollowing.length === 0) {
					res.send(util.retMsg(401, "该被关注者ID不存在"));
				}

				if(unfollowing[0].isBlocked === true) {
					res.send(util.retMsg(401, "该被关注者已被锁定，无权操作"));
				}

				if(unfollowing[0].isDeleted === true) {
					res.send(util.retMsg(401, "该被关注者已被删除，无权操作"));
				}

				relations.findById(unfollowerId, function(err, unfollower_realtion) {

					if(err) {
						res.send(util.retMsg(401, err.toString()));
					}

					if(unfollower_realtion.length === 0) {
						res.send(util.retMsg(401, "此用户无任何关注的人"));
					}

					var followList = unfollower_realtion[0].follow;

					var flag = false;

					for (var i = 0; i < followList.length; i++) {
						var curr = followList[i];

						if(curr === unfollowingId) {
							delete followList[i];
							flag = true;
							break;
						}

					};

					if(!flag) {
						res.send(util.retMsg(401, "无此被关注的人"));
					}

					var query = {
			        	user_id: unfollowerId
			      	};

			      	var options = {
			        	new: true
			      	};

			      	var update = {
			        	follow: followList
			      	};

			      	relations.findOneAndUpdate(query, update, options, function(err, new_follow) {

			      		if(err) {
		      				res.send(util.retMsg(401, err.toString()));
		      			}

		      			res.send(util.retMsg(200, new_follow));

			      	});

				});

			});
		});

	},

	getFollow:  function(req, res, next) {

		var uid = req.params.uid;
		var page = req.params.page;
		var count = req.params.count;

		if(uid == undefined || uid == '') {
			res.send(util.retMsg(401, "缺少参数：用户id"));
		}

		var user = ctrlInitial.models.User();

		user.findById(uid, function(err, u) {

			if(err) {
				res.send(util.retMsg(401, err.toString()));
			}

			if(u.length === 0) {
				res.send(util.retMsg(401, "用户不存在"));
			}

			var relations = ctrlInitial.models.Relations();

			relations.findByUid(uid, page, count, function(err, r) {

				if(err) {
					res.send(util.retMsg(401, err.toString()));
				}

				res.send(util.retMsg(200, r));

			});

		});

	},

	isTwoWay: function(req, res, next) {

		var id1 = req.params.id1;
		var id2 = req.params.id2;

		if(id1 == undefined || id1 == '') {
			res.send(util.retMsg(401, "缺少参数：对比id"));
		}

		if(id2 == undefined || id2 == '') {
			res.send(util.retMsg(401, "缺少参数：对比id"));
		}

		var id1HasId2 = false;
		var id2HasId1 = false;

		var user = ctrlInitial.models.User();

		user.findById(id1, function(err, u1) {

			if(err) {
				res.send(util.retMsg(401, err.toString()));
			}

			if(u1.length === 0) {
				res.send(util.retMsg(401, "用户不存在"));
			}

			var followList = u1[0].follow;

			for (var i = 0; i < followList.length; i++) {
				var curr = followList[i];

				if(curr == id1) {
					id1HasId2 = true;
					break;
				}
			};

			user.findById(id2, function(err, u2) {

				if(err) {
					res.send(util.retMsg(401, err.toString()));
				}

				if(u2.length === 0) {
					res.send(util.retMsg(401, "用户不存在"));
				}

				var followList = u2[0].follow;

				for (var i = 0; i < followList.length; i++) {
					var curr = followList[i];

					if(curr == id1) {
						id1HasId2 = true;
						break;
					}
				};

				res.send(util.retMsg(200, id1HasId2 && id2HasId1));

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
