var util = require('../util/index');

var index = {

	getAll: function(req, res, next) {

		var Settings = ctrlInitial.models.Settings();

		Settings.findAll(function(err, setting) {

			if(err) {
	        	res.send(util.retMsg(401, err.toString()));
	      	}

	      	res.send(util.retMsg(200, setting));

		});

	},

	add: function(req, res, next) {

		var thisTitle = req.params.title;
		var thisLogo = req.params.logo;
		var thisFooter = req.params.footer;

		var Settings = ctrlInitial.models.Settings();

	    var setting = new Settings({
	      title: thisTitle,
	      logo: thisLogo,
	      footer: thisFooter
	    });

	    setting.save(function(err, s) {

	      if(err) {
	        res.send(util.retMsg(401, err.toString()));
	      }

	      res.send(util.retMsg(200, s));

	    });

	},

	update: function(req, res, next) {

		var thisField = req.params.field;
		var thisVal = req.params.value;

		if(thisField == undefined || thisField == '') {
			res.send(util.retMsg(401, '字段名不能为空'));
		}

		var Settings = ctrlInitial.models.Settings();

		Settings.findAll(function(err, s) {

	       	if(err) {
	        	res.send(util.retMsg(401, err.toString()));
	      	}
			
	      	if(typeof s[0][thisField] == 'undefined') {
	      		res.send(util.retMsg(401, '无效的字段名'));
	      	}

	      	s[0][thisField] = thisVal;
	      	s[0].updatedAt = Date.now();

	      	Settings.findOneAndUpdate({
	      		_id: s[0]._id
	      	}, s[0], {
	      		new: true
	      	}, function(err, news) {

		       	if(err) {
		        	res.send(util.retMsg(401, err.toString()));
		      	}

		      	res.send(util.retMsg(200, news));

	      	});

		});

	},

	updateOther: function(req, res, next) {

		var thisVal = req.params.value;

		var Settings = ctrlInitial.models.Settings();

		Settings.findAll(function(err, s) {

			if(err) {
				res.send(util.retMsg(401, err.toString()));
			}

			if(s.length === 0) {
				res.send(util.retMsg(401, '无系统设置记录'));
			}

			s[0].updatedAt = Date.now();
			s[0].other = thisVal;

			Settings.findOneAndUpdate({
				_id: s[0]._id
			}, s[0], {
				new: true
			}, function(err, news) {

				if(err) {
					res.send(util.retMsg(401, err.toString()));
				}

				res.send(util.retMsg(200, news));

			});

		});

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
