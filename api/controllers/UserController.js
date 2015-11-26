var util = require('../util/index');
var crypto = require('crypto');

var index = {

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

    var PASSWORD_LENGTH = 16;

    if(thisEmail == undefined || thisPwd == undefined || thisEmail == '' || thisPwd == '') {
      res.send(util.retMsg(400, "邮箱或密码不能为空"));
    }

    if(util.lengthIsGreaterThan(thisPwd, PASSWORD_LENGTH)) {
      res.send(util.retMsg(400, "您的密码不能大于16位"));
    }

    if(!util.isEmail(thisEmail)) {
      res.send(util.retMsg(400, "请输入合法的邮箱地址"));
    }


    var sha1Pwd = '';
    var sha1 = crypto.createHash('sha1');

    sha1Pwd = sha1.digest(thisPwd);

    var randomNumer = Math.random(0,100).toString();

    var User = ctrlInitial.models.User();
    var user = new User({
      email: thisEmail,
      username: thisEmail + randomNumer,
      password: sha1Pwd
    });

    user.save(function(err, u) {

      if(err) {
        res.send(util.retMsg(401, err.toString()));
      }

      res.send(util.retMsg(200, '注册成功'));

    });
  
  },

  login: function(req, res, next) {

  }

};

var ctrlInitial = {

  model: undefined,

  init: function(model) {
    this.models = model;
    return index;
  },

  prev: function() {
    util.retUndefinedError(this.models);
  }

};

module.exports = ctrlInitial;
