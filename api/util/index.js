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
  }

};

module.exports = util;
