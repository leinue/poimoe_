
var user = require('./user');

module.exports = {
  
  mongoose: '',
  
  init: function(mongoose) {
    this.mongoose = mongoose;    
  },
  
  User: function() {
    return user.init(this.mongoose);
  }

};

