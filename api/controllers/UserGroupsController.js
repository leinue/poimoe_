var util = require('../util/index');
var mongoose = require('mongoose');

var index = {

  add: function(req, res, next) {

    var name = req.params.name;
    var description = req.params.description;
    // var rights = req.params.rights;
    var code = req.params.code;

    if(name == undefined || name == '') {
      res.send(util.retMsg(401, "用户组名不能为空"));
    }

    if(code == undefined || code == '') {
      res.send(util.retMsg(401, "用户组代码不能为空"));
    }

    if(isNaN(code)) {
      res.send(util.retMsg(401, "用户组代码必须为数字"));      
    }

    // if(rights == undefined || rights == '') {
    //   res.send(util.retMsg(401, "权限列表不能为空"));
    // }

    // rights = JSON.parse(rights);

    // if(rights.length === 0) {
    //   res.send(util.retMsg(401, "权限列表不能为空"));
    // }

    var UG = ctrlInitial.models.UserGroups();

    if(UG == undefined) {
      res.send(util.retMsg(401, '初始化用户权限模型失败'));
    }

    UG.findByCode(code, function(err, ug) {

      if(err) {
        res.send(util.retMsg(401, err.toString()));
      }

      console.log(ug);

      if(ug.length !== 0) {

        res.send(util.retMsg(401, '用户组代码已重复，请重新输入'));

      }else {

        var ug = new UG({
          name: name,
          description: description,
          code: code
        });

        ug.save(function(err, g) {

          if(err) {
            res.send(util.retMsg(401, err.toString()));
          }

          res.send(util.retMsg(200, g));

        });

      }

    });

  },

  remove: function(req, res, next) {

    var thisUGId = req.params.id;

    if(thisUGId == undefined || thisUGId == '') {
      res.send(util.retMsg(401, "缺少参数：用户组id"));
    }

    var UG = ctrlInitial.models.UserGroups();

    UG.findById(thisUGId, function(err, tag) {

      if(err) {
        res.send(util.retMsg(401, err.toString()));
      }

      if(tag.length === 0) {
        res.send(util.retMsg(401, '无此用户组'));
      }

      if(tag[0].isDeleted === true) {
        res.send(util.retMsg(401, '该用户组已被删除'));
      }

      var ug = tag[0];

      if(ug.code == '100') {
        res.send(util.retMsg(401, '系统默认用户组，禁止更改'));
      }else {

        UG._remove(thisUGId, function(err, tag) {

          if(err) {
            res.send(util.retMsg(401, err.toString()));
          }

          res.send(util.retMsg(200, "删除用户组成功", tag));

        });

      }

    });

  },

  update: function(req, res, next) {

    var name = req.params.name;
    var description = req.params.description;
    // var rights = req.params.rights;
    var code = req.params.code;
    var id = req.params._id;

    if(name == undefined || name == '') {
      res.send(util.retMsg(401, "用户组名不能为空"));
    }

    if(code == undefined || code == '') {
      res.send(util.retMsg(401, "缺少参数：用户组代码"));
    }

    if(id == undefined || id == '') {
      res.send(util.retMsg(401, "缺少参数：用户组id"));
    }

    // if(rights == undefined || rights == '') {
    //   res.send(util.retMsg(401, "权限列表不能为空"));
    // }

    // rights = JSON.parse(rights);

    // if(rights.length === 0) {
    //   res.send(util.retMsg(401, "权限列表不能为空"));
    // }

    var UG = ctrlInitial.models.UserGroups();

    UG.findById(id, function(err, ug) {

      if(err) {
        res.send(util.retMsg(401, err.toString()));
      }

      if(ug.length === 0) {
        res.send(util.retMsg(401, '无此用户组'));
      }

      ug = ug[0];

      if(ug.code == '100') {
        res.send(util.retMsg(401, '系统默认用户组，禁止更改'));
      }

      UG.update(id, {
        name: name,
        description: description,
        updatedAt: Date.now(),
        code: code
      }, function(err, ug) {

        if(err) {
          res.send(util.retMsg(401, err.toString()));
        }

        res.send(util.retMsg(200, '修改用户组成功', ug));

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

  },

  applyAuthority: function(req, res, next) {

    var rights = req.params.rights;
    var id = req.params.id;

    if(rights == undefined || rights == '') {
      res.send(util.retMsg(401, "权限列表不能为空"));
    }

    if(id == undefined || id == '') {
      res.send(util.retMsg(401, "缺少参数：用户组id"));
    }

    if(rights.length === 0) {
      res.send(util.retMsg(401, "权限列表不能为空"));
    }

    var ug = ctrlInitial.models.UserGroups();

    UG.findById(id, function(err, ug) {

      if(err) {
        res.send(util.retMsg(401, err.toString()));
      }

      if(ug.length === 0) {
        res.send(util.retMsg(401, '无此用户组'));
      }

      ug = ug[0];

      if(ug.code == '100') {
        res.send(util.retMsg(401, '系统默认用户组，禁止更改'));
      }

      UG.update(id, {
        rightsList: rights
      }, function(err, ug) {

        if(err) {
          res.send(util.retMsg(401, err.toString()));
        }

        res.send(util.retMsg(200, '分配用户权限成功', ug));

      });

    });

  },

  applyToUser: function(req, res, next) {

    var aid = req.params.aid;
    var uid = req.params.uid;

    if(uid == undefined || uid == '') {
      res.send(util.retMsg(401, "缺少参数：用户id"));
    }

    if(aid == undefined || aid == '') {
      res.send(util.retMsg(401, "缺少参数：用户组id"));
    }

    var ug = ctrlInitial.models.UserGroups();

    UG.findById(aid, function(err, ug) {

      if(err) {
        res.send(util.retMsg(401, err.toString()));
      }

      if(ug.length === 0) {
        res.send(util.retMsg(401, '无此用户组'));
      }

      ug = ug[0];

      if(ug.code == '100') {
        res.send(util.retMsg(401, '系统默认用户组，禁止更改'));
      }

      var User = ctrlInitial.models.User();

      User.updateGroup(aid, uid, function(err, user) {

        if(err) {
          res.send(util.retMsg(401, err.toString()));
        }

        res.send(util.retMsg(200, '修改成功', user));

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
