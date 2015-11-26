var util = {
  
  checkIsUndefined: function(v) {
     return typeof v === 'undefined' || v === undefined;
  },

  retMsg: function(c, msg) {
    return {
      code: c,
      message: msg
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
  }

};

module.exports = util;
