var util = require('../util/index');

var index = {

  logUser: function(req, res, next) {
  
    //ctrlInitial.prev();

    var ret = '';

    var User = ctrlInitial.models.User();
    var realUser = new User({
      username: 'xieyang_',
      email: 'ivydomco_@gmail.com',
      password: '123456_',
      sex: '男_',
      photo: '_unknown', 
      intro: '_fuck',
      region: '_hell'
    });

    realUser.save(function(err) {
      
      if(err) {
        ret = util.retMsg(500, err.toString());
        res.send(ret);
      }

      ret = util.retMsg(200, err);
      res.send(ret);

    });

  }

};

var ctrlInitial = {

  model: undefined,

  init: function(model) {
    this.models = model;
    return index;
  },

  prev: function() {
    util.retUndefinedError(this.models);
  }

};

module.exports = ctrlInitial;
