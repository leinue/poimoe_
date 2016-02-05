module.exports = function(router){
	router.transitionOnLoad = true;
	router.map({
		'/index': {
			component: require('./components/index.vue'),
			subRoutes: {

			}
		},
		'/sketch/:id': {
			component: require('./components/kaku/index.vue')
		},
		'/room/new': {
			component: require('./components/kaku/newRoom.vue')
		},
		'/404': {
			component: {
				component: require('./404.vue')
			}
		}
	});
};
