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

    if(req.username == 'anonymous') {

      var reqRouteList = reqRoute.split('/');

      //只有登录和注册api不需要验证权限
      if((reqRouteList[1] == 'user' && reqRouteList[2] == 'register') || (reqRouteList[1] == 'user' && reqRouteList[2] == 'login' )) {
        return next();
      }else {
        res.send(util.retMsg(401, "用户未登录或无权限"));
      }

    }else {
      var User = ctrlInitial.models.User();
      User.findByAccessToken(req.authorization.credentials, function(err, u) {

        if(err) {
          res.send(util.retMsg(400, err.toString()));
        }

        if(u.length === 0) {
          res.send(util.retMsg(401, "access_token非法"));
        }

        if(u[0].tokenCreatedAt == undefined || u[0].tokenDestoriedAt == undefined) {
          res.send(util.retMsg(401, "access_token非法或用户登录已失效"));
        }

        var currentTimestamp = Date.now();
        if(currentTimestamp > u[0].tokenDestoriedAt) {
          res.send(util.retMsg(401, "access_token已过期"));
        }

        if(u[0].isBlocked === true) {
          res.send(util(400, "账号为：" + thisEmail + " 的用户已被锁定"));
        }

        if(u[0].isDeleted === true) {
          res.send(util(400, "账号为：" + thisEmail + " 的用户已被删除"));
        }

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

      res.send(util.retMsg(200, f));

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

      User.removeFavouritesByUid(uid, user.favourites, function(err, f) {

        if(err) {
          res.send(util.retMsg(400, err.toString()));
        }

        res.send(util.retMsg(200, '取消收藏成功'));

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

        user.favourites.push(tid);

        User.removeFavouritesByUid(uid, user.favourites, function(err, f) {

          if(err) {
            res.send(util.retMsg(400, err.toString()));
          }

          res.send(util.retMsg(200, '收藏成功'));

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
