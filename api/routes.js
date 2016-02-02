var ctrl = require('./controllers/index');
var util = require('./util/index');
var nodemailer = require('nodemailer');
var connect = require('connect');

module.exports = {

  mongoose: undefined,
 
  init: function(server, mongo, restify) {
    
    ctrl.init(mongo);
    this.mongoose = mongo;

    server.pre(function(req, res, next) {
    	res.charSet('utf-8');
        res.setHeader('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Headers', 'Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, Api-Version, Authorization');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
        res.setHeader('Access-Control-Allow-Credentials', 'true');
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
    server.get('/user/favourites/select/:id/:page/:count', ctrl.userCtrl.getFavourites);
    server.get('/user/favourites/remove/:uid/:tid', ctrl.userCtrl.removeFavourites);
    server.get('/user/favourites/add/:uid/:tid', ctrl.userCtrl.addFavourite);
    server.post('/user/profile/modify', ctrl.userCtrl.modifyProfile);
    server.get('/user/count/draft/:uid', ctrl.userCtrl.countDraft);
    server.get('/user/count/favourites/:uid', ctrl.userCtrl.countFavourites);
    server.get('/user/count/deleted/:uid', ctrl.userCtrl.countDeleted);
    server.get('/user/count/follower/:uid', ctrl.userCtrl.countFollower);
    server.get('/user/count/following/:uid', ctrl.userCtrl.countFollowing);
    server.get('/user/count/fo/:uid', ctrl.userCtrl.countFo);
    server.get('/user/profile/get/:uid', ctrl.userCtrl.getProfileByUid);
    server.get('/user/recommended', ctrl.userCtrl.getRecommended);

    server.get('/timeline/:page/:count', ctrl.userCtrl.loadTimeline);
    server.get('/timeline/message/index/count/:uid', ctrl.userCtrl.getMessageCount);
    server.get('/timeline/message/index/lastest/:count', ctrl.userCtrl.getLastestMessage);
    server.get('/timeline/message/personal/count/:uid', ctrl.userCtrl.getPersonalMessageCount);
    server.get('/timeline/message/personal/lastest/:uid/:page/:count', ctrl.userCtrl.getLastestPersonalMessage);
    server.get('/timeline/message/public/count', ctrl.userCtrl.getPublicMessageCount);
    server.get('/timeline/public/es/turnoff', ctrl.userCtrl.turnOffES);

    server.get('/session/:name', function(req, res, next) {
      res.send(util.retMsg(200, "您通过了验证"));
    });

    server.get('/tags/add/:name/:description', ctrl.tagsCtrl.add);
    server.get('/tags/select/all', ctrl.tagsCtrl.getAll);
    server.get('/tags/select/removed', ctrl.tagsCtrl.getAllRemoved);
    server.get('/tags/remove/:id', ctrl.tagsCtrl.remove);
    server.get('/tags/update/:id/:name/:description', ctrl.tagsCtrl.update);
    server.get('/tags/search/:name/:page/:count', ctrl.tagsCtrl.search);
    server.get('/tags/select/hotTags', ctrl.tagsCtrl.getHotTags)

    server.get('/site/search/:val/:page/:count', ctrl.tagsCtrl.searchSite);

    server.get('/settings/select', ctrl.settingsCtrl.getAll);
    server.get('/settings/add/:title/:logo/:footer', ctrl.settingsCtrl.add);
    server.get('/settings/update/:field/:value', ctrl.settingsCtrl.update);
    server.get('/settings/other/update/:value', ctrl.settingsCtrl.updateOther);

    server.get('/relations/follow/:followerId/:followingId', ctrl.relationsCtrl.follow);
    server.get('/relations/unfollow/:unfollowerId/:unfollowingId', ctrl.relationsCtrl.unfollow);
    server.get('/relations/twoway/:id1/:id2', ctrl.relationsCtrl.isTwoWay);
    server.get('/relations/select/:uid/:page/:count', ctrl.relationsCtrl.getFollow);

    server.get('/themes/select/all/:page/:count', ctrl.themesCtrl.getAll);
    server.get('/themes/select/removed/:page/:count', ctrl.themesCtrl.getAllRemoved);
    server.post('/themes/add', ctrl.themesCtrl.add);
    server.post('/themes/update', ctrl.themesCtrl.update);
    server.get('/themes/remove/:id', ctrl.themesCtrl.remove);
    server.get('/themes/get/:uid/:page/:count', ctrl.themesCtrl.getByUid);
    server.get('/themes/hot', ctrl.themesCtrl.getHotThemes);
    server.get('/themes/select/:tid', ctrl.themesCtrl.selectOneTheme);
    server.get('/themes/repost/:uid/:tid', ctrl.themesCtrl.repostTheme);

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

    server.get('/kaku/room/all/:page/:count', ctrl.kakuCtrl.indexAll);
    server.post('/kaku/room/create', ctrl.kakuCtrl.create);
    server.post('/kaku/room/enter', ctrl.kakuCtrl.enter);
    server.post('/kaku/room/leave', ctrl.kakuCtrl.leave);
    server.post('/kaku/room/unlock', ctrl.kakuCtrl.unlock);
    server.post('/kaku/room/lock', ctrl.kakuCtrl.lock);
    server.post('/kaku/room/remove/', ctrl.kakuCtrl.remove);
    server.post('/kaku/room/alter/name', ctrl.kakuCtrl.alterName);
    server.post('/kaku/room/alter/passport', ctrl.kakuCtrl.alterPassport);
  }

};
