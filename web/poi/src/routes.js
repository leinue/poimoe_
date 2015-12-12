module.exports = function(router){
	router.transitionOnLoad = true;
	router.map({
		'/index': {
			component: require('./components/index.vue'),
			subRoutes: {

			}
		},
		'/timeline': {
			component: require('./components/timeline/index.vue')
		},
		'/works': {
			component: require('./components/works/index.vue')
		},
		'/favourites': {
			component: require('./components/favourites/index.vue')
		},
		'*': {
			component: {
				template: '<h1>not found</h1>'
			}
		}
	});
};
