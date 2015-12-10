var ctrl = require('./controllers/index');
var util = require('./util/index');
var nodemailer = require('nodemailer');
var connect = require('connect');

module.exports = {

  mongoose: undefined,
 
  init: function(server, mongo) {
    
    ctrl.init(mongo);
    this.mongoose = mongo;

    server.pre(function(req, res, next) {
    	res.charSet('utf-8');
    	return next();
    });

    // server.use(ctrl.userCtrl.auth);
  
    server.get('/log/', ctrl.userCtrl.logUser);

    server.get('/user/register/:email/:password', ctrl.userCtrl.register);
    server.get('/user/login/:email/:password', ctrl.userCtrl.login);
    server.get('/user/logout', ctrl.userCtrl.logout);
    server.get('/user/select/all/:page/:count', ctrl.userCtrl.findAll);

    server.get('/session/:name', function(req, res, next) {
      res.send(util.retMsg(200, "您通过了验证"));
    });

    server.get('/tags/add/:name/:description', ctrl.tagsCtrl.add);
    server.get('/tags/select/all', ctrl.tagsCtrl.getAll);
    server.get('/tags/select/removed', ctrl.tagsCtrl.getAllRemoved);
    server.get('/tags/remove/:id', ctrl.tagsCtrl.remove);
    server.get('/tags/update/:id/:name/:description', ctrl.tagsCtrl.update);

    server.get('/settings/select', ctrl.settingsCtrl.getAll);
    server.get('/settings/add/:title/:logo/:footer', ctrl.settingsCtrl.add);
    server.get('/settings/update/:field/:value', ctrl.settingsCtrl.update);
    server.get('/settings/other/update/:value', ctrl.settingsCtrl.updateOther);

    server.get('/relations/follow/:followerId/:followingId', ctrl.relationsCtrl.follow);

    server.get('/themes/select/all/:page/:count', ctrl.themesCtrl.getAll);
    server.get('/themes/select/removed/:page/:count', ctrl.themesCtrl.getAllRemoved);
    server.post('/themes/add', ctrl.themesCtrl.add);
    server.post('/themes/update', ctrl.themesCtrl.update);
    server.get('/themes/remove/:id', ctrl.themesCtrl.remove);

    server.get('/replys/select/all/:page/:count', ctrl.replysCtrl.getAll);
    server.get('/replys/select/removed/:page/:count', ctrl.replysCtrl.getAllRemoved);
    server.post('/replys/add', ctrl.replysCtrl.add);
    server.get('/replys/remove', ctrl.replysCtrl.remove);

  }

};
