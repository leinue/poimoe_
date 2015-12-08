
var user = require('./users');
var userGroups = require('./userGroups');
var groupRights = require('./groupRights');
var relations = require('./relations');
var replys = require('./replys');
var tags = require('./tags');
var themes = require('./themes');
var settings = require('./settings');

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

