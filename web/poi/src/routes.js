module.exports = function(router){
	router.map({
		'/index': {
			component: require('./components/index.vue'),
			subRoutes: {

			}
		},
		'/list': {
			component: require('./components/list.vue'),
			subRoutes: {
				'/user/:userId': {
					component: require('./components/list/list.vue')
				}
			}
		},
		'*': {
			component: {
				template: '<h1>not found</h1>'
			}
		}
	});
};
