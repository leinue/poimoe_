
var user = require('./user');
var util = require('../util/index.js');

module.exports = {
  
  mongoose: undefined,
  userModel: undefined,

  cacheMongoose: function(mongoose) {
  	if(util.checkIsUndefined(this.mongoose)) {
  		this.mongoose = mongoose;
  	}
  	return this.mongoose;
  },
  
  cacheModel: function(v) {
  	if(util.checkIsUndefined(v)) {
  		v = user.init(this.mongoose);
  	}
  	return v;
  },

  init: function(mongoose) {
    this.cacheMongoose(mongoose);    
  },
  
  User: function() {
  	this.userModel = this.cacheModel(this.userModel);
  	return this.userModel;
  }

};

