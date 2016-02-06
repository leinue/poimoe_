
module.exports = {

	init: function(obj, bu) {
		var _this = obj;
		var baseUrl = bu;

		return {

			indexAll: function(page, count) {
				return _this.$http.get('kaku/room/all/' + page + '/' + count);
			},

			create: function(data) {
				return _this.$http.post('kaku/room/create', data);
			},

			enter: function(data) {
				return _this.$http.post('kaku/room/enter', data);
			},

			leave: function(data) {
				return _this.$http.post('kaku/room/leave', data);
			},

			lock: function(data) {
				return _this.$http.post('kaku/room/lock', data);
			},

			unlock: function(data) {
				return _this.$http.post('kaku/room/unlock', data);
			},

			remove: function(data) {
				return _this.$http.post('kaku/room/remove', data);
			},

			alterName: function(data) {
				return _this.$http.post('kaku/room/alter/name', data);
			},
			
			alterPassport: function(data) {
				return _this.$http.post('kaku/room/alter/name', data);
			},

			getChattingMessage: function(room, page, count) {
				return _this.$http.get('kaku/room/chat/get/' + room + '/' + page + '/' + count);
			}

		}

	}

};
