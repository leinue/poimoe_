module.exports = {

	vue: undefined,

	init: function(v) {
		this.vue = v;

		this.vue.filter('nullToVisual', function(value) {
			if(value == null ){
				return '暂无数据';
			}else {
				return value;
			}
		});

	},

	get: function(filter) {
		return this.vue.filter(filter);
	}

};