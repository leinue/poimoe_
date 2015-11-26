
var user = require('./user');

module.exports = {
  
  mongoose: '',
  userModel: undefined,
  
  init: function(mongoose) {
    this.mongoose = mongoose;    
  },
  
  User: function() {
  	if(this.userModel == undefined) {
  		this.userModel = user.init(this.mongoose);
  	}

  	return this.userModel;
  }

};

