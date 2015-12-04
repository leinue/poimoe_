module.exports = {

	vue: undefined,

	init: function(v) {
		this.vue = v;

		this.vue.filter('fuck', function(value) {
			return value;
		});

	},

	get: function(filter) {
		return this.vue.filter(filter);
	}

};