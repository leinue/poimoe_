
module.exports = {

	init: function(obj, bu) {
		var _this = obj;
		var baseUrl = bu;

		return {

    		getMessageCount: function(uid) {
    			return _this.$http.get('timeline/message/index/count/' + uid);
    		},

    		getLastestMessage: function(count) {
    			return _this.$http.get('timeline/message/index/lastest/' + count);
    		},

    		getPersonalMessageCount: function(uid) {
    			return _this.$http.get('timeline/message/personal/count/' + uid);
    		},

    		getPersonalMessage: function(count) {
    			return _this.$http.get('timeline/message/personal/lastest/' + count);
    		}

		}

	}

};
