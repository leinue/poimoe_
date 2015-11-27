var util = require('../util/index');
var crypto = require('crypto');

var index = {

  config: {
    PASSWORD_LENGTH: 16
  },

  logUser: function(req, res, next) {
  
    //ctrlInitial.prev();

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

    realUser.save(function(err,user) {
      
      if(err) {
        ret = util.retMsg(500, err.toString());
        res.send(ret);
      }

      ret = util.retMsg(200, user);
      res.send(ret);

    });

  },

  auth: function(req, res, next) {

    var reqRoute = req.route.path;

    if(req.username == 'anonymous') {

      var reqRouteList = reqRoute.split('/');

      //只有登录和注册api不需要验证权限
      if((reqRouteList[1] == 'user' && reqRouteList[2] == 'register') || (reqRouteList[1] == 'user' && reqRouteList[2] == 'login' )) {
        return next();
      }else {
        res.send(util.retMsg(401, "用户无权限"));
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

    });

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
