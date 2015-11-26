var ctrl = require('./controllers/index');
var util = require('./util/index');
var nodemailer = require('nodemailer');

module.exports = {

  mongoose: undefined,
 
  init: function(server, mongo) {
    
    ctrl.init(mongo);
    this.mongoose = mongo;

    server.pre(function(req, res, next) {
    	res.charSet('utf-8');
    	return next();
    });
  
    server.get('/log/', ctrl.userCtrl.logUser);

    server.get('/user/register/:email/:password', ctrl.userCtrl.register);

    server.get('/user/login/:email/:password', ctrl.userCtrl.login);
  
  }

};

