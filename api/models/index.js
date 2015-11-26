
var user = require('./user');
var util = require('../util/index.js');

module.exports = {
  
  mongoose: '',
  userModel: undefined,
  
  init: function(mongoose) {
    this.mongoose = mongoose;    
  },

  cacheModel: function(v) {
  	if(util.checkIsUndefined(v)) {
  		v = user.init(this.mongoose);
  	}
  }
  
  User: function() {
  	this.cacheModel(this.userModel);
  	return this.userModel;
  }

};

