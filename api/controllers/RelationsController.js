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

					      //插入成功后要再在被关注者列表中unshift关注者id

					      relations.updateFollower({
					      	user_id: following[0]._id,
					      	follower: [follower[0]._id]
					      }, function(err, fer) {

					      	if(err) {
						        res.send(util.retMsg(401, err.toString()));
					      	}

					      	//更新user表中的统计字段
					      	user.findOneAndUpdate({
					      		_id: following[0]._id,
					      		isDeleted: false,
					      		isBlocked: false
					      	}, {
					      		$inc: {
					      			followerCount: 1
					      		}
					      	}, {
					      		new: true
					      	}, function(err, a) {

					      		if(err) {
					      			res.send(util.retMsg(401, err.toString()));
					      		}

						      	user.findOneAndUpdate({
						      		_id: follower[0]._id,
						      		isDeleted: false,
						      		isBlocked: false
						      	}, {
						      		$inc: {
						      			followingCount: 1
						      		}
						      	}, {
						      		new: true
						      	}, function(err, a) {

						      		if(err) {
						      			res.send(util.retMsg(401, err.toString()));
						      		}

								    res.send(util.retMsg(200, '关注成功'));

						      	});

					      	});

					      });

					    });
					}else {
						//如果有则直接unshift
						//检查是否重复关注
				      	relations.followHasId(follower[0]._id, following[0]._id, function(err, u, exist) {

				      		if(err) {
				      			res.send(util.retMsg(401, err.toString()));
				      		}

				      		if(exist) {
				      			res.send(util.retMsg(401, '请不要重复关注'));
				      		}else {

					      		var query = {
						        	user_id: follower[0]._id
						      	};

						      	var options = {
						        	new: true
						      	};

					      		relation_follower[0].follow.unshift(following[0]._id);

						      	var update = {
						        	follow: relation_follower[0].follow
						      	};

						      	relations.findOneAndUpdate(query, update, options, function(err, new_follow) {

						      		if(err) {
					      				res.send(util.retMsg(401, err.toString()));
					      			}

					      			//插入成功后要再在被关注者列表中unshift关注者id

					      			relations.findOne({
					      				user_id: following[0]._id
					      			}).exec(function(err, new_follow) {

					      				if(new_follow == null) {
						      				var followerNew = [follower[0]._id];
						      			}else {
					      					var followerNew = new_follow.follower;
						      				followerNew.unshift(follower[0]._id);
					      				}

									    relations.updateFollower({
									      user_id: following[0]._id,
									      follower: followerNew
									    }, function(err, fer) {

									      	if(err) {
										        res.send(util.retMsg(401, err.toString()));					      		
									      	}

									      	//更新user表中的统计字段
									      	user.findOneAndUpdate({
									      		_id: following[0]._id,
									      		isDeleted: false,
									      		isBlocked: false
									      	}, {
									      		$inc: {
									      			followerCount: 1
									      		}
									      	}, {
									      		new: true
									      	}, function(err, a) {

									      		if(err) {
									      			res.send(util.retMsg(401, err.toString()));
									      		}

										      	user.findOneAndUpdate({
										      		_id: followerNew,
										      		isDeleted: false,
										      		isBlocked: false
										      	}, {
										      		$inc: {
										      			followingCount: 1
										      		}
										      	}, {
										      		new: true
										      	}, function(err, a) {

										      		if(err) {
										      			res.send(util.retMsg(401, err.toString()));
										      		}

												    res.send(util.retMsg(200, '关注成功'));

										      	});

									      	});

									    });

					      			});

						      	});

				      		}

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

		user.find({
			_id: unfollowerId,
			isDeleted: false
		}, function(err, unfollower) {
			if(err) {
				res.send(util.retMsg(401, err.toString()));
			}

			if(unfollower.length === 0) {
				res.send(util.retMsg(401, "该取消关注者ID不存在"));
			}

			if(unfollower[0].isBlocked === true) {
				res.send(util.retMsg(401, "该取消关注者已被锁定，无权操作"));
			}

			if(unfollower[0].isDeleted === true) {
				res.send(util.retMsg(401, "该取消关注者已被删除，无权操作"));
			}

			user.findById(unfollowingId, function(err, unfollowing) {
				if(err) {
					res.send(util.retMsg(401, err.toString()));
				}

				if(unfollowing.length === 0) {
					res.send(util.retMsg(401, "该被取消关注者ID不存在"));
				}

				if(unfollowing[0].isBlocked === true) {
					res.send(util.retMsg(401, "该被取消关注者已被锁定，无权操作"));
				}

				if(unfollowing[0].isDeleted === true) {
					res.send(util.retMsg(401, "该被取消关注者已被删除，无权操作"));
				}

				relations.find({
					user_id: unfollowerId
				}, function(err, unfollower_realtion) {

					if(err) {
						res.send(util.retMsg(401, err.toString()));
					}

					if(unfollower_realtion.length === 0) {
						res.send(util.retMsg(401, "此用户无任何关注的人"));
					}

					var followList = unfollower_realtion[0].follow;
					var tmpFollowList = followList;

					var flag = false;

					for (var i = 0; i < followList.length; i++) {
						var curr = followList[i];
						if(curr == unfollowingId) {
							flag = true;
					      	tmpFollowList.splice(i, 1);
						}
					};

					if(!flag) {
						res.send(util.retMsg(401, "取消关注失败"));
					}else {

						var query = {
				        	user_id: unfollowerId
				      	};

				      	var options = {
				        	new: true
				      	};

				      	var update = {
				        	follow: tmpFollowList
				      	};

				      	relations.findOneAndUpdate(query, update, options, function(err, new_follow) {

				      		if(err) {
			      				res.send(util.retMsg(401, err.toString()));
			      			}

			      			relations.findOne({
			      				user_id: unfollowingId
			      			}, function(err, unfollowingRelations) {

			      				if(err) {
			      					res.send(util.retMsg(401, err.toString()));
			      				}

			      				if(unfollowingRelations == null) {
			      					res.send(util.retMsg(200, '取消关注成功'));				      					
			      				}

			      				var unfollowingList = unfollowingRelations.follower;
			      				var tmpList = unfollowingList;

			      				var flag = false;

			      				for (var i = 0; i < unfollowingList.length; i++) {
			      					var curr = unfollowingList[i];
			      					if(curr == unfollowerId) {
			      						flag = true;
			      						tmpList.splice(i, 1);
			      					}
			      				};

			      				relations.updateFollowing({
				      				user_id: unfollowingId,
				      				unfollower: tmpList
				      			}, function(err, newunfo) {

				      				if(err) {
				      					res.send(util.retMsg(401, err.toString()));
				      				}

									user.findOneAndUpdate({
							      		_id: unfollowerId,
							      		isDeleted: false,
							      		isBlocked: false
							      	}, {
						      			followingCount: unfollower[0].followingCount - 1
							      	}, {
							      		new: true
							      	}, function(err, a) {

							      		if(err) {
							      			res.send(util.retMsg(401, err.toString()));
							      		}

							      		user.findOneAndUpdate({
								      		_id: unfollowingId,
								      		isDeleted: false,
								      		isBlocked: false
								      	}, {
							      			followerCount: unfollowing[0].followerCount - 1
								      	}, {
								      		new: true
								      	}, function(err, a) {

								      		if(err) {
								      			res.send(util.retMsg(401, err.toString()));
								      		}

										    res.send(util.retMsg(200, '取消关注成功'));

								      	});

							      	});

				      			});

			      			});

				      	});

					}

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

		/*
		.populate({
			path: 'posts',
			options: {
				limit: 3
			},
			select: '_id image',
			sort: {
				createdAt: -1
			}
		})
		*/

		user.find({
			_id: uid,
			isDeleted: false
		}).select('_id username photo followedMe followedByMe').exec(function(err, u) {

			if(err) {
				res.send(util.retMsg(401, err.toString()));
			}

			if(u.length === 0) {
				res.send(util.retMsg(401, "用户不存在"));
			}

			var Relations = ctrlInitial.models.Relations();

			Relations.findByUid(uid, page, count, function(err, r) {

				if(err) {
					res.send(util.retMsg(401, err.toString()));
				}

				if(r.length === 0) {
					res.send(util.retMsg(200, []));
				}

				var followList = r[0].follow;
				var followerList = r[0].follower;

				var folen = followList.length - 1;
				var forlen = followerList.length - 1;

				folen = folen < 0 ? 0 : folen;
				forlen = forlen < 0 ? 0 : forlen;

				var result = r[0];

				followerList = followerList.length === 0 ? [{_id: uid}] : followerList;
				followList = followList.length === 0 ? [{_id: uid}] : followList

				followerList.forEach(function(val, key) {

		            Relations.followerHasId(val._id, uid, function(err, r1, followedByMe) {

		                if(err) {
		                  res.send(util.retMsg(401, err.toString()));
		                }

		                if(result.follower.length > 0) {
			                result.follower[key].followedByMe = followedByMe;
		                  	result.follower[key].followedMe = true;
		                }

		                if(key == forlen) {

		                	followList.forEach(function(v, k) {

		                		Relations.followHasId(v.id, uid, function(err, r2, followedMe) {

				                  	if(err) {
				                    	res.send(util.retMsg(401, err.toString()));
				                  	}

				                  	if(result.follow.length > 0) {
					                  	result.follow[k].followedMe = followedMe;
					                  	result.follow[k].followedByMe = true;
				                  	}

				                  	if(k == forlen) {
					                  	res.send(util.retMsg(200, [result]));
				                  	}

				                });

		                	});

		                }

		            });

				});

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
