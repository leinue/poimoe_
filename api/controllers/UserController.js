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
        res.send(util.retMsg(400, err.toString()));
      }

      if(u.length === 0) {
        res.send(util.retMsg(400, "账号为：" + thisEmail + " 的用户不存在"));
      }

       if(u[0].password == thisPwd) {
        u[o].oauth = {
          access_token: ''
        };
        res.send(util.retMsg(200, "登录成功", u[0]));
      }else {
        res.send(util.retMsg(400, "登录失败，密码错误"));
      }
    };

    util.isEmail(thisEmail) === true ? User.findByEmail(thisEmail, _verify) : User.findByUsername(thisEmail, _verify); ;

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
