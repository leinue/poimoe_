var util = require('../util/index');

var index = {

  add: function(req, res, next) {

    var _tid = req.params.tid;
    var _uid = req.params.uid;
    var _content = req.params.content;
    var _to_rid = req.params.to;

    if(_tid == undefined || _tid == '') {
      res.send(util.retMsg(401, "缺少参数：主题id"));
    }

    if(_uid == undefined || _uid == '') {
      res.send(util.retMsg(401, "缺少参数：用户id"));
    }

    if(_content == undefined || _content == '') {
      res.send(util.retMsg(401, "留言内容不能为空"));
    }

    var User = ctrlInitial.models.User();

    User.findById(_uid, function(err, u) {

      if(err) {
        res.send(util.retMsg(401, err.toString()));
      }

      if(u.length === 0) {
        res.send(util.retMsg(401, "无此用户"));
      }

      var Themes = ctrlInitial.models.Themes();

      Themes.findById(_tid, function(err, t) {

        if(err) {
          res.send(401, util.retMsg('主题不存在'));
        }

        var Replys = ctrlInitial.models.Replys();

        var _child = [];

        if(_to_rid !== 'none') {

          Replys.findById(_to_rid, function(err, reply_exists) {

            if(err) {
              res.send(util.retMsg(401, err.toString()));
            }

            if(reply_exists.length === 0) {
              res.send(util.retMsg(401, "您回复的主题不存在"));
            }

            var reply = new Replys({
              user_id: _uid,
              theme_id: _tid,
              content: _content,
              child: _child,
              parent: []
            });

            reply.save(function(err, r) {

              if(err) {
                res.send(util.retMsg(401, err.toString()));
              }

              reply.updateChild(_to_rid, _tid, function(err, newr) {

                if(err) {
                  res.send(util.retMsg(401, err.toString()));
                }                

                res.send(util.retMsg(200, r));

              });

            });

          });

        }else {

          var reply = new Replys({
            user_id: _uid,
            theme_id: _tid,
            content: _content,
            child: [],
            parent: _to_rid
          });

          reply.save(function(err, r) {

            if(err) {
              res.send(util.retMsg(401, err.toString()));
            }

            Replys.findById(_to_rid, function(err, r_parent) {

              if(err) {
                res.send(util.retMsg(401, err.toString()));
              }

              if(r_parent.length === 0) {
                res.send(util.retMsg(401, "无被回复的内容"));
              }

              r_parent[0].child.push(r._id);

              _child = r_parent[0],child;

              Replys.findOneAndUpdate({
                  _id: _to_rid
              }, {
                child: _child,
                updatedAt: Date.now()
              }, {
                new: true
              }, function(err, rnew) {

                if(err) {
                  res.send(util.retMsg(401, err.toString()));
                }

                res.send(util.retMsg(200, r));

              });

            });

          });

        }

      });

    });

  },

  reply: function(req, res, next) {

    var _tid = req.params.tid;
    var _uid = req.params.uid;
    var _content = req.params.content;

    if(_tid == undefined || _tid == '') {
      res.send(util.retMsg(401, "缺少参数：主题id"));
    }

    if(_uid == undefined || _uid == '') {
      res.send(util.retMsg(401, "缺少参数：用户id"));
    }

    if(_content == undefined || _content == '') {
      res.send(util.retMsg(401, "回复内容不能为空"));
    }

    var User = ctrlInitial.models.User();

    User.findById(_uid, function(err, u) {

      if(err) {
        res.send(util.retMsg(401, err.toString()));
      }

      if(u.length === 0) {
        res.send(util.retMsg(401, "无此用户"));
      }

      if(u[0].isBlocked) {
        res.send(util.retMsg(401, "用户已被锁定，无权操作"));
      }

      var Themes = ctrlInitial.models.Themes();

      Themes.findById(_tid, function(err, t) {

        if(err) {
          res.send(401, util.retMsg('主题不存在'));
        }

        var Replys = ctrlInitial.models.Replys();

        var reply = new Replys({
          user_id: _uid,
          theme_id: _tid,
          content: _content,
          child: []
        });

        reply.save(function(err, r) {

          if(err) {
            res.send(util.retMsg(401, err.toString()));
          }

          res.send(util.retMsg(200, r));

        });

      });

    });

  },

  replyTo: function(req, res, next) {

    var _rid = req.params.rid;
    var _uid = req.params.uid;
    var _content = req.params.content;

    if(_rid == undefined || _rid == '') {
      res.send(util.retMsg(401, "缺少参数：回复id"));
    }

    if(_content == undefined || _content == '') {
      res.send(util.retMsg(401, "回复内容不能为空"));
    }

    if(_uid == undefined || _uid == '') {
      res.send(util.retMsg(401, "缺少参数：用户id"));
    }

    var User = ctrlInitial.models.User();

    User.findById(_uid, function(err, u) {

      if(err) {
        res.send(util.retMsg(401, err.toString()));
      }

      if(u.length === 0) {
        res.send(util.retMsg(401, "用户不存在"));
      }

      if(u[0].isBlocked) {
        res.send(util.retMsg(401, "用户已被锁定，无权操作"));
      }

      var Themes = ctrlInitial.models.Themes();

      Themes.findById(_tid, function(err, t) {

        if(err) {
          res.send(401, util.retMsg('主题不存在'));
        }

        var Replys = ctrlInitial.models.Replys();

        var _child = [];

        Replys.findById(_rid, function(err, r) {

          if(err) {
            res.send(util.retMsg(401, err.toString()));
          }

          if(r.length === 0) {
            res.send(util.retMsg(401, "回复不存在"));
          }

          _child = r[0].child;

          var _childValue = {};

          _childValue.uid = _uid;
          _childValue.content = _content;
          _childValue.createdAt = Date.now();

          _child.push(_childValue);

          Replys.findOneAndUpdate({
            _id: _rid
          }, {
            content: _child
          }, {
            new: true
          }, function(err, newReply) {

              if(err) {
                res.send(util.retMsg(401, err.toString()));
              }

              res.send(util.retMsg(200, newReply));

          });

        });

      });

    });

  },

  remove: function(req, res, next) {

    var thisReplyId = req.params.id;

    if(thisReplyId == undefined || thisReplyId == '') {
      res.send(util.retMsg(401, "缺少参数：回复id"));
    }

    var Replys = ctrlInitial.models.Replys();

    Replys.findById(thisReplyId, function(err, reply) {

      if(err) {
        res.send(util.retMsg(401, err.toString()));
      }

      if(reply.length === 0) {
        res.send(util.retMsg(401, '回复不存在'));
      }

      if(reply[0].isDeleted === true) {
        res.send(util.retMsg(401, '该回复已被删除'));
      }

      Replys._remove(thisReplyId, function(err, reply_removed) {

        if(err) {
          res.send(util.retMsg(401, err.toString()));
        }

        res.send(util.retMsg(200, "删除回复成功" + reply_removed.toString()));

      });

    });

  },

  getAll: function(req, res, next) {

    var page = req.params.page;
    var count = req.params.count;

    var Replys = ctrlInitial.models.Replys();

    Replys.findAll(page, count, function(err, reply) {

      if(err) {
            res.send(util.retMsg(401, err.toString()));
          }

          res.send(util.retMsg(200, reply));

    });

  },

  getAllRemoved: function(req, res, next) {

    var page = req.params.page;
    var count = req.params.count;

    var Replys = ctrlInitial.models.Replys();

    Replys.findAllRemoved(page, count, function(err, reply) {

      if(err) {
        res.send(util.retMsg(401, err.toString()));
      }

      res.send(util.retMsg(200, reply));

    });

  },

  getAllReplys: function(req, res, next) {

    var tid = req.params.tid;

    if(tid === undefined || tid === '') {
      res.send(util.retMsg(401, "缺少参数：主题id"));
    }

    var Themes = ctrlInitial.models.Themes();

    Themes.findById(tid, function(err, t) {

      if(err) {
        res.send(util.retMsg(401, err.toString()));
      }

      if(t.length === 0) {
        res.send(util.retMsg(401, "主题不存在"));
      }

      if(t[0].isDeleted) {
        res.send(util.retMsg(401, "主题已被删除"));
      }

      var Replys = ctrlInitial.models.Replys();

      Replys.findByThemeId(tid, function(err, r) {

        if(err) {
          res.send(util.retMsg(401, err.toString()));
        }

        if(r.length === 0) {
          res.send(util,retMsg(200, []));
        }

        for (var i = 0; i < r.length; i++) {

          var curr = r[i];



        };

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
