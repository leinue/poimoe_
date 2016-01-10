
module.exports = {

	init: function(obj, bu) {
		var _this = obj;
		var baseUrl = bu;

		return {

			getAll: function(uid, page, count) {
				return _this.$http.get(baseUrl + '/relations/select/' + uid + '/' + page + '/' + count);
			},

			follow: function(followerId, followingId) {
				return _this.$http.get(baseUrl + '/relations/follow/' + followerId + '/' + followingId);
			},

			unfollow: function(unfollowerId, unfollowingid) {
				return _this.$http.get(baseUrl + '/relations/unfollow/' + unfollowerId + '/' + unfollowingid);
			},

			isTwoWay: function(uid1, uid2) {
				return _this.$http.get(baseUrl + '/relations/twoway/' + uid1 + '/' + uid2);
			}

		}

	}

};
