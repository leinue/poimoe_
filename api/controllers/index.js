var models = require('../models/index');
var util = require('../util/index');
var userCtrl = require('./UserController');

var db = {
  mongoose: undefined
};

module.exports.init = function(mongo) {
  db.mongoose = mongo;
  models.init(db.mongoose);
};

module.exports.userCtrl = userCtrl.init(models);

