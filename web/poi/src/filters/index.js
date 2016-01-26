module.exports = {

	vue: undefined,

	init: function(v) {
		this.vue = v;

		this.vue.filter('nullToVisual', function(value) {
			if(value == null || value == undefined){
				return '暂无数据';
			}else {
				return value;
			}
		});

		this.vue.filter('numberToZero', function(value) {
			if(value == null || value == undefined) {
				return 0;
			}else {
				return value;
			}
		});

		this.vue.filter('photoNullToVision', function(value) {
			if(value == null || value == '' || value == undefined) {
				return 'https://pic1.zhimg.com/da8e974dc_l.jpg';
			}else {
				return value;
			}
		});

		this.vue.filter('judgePhotoIsTransfered', function(item) {
			if(item.isRepost == true) {
				return item.repost.image;
			}else {
				return item.image;
			}
		});

		this.vue.filter('notificationActionFilter', function(item) {
			if(item == 'repost') {
				return '转发';
			}else {
				return '喜欢';
			}
		});

	},

	get: function(filter) {
		return this.vue.filter(filter);
	}

};