
module.exports = {

	init: function(obj, bu) {
		var _this = obj;
		var baseUrl = bu;

		return {

			getAll: function() {
				return _this.$http.get(baseUrl + 'tags/select/all');
			},

			getAllRemoved: function() {
				return _this.$http.get(baseUrl + 'tags/select/removed');
			},

			add: function(name, description) {
				return _this.$http.get(baseUrl + 'tags/add/' + name + '/'  + description);
			},

			update: function(id, name, description) {
				return _this.$http.post(baseUrl + 'tags/update/' + id + '/' + name + '/' + description);
			},

			remove: function(id) {
				return _this.$http.get(baseUrl + 'tags/remove/' + id);
			},

			search: function(name, page, count) {
				return _this.$http.get(baseUrl + 'tags/search/' + name + '/' + page + '/' + count);
			}

		}

	}

};
