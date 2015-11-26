var util = require('../util/index');

module.exports = {
  
  models: undefined,
  
  init: function(model) {
    this.models = model; 
    return this;
  },
  
  prev: function() {
    return util.retUndefinedError(this.models);
  },

  logUser: function(req, res, next) {
  
    this.prev();

    var ret = '';

    var User = this.models.User();
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

      console.log('===========');

      console.log(err);
      
      if(err) {
        ret = util.retMsg(500, err.toString());
      }

      ret = util.retMsg(200, 'save successed');

      res.send(ret);

      console.log(ret);
      console.log('===========');

    });

  }

};
