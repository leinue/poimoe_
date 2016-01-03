var ctrl = require('./controllers/index');
var util = require('./util/index');
var nodemailer = require('nodemailer');
var connect = require('connect');
var restify = require('restify');

module.exports = {

  mongoose: undefined,
 
  init: function(server, mongo) {
    
    ctrl.init(mongo);
    this.mongoose = mongo;

    server.use(restify.CORS({
        origins: ['*'],
        credentials: true,
        headers: ['x-poimoe', 'Authorization']
    }));

    server.pre(function(req, res, next) {
    	res.charSet('utf-8');
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Headers', 'Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, Api-Version, Authorization');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    	return next();
    });

    // server.use(ctrl.userCtrl.auth);
  
    server.get('/log/', function(req, res, next) {
        ret = util.retMsg(200, '膜蛤');
        res.send(ret);
    });

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
    server.get('/relations/unfollow/:unfollowerId／:unfollowingid', ctrl.relationsCtrl.unfollow);
    server.get('/relations/select/follow/:id', ctrl.relationsCtrl.getFollow);
    server.get('/relations/twoway/:id1/:id2', ctrl.relationsCtrl.isTwoWay);

    server.get('/themes/select/all/:page/:count', ctrl.themesCtrl.getAll);
    server.get('/themes/select/removed/:page/:count', ctrl.themesCtrl.getAllRemoved);
    server.post('/themes/add', ctrl.themesCtrl.add);
    server.post('/themes/update', ctrl.themesCtrl.update);
    server.get('/themes/remove/:id', ctrl.themesCtrl.remove);
    server.get('/themes/get/:uid/:page/:count', ctrl.themesCtrl.getByUid);

    server.get('/replys/select/all/:page/:count', ctrl.replysCtrl.getAll);
    server.get('/replys/select/removed/:page/:count', ctrl.replysCtrl.getAllRemoved);
    server.post('/replys/reply', ctrl.replysCtrl.reply);
    server.post('/replys/reply/to', ctrl.replysCtrl.replyTo);
    server.get('/replys/remove', ctrl.replysCtrl.remove);

    server.get('/groups/select/all', ctrl.userGroupsCtrl.getAll);
    server.get('/groups/select/removed', ctrl.userGroupsCtrl.getAllRemoved);
    server.post('/groups/add', ctrl.userGroupsCtrl.add);
    server.post('/groups/update', ctrl.userGroupsCtrl.update);
    server.get('/groups/remove/:id', ctrl.userGroupsCtrl.remove);

  }

};
