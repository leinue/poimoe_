var models = require('../models/index');
var util = require('../util/index');
var userCtrl = require('./UserController');
var tagsCtrl = require('./TagsController');

var db = {
  mongoose: undefined
};

module.exports = {

	init: function(mongo) {
		db.mongoose = mongo;
  		models.init(db.mongoose);
	},

	userCtrl: userCtrl.init(models),

	tagsCtrl: tagsCtrl.init(models)

};
