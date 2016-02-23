var crypto = require('crypto');

var util = {
  
  checkIsUndefined: function(v) {
     return typeof v === 'undefined' || v === undefined;
  },

  retMsg: function(c, msg, d) {
    return {
      code: c,
      message: msg,
      data: d
    };
  },

  retESMsg: function(code, msg, d) {
    return 'data: ' + JSON.stringify(this.retMsg(code, msg, d)) + '\n\n';
  },

  turnOffES: function(id) {
    clearInterval(id);
  },

  retUndefinedError: function(v) {
    v = v === null ? undefined : v;
    
    if(this.checkIsUndefined(v)) {
      return this.retMsg(500, 'undefined');
    } 

  },

  isEmail: function(email) {

    if(email == null || email =='' || email == undefined) {
      return false;
    }

    var emailReg = /[^\@\s]{1,}\@(?:[^\s\.]{1,}\.){1,}(?:[a-z]{2,4}\.?){1,2}/gim;
    return emailReg.test(email);
  },

  lengthIsGreaterThan: function(str, len, equal) {
    equal = equal == null ? false : equal;
    return equal == true ? str.length >= len : str.length > len;
  },

  count: function(obj) {
    var cnt = 0;
    for(var key in obj) {
      cnt ++;
    }
    return cnt;
  },

  sha1Pwd: function(pw) {
    var sha1 = crypto.createHash('sha1');
    return sha1.digest(pw);
  },

  userAuth: function() {

    return {

      generatorAccessToken: function(str) {
        var current = Date.now();
        current = current.toString();

        var raw = str + current;

        var rawBuffer = new Buffer(raw);
        var result = rawBuffer.toString('base64');

        return result;

      }

    };
  },

  getCurrentUser: function(userModel, accessToken, cb) {

    if(userModel == undefined || accessToken == undefined) {
      return false;
    }

    userModel.findByAccessToken(accessToken, cb);

  },

  guid: function(){
    var s = [];
    var hexDigits = "0123456789abcdef";
    for (var i = 0; i < 36; i++) {
        s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
    }
    s[14] = "4";  // bits 12-15 of the time_hi_and_version field to 0010
    s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1);  // bits 6-7 of the clock_seq_hi_and_reserved to 01
    s[8] = s[13] = s[18] = s[23] = "-";
 
    var uuid = s.join("");
    return uuid;
  },

  cacheMongooseModel: function(mongoose, schema, modelName, v) {
    if(this.checkIsUndefined(v)) {
      v = mongoose.model(modelName, schema);
    }
    return v;
  },

  getIsFavourited: function(req, res, themes, models) {
    var themesLength = themes.length;

    themes.forEach(function(currentTheme, i) {

      var currentThemeId = currentTheme._id;

      var User = models.User();

      User.findFavouritesByAccessToken(req.authorization.credentials, function(err, favourites) {

        if(err) {
          res.send(util.retMsg(401, err.toString()));
        }

        var reposter = currentTheme.reposter;

        if(favourites.length > 0) {
          favourites = favourites[0].favourites;
          favourites.forEach(function(currentLike, j) {
            if(currentThemeId.toString() == currentLike.toString()){
              themes[i].favourited = true;
              return true;
            }
          });
        }

        for (var k = 0; k < reposter.length; k++) {
          var currentReposter = reposter[k];
          //这里表示有的地方没有进行populate，所以有的直接就是id
          if(typeof currentReposter._id != 'undefined') {
            if(currentReposter._id.toString() == global.currentUserId.toString()) {
              themes[i].reposted = true;
              break;
            }
          }else {
            if(currentReposter.toString() == global.currentUserId.toString()) {
              themes[i].reposted = true;
              break;
            }
          }
        };

        if(themesLength -1 == i) {
          res.send(util.retMsg(200, themes));
        }

      });

    });
  },

  seekFavourited: function(req, res, themes, models) {
    if(req.authorization.credentials != undefined) {
      themes = this.getIsFavourited(req, res, themes, models);      
    }else {
      res.send(util.retMsg(200, themes));   
    }
  },

  formatDate: function(strTime) {
    var date = new Date(strTime);
    return date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate() + ' ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
  }


};

module.exports = util;
