var util = require('../util/index');

var index = {

	add: function(req, res, next) {

		var thisAuthName = req.params.name;
   	 	var thisAuthRouter = req.params.router;

   	 	if(thisAuthName == undefined || thisAuthName == '') {
	      res.send(util.retMsg(401, "权限名不能为空"));
   	 	}

   	 	if(thisAuthRouter == undefined || thisAuthRouter == '') {
	      res.send(util.retMsg(401, "权限路由不能为空"));
   	 	}

		var Auth = ctrlInitial.models.Auth();

	    var auth = new Auth({
	    	name: thisAuthName,
	    	router: thisAuthRouter
	    });

	    auth.save(function(err, t) {

	      if(err) {
	        res.send(util.retMsg(401, err.toString()));
	      }

	      res.send(util.retMsg(200, '添加权限成功', t));

	    });

	},

	remove: function(req, res, next) {

		var thisAuthId = req.params.id;

		if(thisAuthId == undefined || thisAuthId == '') {
			res.send(util.retMsg(401, "缺少参数：权限id"));
		}

		var Auth = ctrlInitial.models.Auth();

		Auth.findById(thisAuthId, function(err, auth) {

			if(err) {
	        	res.send(util.retMsg(401, err.toString()));
	      	}

	      	if(auth.length === 0) {
	      		res.send(util.retMsg(401, '无此权限'));
	      	}

	      	if(auth[0].isDeleted === true) {
	      		res.send(util.retMsg(200, '该权限已被删除'));
	      	}

			Auth._remove(thisAuthId, function(err, auth) {

				if(err) {
		        	res.send(util.retMsg(401, err.toString()));
		      	}

		      	res.send(util.retMsg(200, "删除权限成功"));

			});

		});

	},

	update: function(req, res, next) {

		var thisAuthName = req.params.name;
		var thisAuthRouter = req.params.router;
		var thisAuthId = req.params.id;

		if(thisAuthName == undefined || thisAuthName == '') {
			res.send(util.retMsg(401, "权限名不能为空"));
		}

		if(thisAuthRouter == undefined || thisAuthRouter == '') {
			res.send(util.retMsg(401, "权限路由不能为空"));
		}

		if(thisAuthId == undefined || thisAuthId == '') {
			res.send(util.retMsg(401, "缺少参数：权限id"));
		}

		var Auth = ctrlInitial.models.Auth();

		Auth.findById(thisAuthId, function(err, auth) {

			if(err) {
	        	res.send(util.retMsg(401, err.toString()));
	      	}

	      	if(auth.length === 0) {
	      		res.send(util.retMsg(401, '无此权限'));
	      	}

	      	Auths.update(thisAuthId, {
				name: thisAuthName,
				router: thisAuthRouter
			}, function(err, auth) {

				if(err) {
		        	res.send(util.retMsg(401, err.toString()));
		      	}

		      	res.send(util.retMsg(200, '更新成功', tag));

			});

	     });

	},

	getAll: function(req, res, next) {

		var Auth = ctrlInitial.models.Auth();

		Auth.findAll(function(err, auth) {

			if(err) {
	        	res.send(util.retMsg(401, err.toString()));
	      	}

	      	res.send(util.retMsg(200, auth));

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
