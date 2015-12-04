var vue = require('vue');
var vueRouter = require('vue-router');
var configRouter = require('./routes.js');

require('./commons/styles/app.css');

vue.use(vueRouter);

var router = new vueRouter({});
configRouter(router);

var app = vue.extend(require('./app.vue'));
router.start(app, '#app');

//初始化网站配置
var config = {

  title: 'kaku'

};

//初始化网站标题
new vue({
	el: '#app-title',
	data: {
		title: config.title
	}
});

window.router = router;
