
var userAndThemes = require('./users');
var userGroups = require('./userGroups');
var relations = require('./relations');
var replys = require('./replys');
var tags = require('./tags');
var settings = require('./settings');

var util = require('../util/index.js');

module.exports = {
  
  mongoose: undefined,

  userModel: undefined,
  userGroupsModel: undefined,
  relationsModel: undefined,
  replysModel: undefined,
  tagsModel: undefined,
  themesModel: undefined,
  settingsModel: undefined,
  timelineModel: undefined,
  kakuModel: undefined,

  cacheMongoose: function(mongoose) {
  	if(util.checkIsUndefined(this.mongoose)) {
  		this.mongoose = mongoose;
  	}
  	return this.mongoose;
  },
  
  cacheModel: function(schema, v, poplulation) {
  	if(util.checkIsUndefined(v)) {
      if(typeof schema == 'string') {
        v = poplulation.name.init(this.mongoose);
        v = v[schema];
      }else {
        v = schema.init(this.mongoose);        
      }
  	}
  	return v;
  },

  init: function(mongoose) {
    this.cacheMongoose(mongoose);
  },
  
  User: function() {
  	this.userModel = this.cacheModel('users', this.userModel,{
      name: userAndThemes
    });
  	return this.userModel;
  },

  UserGroups: function() {
    this.userGroupsModel = this.cacheModel('userGroups', this.userGroupsModel, {
      name: userAndThemes
    });
    return this.userGroupsModel;

    this.userGroupsModel = this.cacheModel(userGroups, this.userGroupsModel);
    return this.userGroupsModel;
  },

  Tags: function() {
    this.tagsModel = this.cacheModel('tags', this.tagsModel, {
      name: userAndThemes
    });
    return this.tagsModel;
  },

  Replys: function() {
    this.replysModel = this.cacheModel(replys, this.replysModel);
    return this.replysModel;
  },

  Settings: function() {
    this.settingsModel = this.cacheModel(settings, this.settingsModel);
    return this.settingsModel;
  },

  Relations: function() {
    this.relationsModel = this.cacheModel('relations', this.relationsModel, {
      name: userAndThemes
    });
    return this.relationsModel;
  },

  Themes: function() {
    this.themesModel = this.cacheModel('themes', this.themesModel, {
      name: userAndThemes
    });
    return this.themesModel;
  },

  Timeline: function() {
    this.timelineModel = this.cacheModel('timeline', this.timelineModel, {
      name: userAndThemes
    });
    return this.timelineModel;
  },

  Kaku: function() {
    this.kakuModel = this.cacheModel('kaku', this.kakuModel, {
      name: userAndThemes
    });
    return this.kakuModel;
  }

};

