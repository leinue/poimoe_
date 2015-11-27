var ctrl = require('./controllers/index');
var util = require('./util/index');
var nodemailer = require('nodemailer');
var connect = require('connect');

module.exports = {

  mongoose: undefined,
 
  init: function(server, mongo) {
    
    ctrl.init(mongo);
    this.mongoose = mongo;

    // connect()
    //   .use(connect.cookieParser())
    //   .use(connect.session({ secret: 'poimoe_session_secret', cookie: { maxAge: 60*60*24*1000}}));

    server.pre(function(req, res, next) {
    	res.charSet('utf-8');

      console.log('*****================*');

      res.send(res.toString());
      console.log(req.authorization);

    	return next();
    });
  
    server.get('/log/', ctrl.userCtrl.logUser);

    server.get('/user/register/:email/:password', ctrl.userCtrl.register);

    server.get('/user/login/:email/:password', ctrl.userCtrl.login);

    server.get('/session/:name', function(req, res, next) {

      console.log('==============');

      console.log(req.params);
      console.log(res.header('x-poimoe'));
      console.log(res.header('Content-Length'));

      console.log(req.authorization);

      console.log('*****==============*****');

    });
  
  }

};

