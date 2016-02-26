var util = require('../util/index');
var crypto = require('crypto');

var index = {

  config: {
    PASSWORD_LENGTH: 16
  },

  logUser: function(req, res, next) {
  
    var ret = '';

    var User = ctrlInitial.models.User();
    var realUser = new User({
      username: 'xieyangss_',
      email: 'ivydomcdo_@gmail.com',
      password: '12345dd6_',
      sex: '男_d',
      photo: '_udnknown', 
      intro: '_fucddk',
      region: '_hdell'
    });

    ret = util.retMsg(200, server);
    res.send(ret);

  },

  auth: function(req, res, next) {

    var reqRoute = req.route.path;
    var routesNoneAuth = [
      '/themes/hot', '/tags/select/hotTags', 
      '/user/recommended', '/user/register/:email/:password', 
      '/user/login/:email/:password', '/themes/select/:tid', 
      '/user/profile/get/:uid', '/site/search/:val/:page/:count', '/timeline/message/personal/count/:uid',
      '/timeline/message/index/count/:uid', '/timeline/message/index/count/:uid',
      '/kaku/room/all/:page/:count'
    ];

    if(req.username == 'anonymous') {

      var reqRouteList = reqRoute.split('/');

      var isHasNoneAuthRoute = false;

      for (var i = routesNoneAuth.length - 1; i >= 0; i--) {
        var currRoute = routesNoneAuth[i];
        if(currRoute == reqRoute) {
          isHasNoneAuthRoute = true;
          break;
        }
      };

      if(!isHasNoneAuthRoute) {
        res.send(util.retMsg(4001, "用户未登录或无权限，请重新登录"));            
      }else {
        return next();
      }

    }else {
      var User = ctrlInitial.models.User();
      User.findByAccessToken(req.authorization.credentials, function(err, u) {

        if(err) {
          res.send(util.retMsg(400, err.toString()));
        }

        console.log(req.authorization.credentials);
        console.log(u);

        if(u.length === 0) {
          res.send(util.retMsg(4001, "access_token非法，请重新登录"));
        }

        if(u[0].tokenCreatedAt == undefined || u[0].tokenDestoriedAt == undefined) {
          res.send(util.retMsg(4001, "access_token非法或用户登录已失效，请重新登录"));
        }

        var currentTimestamp = Date.now();
        if(currentTimestamp > u[0].tokenDestoriedAt) {
          res.send(util.retMsg(4001, "access_token已过期，请重新登录"));
        }

        if(u[0].isBlocked === true) {
          res.send(util(400, "账号为：" + thisEmail + " 的用户已被锁定"));
        }

        if(u[0].isDeleted === true) {
          res.send(util(400, "账号为：" + thisEmail + " 的用户已被删除"));
        }

        global.currentUserId = u[0]._id;

        return next();

      });
    }

  },

  register: function(req, res) {

    var thisEmail = req.params.email;
    var thisPwd = req.params.password;

    if(thisEmail == undefined || thisPwd == undefined || thisEmail == '' || thisPwd == '') {
      res.send(util.retMsg(400, "邮箱或密码不能为空"));
    }

    if(util.lengthIsGreaterThan(thisPwd, 16)) {
      res.send(util.retMsg(400, "您的密码不能大于16位"));
    }

    if(!util.isEmail(thisEmail)) {
      res.send(util.retMsg(400, "请输入合法的邮箱地址"));
    }

    var User = ctrlInitial.models.User();

    User.findByEmail(thisEmail, function(err, u) {
      
      if(err) {
        res.send(util.retMsg(400, err.toString()));
      }

      if(u.length > 0) {
        res.send(util.retMsg(400, "该邮箱已被注册过"));
      }

      var thisPwd = util.sha1Pwd(thisPwd);

      var randomNumer = Math.random(0,100).toString();

      var user = new User({
        email: thisEmail,
        username: thisEmail + randomNumer,
        password: thisPwd
      });

      user.save(function(err, u) {

        if(err) {
          res.send(util.retMsg(401, err.toString()));
        }

        res.send(util.retMsg(200, '注册成功'));

      });

    });
  
  },

  login: function(req, res, next) {

    var thisEmail = req.params.email;
    var thisPwd = req.params.password;

    if(thisEmail == '' || thisEmail == undefined || thisPwd == '' || thisPwd == undefined) {
      res.send(util.retMsg(400, "用户名/邮箱或密码不能为空"));
    }

    if(util.lengthIsGreaterThan(thisPwd, 16)) {
      res.send(util.retMsg(400, "您的密码不能大于16位"));
    }

    var User = ctrlInitial.models.User();

    thisPwd = util.sha1Pwd(thisPwd);

    var _verify = function(err, u) {
      if(err) {
        res.send(util.retMsg(400, "find user error: " + err.toString()));
      }

      if(u.length === 0) {
        res.send(util.retMsg(400, "账号为：" + thisEmail + " 的用户不存在"));
      }

       if(u[0].password == thisPwd) {

        var accessToken = util.userAuth().generatorAccessToken(thisEmail);
        var atCreatedAt = Date.now();
        var atDestoried = atCreatedAt + 77760000;

        if(u[0].isBlocked === true) {
          res.send(util(400, "账号为：" + thisEmail + " 的用户已被锁定"));
        }

        if(u[0].isDeleted === true) {
          res.send(util(400, "账号为：" + thisEmail + " 的用户已被删除"));
        }

        User.updateAccessToken(thisEmail, accessToken, atCreatedAt, function(err, uUpdated) {

          if(err) {
            res.send(util.retMsg(400, "access_token error: " + err.toString()));
          }

          res.send(util.retMsg(200, "登录成功", uUpdated));

        });

      }else {
        res.send(util.retMsg(400, "登录失败，密码错误"));
      }
    };

    util.isEmail(thisEmail) === true ? User.findByEmail(thisEmail, _verify) : User.findByUsername(thisEmail, _verify); ;

  },

  logout: function(req, res, next) {

    var thisToken = req.authorization.credentials;

    if(thisToken == '' || thisToken == undefined) {
      res.send(util.retMsg(200, "缺少access_token或未登录"));      
    }

    var User = ctrlInitial.models.User();

    var _verify = function(err, u) {

      var realUser = u;

      if(realUser == null) {
        res.send(util.retMsg(200, '注销成功'));
      }

      if(realUser.tokenDestoriedAt == undefined || realUser.tokenCreatedAt == undefined) {
        res.send(util.retMsg(200, "注销成功"));
      }

      res.send(util.retMsg(200, "注销失败"));
    }

    User.rollbackAccessToken(thisToken, _verify);

  },

  findAll: function(req, res, next) {

    var page = req.params.page;
    var count = req.params.count;

    var User = ctrlInitial.models.User();

    User.findAll(page, count, function(err, u) {

      if(err) {
        res.send(util.retMsg(400, err.toString()));
      }

      res.send(util.retMsg(200, u));

    });

  },

  getFavourites: function(req, res, next) {

    var page = req.params.page;
    var count = req.params.count;
    var id = req.params.id;

    if(id == '' || id == undefined) {
      res.send(util.retMsg(400, "用户id不能为空"));
    }

    var User = ctrlInitial.models.User();

    User.findFavouritesByUid(id, page, count, function(err, f) {

      if(err) {
        res.send(util.retMsg(400, err.toString()));
      }

      if(f.length === 0) {
        res.send(util.retMsg(200, []));        
      }

      util.seekFavourited(req, res, f[0].favourites, ctrlInitial.models);

      // res.send(util.retMsg(200, f));

    });

  },

  removeFavourites: function(req, res, next) {

    var uid = req.params.uid;
    var tid = req.params.tid;

    if(uid == '' || uid == undefined) {
      res.send(util.retMsg(400, "用户id不能为空"));
    }

    if(tid == '' || tid == undefined) {
      res.send(util.retMsg(400, '主题id不能为空'));
    }

    var User = ctrlInitial.models.User();

    User.find({_id: uid}, function(err, user) {

      if(err) {
        res.send(util.retMsg(400, err.toString()));
      }

      if(user.length === 0) {
        res.send(util.retMsg(400, "无此用户"));
      }

      user = user[0];

      for (var i = 0; i < user.favourites.length; i++) {
        var curr = user.favourites[i];
        if(curr == tid) {
          user.favourites.splice(i, 1);
        }
      };

      User.removeFavouritesByUid(uid, {
        fa: user.favourites,
        faCnt: user.favouritedCount - 1
      }, function(err, f) {

        if(err) {
          res.send(util.retMsg(400, err.toString()));
        }

        var Themes = ctrlInitial.models.Themes();

        Themes.find(tid, function(err, theme) {

          if(err) {
            res.send(util.retMsg(400, err.toString()));
          }

          if(theme.length == 0) {
            res.send(util.retMsg(400, '无此主题'));
          }

          theme = theme[0];

          // var tid = theme._id;
          var cnt = theme.favouritesCount - 1;

          if(cnt < 0) {
            cnt = 0;
          }

          Themes.findOneAndUpdate({
            _id: tid,
            isDeleted: false
          }, {
            favouritesCount: cnt
          }, {
            new: true
          }, function(err, t) {

            if(err) {
              res.send(util.retMsg(400, err.toString()));
            }

            res.send(util.retMsg(200, '取消收藏成功'));

          });

        });

      });

    });

  },

  addFavourite: function(req, res, next) {

    var uid = req.params.uid;
    var tid = req.params.tid;

    if(uid == '' || uid == undefined) {
      res.send(util.retMsg(400, "用户id不能为空"));
    }

    if(tid == '' || tid == undefined) {
      res.send(util.retMsg(400, '主题id不能为空'));
    }

    var User = ctrlInitial.models.User();

    User.find({_id: uid}, function(err, user) {

      if(err) {
        res.send(util.retMsg(400, err.toString()));
      }

      if(user.length === 0) {
        res.send(util.retMsg(400, "无此用户"));
      }

      var Themes = ctrlInitial.models.Themes();

      Themes.find(tid, function(err, theme) {

        if(err) {
          res.send(util.retMsg(400, err.toString()));
        }

        if(theme.length == 0) {
          res.send(util.retMsg(400, '无此主题'));
        }

        user = user[0];

        var currentTheme = theme;

        var origin = user.favourites;

        User.isFavouritesExist(origin, tid, function(flag) {

          if(err) {
            res.send(util.retMsg(400, err.toString()));
          }

          if(flag) {
            res.send(util.retMsg(400, '请不要重复收藏'));
          }else {

            user.favourites.unshift(tid);

            User.removeFavouritesByUid(uid, {
              fa: user.favourites,
              faCnt: user.favouritedCount + 1
            }, function(err, f) {

              if(err) {
                res.send(util.retMsg(400, err.toString()));
              }

              var theme = currentTheme[0];

              // var tid = theme._id;
              var cnt = theme.favouritesCount;

              Themes.findOneAndUpdate({
                _id: tid,
                isDeleted: false
              }, {
                favouritesCount: cnt
              }, {
                new: true
              }, function(err, themeAuthor) {

                if(err) {
                  res.send(util.retMsg(400, err.toString()));
                }

                var Timeline = ctrlInitial.models.Timeline();

                Timeline.updatePersonalMessageQueue({
                  uid: themeAuthor.user_id,
                  pmq: {
                    operator: uid,
                    targetUser: themeAuthor.user_id,
                    targetTheme: tid,
                    did: 'favourite', //repost || favourite
                    createdAt: Date.now()
                  }
                }, function(err, tl) {

                  if(err) {
                    res.send('收藏成功，推送消息给作者失败');
                  }

                  res.send(util.retMsg(200, '收藏成功'));

                });

              });

            });

          }

        });

      })

    });


  },

  modifyProfile: function(req, res, next) {

    var uid = req.params.uid;
    var sex = req.params.sex;
    var photo = req.params.photo;
    var intro = req.params.intro;
    var region = req.params.region;
    var username = req.params.username;

    if (uid == '' || uid == undefined) {
      res.send(util.retMsg(401, '却少用户id'));
    }

    if (username == '' || username == undefined) {
      res.send(util.retMsg(401, '用户名不能为空'));
    }

    User = ctrlInitial.models.User();

    User.findOneAndUpdate({
      _id: uid
    }, {
      sex: sex,
      photo: photo,
      intro: intro,
      region: region,
      username: username
    }, {
      new: true
    }, function(err, user) {

      if(err) {
        res.send(util.retMsg(400, err.toString()));
      }

      res.send(util.retMsg(200, '修改成功'));

    });

  },

  countDraft: function(req, res, next) {

    var uid = req.params.uid;

    if(uid == '' || uid == undefined) {
      res.send(util.retMsg(400, '用户id不能为空'));
    }

    var Themes = ctrlInitial.models.Themes();

    Themes.count({
      user_id: uid,
      isDeleted: false
    }, function(err, count) {

      if(err) {
        res.send(util.retMsg(401, err.toString()));
      }

      res.send(util.retMsg(200, count));

    });

  },

  countFavourites: function(req, res, next) {

    var uid = req.params.uid;

    if(uid == '' || uid == undefined) {
      res.send(util.retMsg(400, '用户id不能为空'));
    }

    var User = ctrlInitial.models.User();

    User.find({
      _id: uid,
      isDeleted: false
    }).select('favourites').exec(function(err, favourites) {

      if(err) {
        res.send(util.retMsg(401, err.toString()));
      }

      favourites = favourites[0].favourites;

      var count = favourites.length;

      res.send(util.retMsg(200, count));

    });

  },

  countDeleted: function(req, res, next) {

    var uid = req.params.uid;

    if(uid == '' || uid == undefined) {
      res.send(util.retMsg(400, '用户id不能为空'));
    }

    var Themes = ctrlInitial.models.Themes();

    Themes.count({
      user_id: uid,
      isDeleted: true
    }, function(err, count) {

      if(err) {
        res.send(util.retMsg(401, err.toString()));
      }

      res.send(util.retMsg(200, count));

    });

  },

  countFollower: function(req, res, next) {

    var uid = req.params.uid;

    if(uid == '' || uid == undefined) {
      res.send(util.retMsg(400, '用户id不能为空'));
    }
  
    var Relations = ctrlInitial.models.Relations();

    Relations.find({
      user_id: uid
    }).select('follower').exec(function(err, follower) {

      if(err) {
        res.send(util.retMsg(400, err.toString()));
      }

      res.send(util.retMsg(200, follower.length));

    });

  },

  countFollowing: function(req, res, next) {

    var uid = req.params.uid;

    if(uid == '' || uid == undefined) {
      res.send(util.retMsg(401, '用户id不能为空'));
    }

    var Relations = ctrlInitial.models.Relations();

    Relations.find({
      user_id: uid
    }).select('follow').exec(function(err, follow) {

      if(err) {
        res.send(util.retMsg(400, err.toString()));
      }

      res.send(util.retMsg(200, follow.length));

    });

  },

  countFo: function(req, res, next) {

    var uid = req.params.uid;

    if(uid == '' || uid == undefined) {
      res.send(util.retMsg(401, '用户id不能为空'));
    }

    var Relations = ctrlInitial.models.Relations();

    Relations.find({
      user_id: uid
    }).select('follow follower').exec(function(err, fo) {

      if(err) {
        res.send(util.retMsg(400, err.toString()));
      }

      if(fo.length == 0) {
        res.send(util.retMsg(200, {
          following: 0,
          follower: 0
        }));
      }

      fo = fo[0];

      res.send(util.retMsg(200, {
        following: fo.follow.length,
        follower: fo.follower.length
      }));

    });

  },

  getProfileByUid: function(req, res, next) {

    var uid = req.params.uid;

    if(uid == '' || uid == undefined) {
      res.send(util.retMsg(401, '用户id不能为空'));
    }

    var User = ctrlInitial.models.User();

    User.find({
      _id: uid,
      isDeleted: false
    }).select('_id photo intro username sex region email favourites followingCount followerCount').exec(function(err, user) {

      if(err) {
        res.send(util.retMsg(401, err.toString()));
      }

      if(user.length === 0) {
        res.send(util.retMsg(401, '该用户不存在'));
      }

      user = user[0];

      var result = {};

      result.user = user;

      result.favouritesCount = user.favourites.length;

      var Themes = ctrlInitial.models.Themes();

      Themes.count({
        user_id: uid,
        isDeleted: false
      }, function(err, draftCount) {

        if(err) {
          res.send(util.retMsg(401, err.toString()));
        }

        result.draftCount = draftCount;

        Themes.count({
          user_id: uid,
          isDeleted: true
        }, function(err, deletedCount) {

          if(err) {
            res.send(util.retMsg(401, err.toString()));
          }

          result.deletedCount = deletedCount;

          if(req.username == 'anonymous') {

            res.send(util.retMsg(200, result));

          }else {

            //如果用户已登录，要返回是否和当前用户有关注或被关注关系

            User.findByAccessToken(req.authorization.credentials, function(err, currentUser) {

              if(err) {
                res.send(util.retMsg(401, err.toString()));
              }

              currentUser = currentUser[0];

              var Relations = ctrlInitial.models.Relations();

              Relations.followerHasId(currentUser._id, uid, function(err, r1, followedMe) {

                if(err) {
                  res.send(util.retMsg(401, err.toString()));
                }

                result.followedMe = followedMe;

                Relations.followHasId(currentUser._id, uid, function(err, r2, followedByMe) {

                  if(err) {
                    res.send(util.retMsg(401, err.toString()));
                  }

                  result.followedByMe = followedByMe;

                  res.send(util.retMsg(200, result));

                });

              });


            });

          }

        });

      });

    });

  },

  getRecommended: function(req, res, next) {

    var User = ctrlInitial.models.User();

    User.find({
      isDeleted: false,
      isBlocked: false
    }).sort({
      favouritedCount: -1
    }).select('_id username photo').limit(10).exec(function(err, user) {

      if(err) {
        res.send(util.retMsg(401, err.toString()));
      }

      res.send(util.retMsg(200, user));

    });

  },

  loadTimeline: function(req, res, next) {

    var page = req.params.page;
    var count = req.params.count;

    page = page || 1;
    count = count || 10;
    var skipFrom = (page * count) - count;

    var User = ctrlInitial.models.User();

    User.findByAccessToken(req.authorization.credentials, function(err, u) {

      if(err) {
        res.send(util.retMsg(401, err.toString()));
      }

      if(u.length === 0) {
        res.send(util.retMsg(401, '用户不存在'));
      }

      var Relations = ctrlInitial.models.Relations();

      Relations.getFollowingWithoutPopulate(u[0]._id, function(err, follow) {

        if(err) {
          res.send(util.retMsg(401, err.toString()));
        }

        var Themes = ctrlInitial.models.Themes();

        if(follow.length === 0) {
          follow.unshift(u[0]._id);
        }else {
          follow = follow[0].follow;

          follow.unshift(u[0]._id);
        }

        Themes.find({
          user_id: {'$in': follow},
          isDeleted: false
        }).populate({
          path: 'user_id',
          select: '-accessToken -password'
        }).populate('tag_list').populate({
          path: 'reposter',
          select: '-accessToken -password',
          match: {
            isDeleted: false
          }
        }).populate({
          path: 'repost'
        }).sort({
          createdAt: -1
        }).skip(skipFrom).limit(count).exec(function(err, timeline) {

          if(err) {
            res.send(util.retMsg(401, err.toString()));
          }

          var Timeline = ctrlInitial.models.Timeline();

          Timeline.findMessageCount(u[0]._id, function(err, mc) {

            if(err) {
              res.send(util.retMsg(401, err.toString()));
            }

            if(mc.messageCount !== 0) {

              Timeline.resetMessage(u[0]._id, function(err, cb) {

                if(err) {
                  res.send(util.retMsg(401, err.toString()));
                }

                util.seekFavourited(req, res, timeline, ctrlInitial.models);

              });

            }else {
                util.seekFavourited(req, res, timeline, ctrlInitial.models);
            }

          });

        });

      });

    });

  },

  getPublicMessageCount: function(req, res, next) {

  },

  getMessageCount: function(req, res, next) {

    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');

    res.writeHead(200, {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      "Connection": "keep-alive"
    });

    var count = 0;

    var loadMessageCount = function() {
      
      var uid = req.params.uid;

      if(uid == '' || uid == undefined) {
        res.write(util.retESMsg(401, '用户id不能为空'));
      }

      var User = ctrlInitial.models.User();

      var Timeline = ctrlInitial.models.Timeline();

      Timeline.findMessageCount(uid, function(err, tl_messageCount) {

        if(err) {
          res.write(util.retESMsg(401, err.toString()));        
        }

        if(tl_messageCount == null) {

          var tline = new Timeline({
            user_id: uid
          });

          tline.save(function(err, new_tl) {

            if(err) {
              res.write(util.retESMsg(401, err.toString()));
            }

            res.write(util.retESMsg(200, new_tl.messageCount));

          });

        }else {
          res.write(util.retESMsg(200, tl_messageCount.messageCount));
        }

      });

    };

    console.log('user start index message count comet service');

    global.currentCountInterval = setInterval(function() {
      loadMessageCount();
    }, 500);

    res.connection.on('end', function(){
      console.log('user exit index message count comet service');
      clearInterval(currentCountInterval);
    });

  },

  getLastestMessage: function(req, res, next) {
    var uid = req.params.uid;

    if(uid == '' || uid == undefined) {
      res.send(util.retMsg(401, '用户id不能为空'));
    }

    var Timeline = ctrlInitial.models.Timeline();

    Timeline.findMessage(uid, function(err, msg) {

      if(err) {
        res,send(util.retMsg(401, err.toString()));
      }

      if(msg.length === 0) {
        
        var tline = new Timeline({
          user_id: uid
        });

        tline.save(function(err, new_tl) {

          if(err) {
            res.send(util.retMsg(401, err.toString()));
          }

          res.send(util.retMsg(200, []));
        });

      }else {

        msg = msg[0];

        var messageQueue = msg.messageQueue;

        Timeline.findOneAndUpdate({
          _id: msg[0]._id
        }, {
          messageCount: 0,
          messageQueue: []
        }, {
          new: false
        }, function(err, old_tl) {

          if(err) {
           res,send(util.retMsg(401, err.toString())); 
          }

          res.send(util.retMsg(200, msg.messageQueue));

        });

      }

    });

  },

  getPersonalMessageCount: function(req, res, next) {

    res.writeHead(200, {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      "Connection": "keep-alive"
    });

    var loadPersonalMessageCount = function() {
      var uid = req.params.uid;

      if(uid == '' || uid == undefined) {
        res.write(util.retESMsg(401, '用户id不能为空'));
      }

      var Timeline = ctrlInitial.models.Timeline();

      Timeline.findPersonalMessageCount(uid, function(err, tl) {

        if(err) {
          res.write(util.retESMsg(401, err.toString()));        
        }

        if(tl == null) {

          var tline = new Timeline({
            user_id: uid
          });

          tline.save(function(err, new_tl) {

            if(err) {
              res.write(util.retESMsg(401, err.toString()));
            }

            res.write(util.retESMsg(200, new_tl.messageCount));

          });

        }else {
          res.write(util.retESMsg(200, tl.personalMessageCount));
        }

      });
    };

    console.log('user start personal message count comet service');

    global.currentPersonalCountInterval = setInterval(function() {
      loadPersonalMessageCount();
    }, 500);

    res.connection.on('end', function(){
      console.log('user exit personal message count comet service');
      clearInterval(currentPersonalCountInterval);
    });

  },

  getLastestPersonalMessage: function(req, res, next) {
    var uid = req.params.uid;
    var page = req.params.page;
    var count = req.params.count;

    if(uid == '' || uid == undefined) {
      res.send(util.retMsg(401, '用户id不能为空'));
    }

    var Timeline = ctrlInitial.models.Timeline();

    Timeline.findPersonalMessage(uid, page, count, function(err, msg) {

      if(err) {
        res,send(util.retMsg(401, err.toString()));
      }

      if(msg.length === 0) {
        
        var tline = new Timeline({
          user_id: uid
        });

        tline.save(function(err, new_tl) {

          if(err) {
            res.send(util.retMsg(401, err.toString()));
          }

          res.send(util.retMsg(200, []));
        });

      }else {

        msg = msg[0];

        Timeline.findOneAndUpdate({
          _id: msg._id
        }, {
          personalMessageCount: 0
        }, {
          new: false
        }, function(err, old_tl) {

          if(err) {
           res,send(util.retMsg(401, err.toString())); 
          }

          res.send(util.retMsg(200, msg.personalMessageQueue));

        });

      }

    });

  },

  turnOffES: function(req, res, send) {
    util.turnOffES(currentCountInterval);
    console.log('user exit index message count comet service');
    res.send(util.retMsg(200, '关闭成功'));
  }

};

var ctrlInitial = {

  models: undefined,

  init: function(model) {
    this.models = model;
    return index;
  },

  prev: function() {
    util.retUndefinedError(this.models);
  }

};

module.exports = ctrlInitial;
