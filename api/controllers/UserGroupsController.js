var util = require('../util/index');

var index = {

  add: function(req, res, next) {

    var name = req.params.name;
    var description = req.params.description;
    var rights = req.params.rights;

    if(name == undefined || name == '') {
      res.send(util.retMsg(401, "用户组名不能为空"));
    }

    if(description == undefined || description == '') {
      res.send(util.retMsg(401, "描述内容不能为空"));
    }

    if(rights == undefined || rights == '') {
      res.send(util.retMsg(401, "权限列表不能为空"));
    }

    rights = JSON.parse(rights);

    if(rights.length === 0) {
      res.send(util.retMsg(401, "权限列表不能为空"));
    }

    var UG = ctrlInitial.models.UserGroups();

    var ug = new UG({
      name: name,
      description: description,
      rightsList: rights
    });

    ug.save(function(err, g) {

      if(err) {
        res.send(util.retMsg(401, err.toString()));
      }

      res.send(util.retMsg(200, g));

    });

  },

  remove: function(req, res, next) {

    var thisUGId = req.params.id;

    if(thisUGId == undefined || thisUGId == '') {
      res.send(util.retMsg(401, "缺少参数：标签id"));
    }

    var UG = ctrlInitial.models.UserGroups();

    UG.findById(thisUGId, function(err, tag) {

      if(err) {
        res.send(util.retMsg(401, err.toString()));
      }

      if(tag.length === 0) {
        res.send(util.retMsg(401, '无此用户组'));
      }

      if(tag[0].isDeleted === false) {
        res.send(util.retMsg(401, '该用户组已被删除'));
      }

      UG._remove(thisUGId, function(err, tag) {

        if(err) {
          res.send(util.retMsg(401, err.toString()));
        }

        res.send(util.retMsg(200, "删除用户组成功" + tag.toString()));

      });

    });

  },

  update: function(req, res, next) {

    var name = req.params.name;
    var description = req.params.description;
    var rights = req.params.rights;
    var id = req.params.id;

    if(name == undefined || name == '') {
      res.send(util.retMsg(401, "用户组名不能为空"));
    }

    if(description == undefined || description == '') {
      res.send(util.retMsg(401, "缺少参数：用户组id"));
    }

    if(rights == undefined || rights == '') {
      res.send(util.retMsg(401, "权限列表不能为空"));
    }

    rights = JSON.parse(rights);

    if(rights.length === 0) {
      res.send(util.retMsg(401, "权限列表不能为空"));
    }

    var UG = ctrlInitial.models.UserGroups();

    UG.findById(id, function(err, ug) {

      if(err) {
        res.send(util.retMsg(401, err.toString()));
      }

      if(ug.length === 0) {
        res.send(util.retMsg(401, '无此用户组'));
      }

      UG.update(id, {
        name: name,
        description: description,
        rightsList: rights,
        updatedAt: Date.now()
      }, function(err, ug) {

        if(err) {
          res.send(util.retMsg(401, err.toString()));
        }

        res.send(util.retMsg(200, ug));

      });

    });

  },

  getAll: function(req, res, next) {

    var page = req.params.page;
    var count = req.params.count;

    var ug = ctrlInitial.models.UserGroups();

    ug.findAll(page, count, function(err, g) {

      if(err) {
        res.send(util.retMsg(401, err.toString()));
      }

      res.send(util.retMsg(200, g));

    });

  },

  getAllRemoved: function(req, res, next) {

    var page = req.params.page;
    var count = req.params.count;

    var ug = ctrlInitial.models.UserGroups();

    ug.findAllRemoved(page, count, function(err, g) {

      if(err) {
        res.send(util.retMsg(401, err.toString()));
      }

      res.send(util.retMsg(200, g));

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
