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

  logUser: function() {
  
    this.prev();

    var User = this.models.User();
    var realUser = new User({
      username: 'xieyang',
      email: 'ivydomco@gmail.com',
      password: '123456',
      sex: '男',
      photo: 'unknown',
      intro: 'fuck',
      region: 'hell'
    });

    realUser.save(function(err) {

      console.log(err);
      console.log(err.toString());
      
      if(err) {
        return util.retMsg(500, err.toString());
      }

      return util.retMsg(200, 'save successed');

    });
  
  }

};
