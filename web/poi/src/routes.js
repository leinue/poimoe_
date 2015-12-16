module.exports = function(router){
	router.transitionOnLoad = true;
	router.map({
		'/index': {
			component: require('./components/index.vue'),
			subRoutes: {

			}
		},
		'/timeline': {
			component: require('./components/timeline/index.vue'),
			subRoutes: {
				'/': {
					component: require('./components/timeline/personal.vue')
				},

				'public': {
					component: require('./components/timeline/public.vue')
				},

				'personal': {
					component: require('./components/timeline/personal.vue')
				}
			}
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
