
module.exports = {

	init: function(obj, bu) {
		var _this = obj;
		var baseUrl = bu;

		return {

			search: function(val, page, count) {
				page = page || 1;
				count = count || 10;
				return _this.$http.get(baseUrl + 'site/search/' + val + '/' + page + '/' + count);
			}

		}

	}

};
