
module.exports = {

	init: function(obj, bu) {
		var _this = obj;
		var baseUrl = bu;

		return {

			register: function(email, password) {
				return _this.$http.get(baseUrl + 'user/register/' + email + '/' + password);
			},

			login: function(email, password) {
				return _this.$http.get(baseUrl + 'user/login/' + email + '/' + password);
			},

			logout: function() {
				return _this.$http.get(baseUrl + 'user/logout');
			},

			selectAll: function(page, count) {
				return _this.$http.get(baseUrl + 'user/select/all/' + page + '/' + count);
			}

		}

	}

};
