var ctrl = require('./controllers/index');
var util = require('./util/index');
var nodemailer = require('nodemailer');

module.exports = {

  mongoose: undefined,
 
  init: function(server, mongo) {
    
    ctrl.init(mongo);
    this.mongoose = mongo;
  
    server.get('/log/', ctrl.userCtrl.logUser);

    server.get('/user/register/:email/:passsword', ctrl.userCtrl.register);
  
  }

};

