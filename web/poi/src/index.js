var vue = require('vue');
var vueRouter = require('vue-router');
var configRouter = require('./routes.js');
var filter = require('./filters/index.js');
var vueStrap = require('../node_modules/vue-strap/dist/vue-strap.min.js');

//初始化全局css
require('../node_modules/bootstrap/dist/css/bootstrap.min.css');
require('./commons/styles/app.css');//公用定制css

var appEntry = require('./app.vue');

//初始化过滤器
filter.init(vue);

//初始化配置项
var config = {
	entry: '#poi',
	title: 'poi - Poimoe'
}

var entry = document.getElementById('main');
var selector = config.entry.split('');
if(selector[0] !== '#' && selector[0] !== '.') {
	throw '缺少程序入口css选择器，请使用Class选择器（.）或ID选择器（＃），并在index.html中指明ID或Class';
}

var entryId = config.entry.replace('#', '');
var entryId = entryId.replace('.', '');
entry.setAttribute('id', entryId);

//注册bootstrap部件到vue中
for(var key in vueStrap){
	var current = vueStrap[key];
	if(key === 'select' || key === 'option') {
		key = key.replace(/(\w)/,function(v){return v.toUpperCase()});
		key = 'v' + key;
	}
	key = key === 'tabset' ? 'tabs' : key;
	vue.component(key, current);
}

//初始化应用程序路由
vue.use(vueRouter);

var router = new vueRouter({});
configRouter(router);

window.vueStrap = vueStrap;

var app = vue.extend(appEntry);

new vue({
	el: '#app-title',
	data: {
		title: config.title
	}
});

//每次路由之前请求该方法
router.beforeEach(function () {
	console.log('before each');
});

//默认路由至主页
router.redirect({
  '*': '/index'
});

router.start(app, config.entry);

window.router = router;
