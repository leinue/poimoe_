module.exports = function(router){
	router.transitionOnLoad = true;
	router.map({
		'/index': {
			component: require('./components/index.vue'),
			subRoutes: {

			}
		},
		'/sketch': {
			component: require('./components/kaku/index.vue')
		},
		'/404': {
			component: {
				component: require('./404.vue')
			}
		}
	});
};
