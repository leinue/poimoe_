var ctrl = require('./controllers/index');
var util = require('./util/index');
var nodemailer = require('nodemailer');
var connect = require('connect');

module.exports = {

  mongoose: undefined,
 
  init: function(server, mongo) {
    
    ctrl.init(mongo);
    this.mongoose = mongo;

    server.pre(function(req, res, next) {
    	res.charSet('utf-8');
    	return next();
    });

    server.use(ctrl.userCtrl.auth);
  
    server.get('/log/', ctrl.userCtrl.logUser);

    server.get('/user/register/:email/:password', ctrl.userCtrl.register);

    server.get('/user/login/:email/:password', ctrl.userCtrl.login);

    server.get('/user/logout/', ctrl.userCtrl.logout);

    server.get('/session/:name', function(req, res, next) {
      res.send(util.retMsg(200, "您通过了验证"));
    });
  
  }

};

