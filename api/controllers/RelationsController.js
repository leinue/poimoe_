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

			});

			relations.findByUid(followerId, function(err, relation_follower) {
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
			      	relation.hasId(follower[0]._id, following[0]._id, function(err, u, exist) {

			      		if(err) {
			      			res.send(util.retMsg(401, err.toString()));
			      		}

			      		if(exist) {
			      			res.send(util.retMsg('请不要重复关注'));
			      		}

			      		var query = {
				        	user_id: follower[0]._id
				      	};

				      	var options = {
				        	new: true
				      	};

			      		follower[0].follow.push(following[0]._id);

				      	var update = {
				        	follow: follower[0].follow
				      	};

				      	this.findOneAndUpdate(query, update, options, function(err, new_follow) {

				      		if(err) {
			      				res.send(util.retMsg(401, err.toString()));
			      			}

			      			res.send(util.retMsg(200, new_follow));

				      	});

			      	});

				}

			});
		});

	},

	unfollow: function(req, res, next) {

	},

	getFollowing:  function(req, res, next) {

	},

	getFollower: function(req, res, next) {

	},

	isFollowedBy: function(req, res, next) {

	},

	isTwoWay: function(req, res, next) {

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
