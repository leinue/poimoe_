<template>

	<nav class="navbar navbar-default">
	  <div class="container-fluid">
	    <!-- Brand and toggle get grouped for better mobile display -->
	    <div class="navbar-header">
	      <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
	        <span class="sr-only">Toggle navigation</span>
	        <span class="icon-bar"></span>
	        <span class="icon-bar"></span>
	        <span class="icon-bar"></span>
	      </button>
	      <a class="navbar-brand" v-link="{ path: '/list' }">poimoe</a>
	    </div>

	    <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
	      <ul class="nav navbar-nav navbar-right">
	        <li><a>投稿</a></li>
	        <li><a @click="showRight = true">个人中心</a></li>
	      </ul>
	    </div><!-- /.navbar-collapse -->
	  </div><!-- /.container-fluid -->
	</nav>

  	<sidebar :show.sync="showRight" placement="right" header="个人中心" :width="600">
	    <h4>的颠三倒四的</h4>
	      <pre><code class="language-javascript">
			if (talk === cheap){
			code.style.display = 'block'
			}
	    </code></pre>
	    <div class="aside-footer">
	      <button type="button" class="btn btn-default" @click="showRight=false">关闭</button>
	    </div>
  	</sidebar>

  	<div class="row" style="margin-right:0px">
  		<div class="col-xs-12" style="padding-left: 0px;padding-right: 0px">
  			<div class="menu-header">
	  			<ul>
					<li><span @click="pathTo('index')" v-bind:class="menu.currentName != 'index' ? '' : 'active'">主页</span></span></li>
					<li><span @click="pathTo('timeline')" v-bind:class="menu.currentName != 'timeline' ? '' : 'active'">时间线</span></li>
					<li><span @click="pathTo('works')" v-bind:class="menu.currentName != 'works' ? '' : 'active'">我的投稿</span></li>
					<li><span @click="pathTo('favourites')" v-bind:class="menu.currentName != 'favourites' ? '' : 'active'">我的收藏</span></li>
	  			</ul>
  			</div>
  		</div>
	</div>

</template>

<script>

	var vue = require('vue');
	var Router = require('vue-router');

	vue.use(Router);
	var router = new Router({});

	export default {
		data() {
			return {
				msg: 'hello from header.vue',
				showRight: false,
				menu: {
					currentName: 'index'
				}
			};
		},

		methods: {
			pathTo: function(path){
				this.menu.currentName = path;
				router.go('/' + path);
			}
		}
	};

</script>

<style>
	
	.menu-header {
		border-bottom: 1px solid rgb(220, 220, 220);
		display: table;
		margin-top: -15px;
		width: 100%;
	}

	.menu-header ul{
		list-style: none;
		display: table-row;
	}

	.menu-header ul li {
		display: table-cell;
		text-align: center;
		padding: 6px 10px 8px 38px;
	}

	.menu-header ul li span {
		padding-bottom: 8px;
		letter-spacing: 1px;
		color: rgb(68, 68, 68);
		font-weight: 200;
	}

	.menu-header ul li span:hover {
		cursor: pointer;
	}

	.menu-header ul li span.active {
		border-bottom: 2px solid rgb(0, 133, 242);
		color: rgb(0, 133, 242)!important;
	}

</style>