
module.exports = {

	init: function(obj, bu) {
		var _this = obj;
		var baseUrl = bu;

		return {

			getAll: function(page, count) {
				return _this.$http.get(baseUrl + 'themes/select/all/' + page + '/' + count);
			},

			getAllRemoved: function(page, count) {
				return _this.$http.get(baseUrl + 'themes/select/removed' + page + '/' + count);
			},

			publish: function(data) {
				return _this.$http.post(baseUrl + 'themes/add', data);
			},

			update: function(data) {
				return _this.$http.post(baseUrl + 'themes/update/', data);
			},

			remove: function(id) {
				return _this.$http.get(baseUrl + 'themes/remove/' + id);
			},

			getByUid: function(uid, page, count) {
				return _this.$http.get(baseUrl + 'themes/get/' + uid + '/' + page + '/' + count);
			}

		}

	}

};
