var ctrl = require('./controllers/index');
var util = require('./util/index');

module.exports = {

  mongoose: undefined,
 
  init: function(server, mongo) {
    
    ctrl.init(mongo);
    this.mongoose = mongo;
  
    server.get('/log/', ctrl.userCtrl.logUser);
  
  }

};

