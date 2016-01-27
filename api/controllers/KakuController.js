var util = require('../util/index');

var index = {

	indexAll: function(req, res, next) {

	},

	create: function(req, res, next) {

	},

	leave: function(req, res, next) {

	},

	lock: function(req, res, next) {

	},

	remove: function(req, res, next) {

	},

	alterName: function(req, res, next) {
		
	}

};

var ctrlInitial = {

  models: undefined,

  init: function(model) {
    this.models = model;
    return index;
  }

};

module.exports = ctrlInitial;
