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
		'/cg/new':{
			component: require('./components/works/new.vue')
		},
		'/login': {
			name: 'login',
			component: require('./components/users/login.vue')
		},
		'/register': {
			name: 'register',
			component: require('./components/users/signin.vue')
		},
		'/profile/:uid': {
			component: require('./components/users/profile.vue')
		},
		'/view/:id': {
			component: require('./components/works/view.vue')
		},
		'/relations': {
			component: require('./components/users/relations/following.vue')
		},
		'/relations/following/:uid': {
			component: require('./components/users/relations/following.vue')
		},
		'/relations/follower/:uid': {
			component: require('./components/users/relations/follower.vue')
		},
		'/search': {
			component: require('./components/search.vue')
		},
		'/search/key/:keywords': {
			name: 'search-key',
			component: require('./components/search.vue')
		},
		'/notifications': {
			component: require('./components/users/notifications.vue')
		},
		'/404': {
			component: {
				component: require('./404.vue')
			}
		}
	});
};
