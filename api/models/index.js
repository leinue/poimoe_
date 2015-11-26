
var user = require('./user');

module.exports = {
  
  mongoose: '',
  userModel: undefined,
  
  init: function(mongoose) {
    this.mongoose = mongoose;    
  },
  
  User: function() {
    return this.userModel == undefined ? user.init(this.mongoose) : this.userModel;
  }

};

