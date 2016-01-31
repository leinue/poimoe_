
module.exports = {

	init: function(obj, bu) {
		var _this = obj;
		var baseUrl = bu;

		return {


/*
    server.get('/kaku/room/all/:page/:count', ctrl.kakuCtrl.indexAll);
    server.post('/kaku/room/create', ctrl.kakuCtrl.create);
    server.post('/kaku/room/enter', ctrl.kakuCtrl.enter);
    server.post('/kaku/room/leave', ctrl.kakuCtrl.leave);
    server.post('/kaku/room/unlock', ctrl.kakuCtrl.unlock);
    server.post('/kaku/room/lock', ctrl.kakuCtrl.lock);
    server.post('/kaku/room/remove/', ctrl.kakuCtrl.remove);
    server.post('/kaku/room/alter/name', ctrl.kakuCtrl.alterName);
    server.post('/kaku/room/alter/passport', ctrl.kakuCtrl.alterPassport);

*/
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

		}

	}

};
