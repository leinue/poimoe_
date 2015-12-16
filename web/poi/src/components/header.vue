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
	      <a class="navbar-brand" v-link="{ path: '/list' }">Poimoe</a>
	    </div>

	    <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
	      <ul class="nav navbar-nav navbar-right">
	        <li><a>投稿</a></li>
	        <li><a @click="showRight = true">个人中心</a></li>
	      </ul>
	    </div><!-- /.navbar-collapse -->
	  </div><!-- /.container-fluid -->
	</nav>

  	<sidebar :show.sync="showRight" placement="right" header="Poimoe" :width="600">
  		<div class="side-profile">
		    <div class="side-profile-photo"></div>
		    <div class="side-profile-detail">
		    	<p style="margin-bottom:10px">ivy</p>
		    	<span class="description">注册膜法师</span>
		    	<p class="relations">
			    	<span>0 关注</span>
			    	<span>0 粉丝</span>
		    	</p>
		    </div>
		    <div class="side-profile-footer">
			    <div class="col-md-6 col-md-offset-3">
					<div class="side-profile-footer-content">
						<div class="col-xs-4 block">
							<p>0</p>
							<span>投稿</span>
						</div>
						<div class="col-xs-4 block">
							<p>0</p>
							<span>收藏</span>
						</div>
						<div class="col-xs-4 block">
							<p>0</p>
							<span>删除</span>
						</div>
					</div>			    	
			    </div>
		    </div>
  		</div>
  	</sidebar>

  	<div class="row" style="margin-right:0px">
  		<div class="col-xs-12" style="padding-left: 0px;padding-right: 0px">
  			<div class="menu-header" id="poi-header">
	  			<ul>
					<li route="/index"><span @click="pathTo('/index')" v-bind:class="menu.currentName != '/index' ? '' : 'active'">主页</span></span></li>
					<li route="/timeline"><span @click="pathTo('/timeline')" v-bind:class="menu.currentName != '/timeline' ? '' : 'active'">时间线</span></li>
					<li route="/works"><span @click="pathTo('/works')" v-bind:class="menu.currentName != '/works' ? '' : 'active'">我的投稿</span></li>
					<li route="/favourites"><span @click="pathTo('/favourites')" v-bind:class="menu.currentName != '/favourites' ? '' : 'active'">我的收藏</span></li>
	  			</ul>
  			</div>
  		</div>
	</div>

</template>

<script>

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
				var poiHeader = document.getElementById('poi-header');
				var ul = poiHeader.childNodes;
				var lis = ul.item(1).getElementsByTagName('li');

				for (var i = 0; i < lis.length; i++) {
					var li = lis[i];
					var route = li.getAttribute('route');
					var span = li.childNodes.item(0);

					span.setAttribute('class', '');
				};
				this.menu.currentName = path;
				router.go(path);
			}
		},

		created(obj) {
			var routerInterval = 0;
			routerInterval = setInterval(function() {
				if(router != null) {
					clearInterval(routerInterval);
					var currentRoute = router._currentRoute.path;

					var poiHeader = document.getElementById('poi-header');
					var ul = poiHeader.childNodes;
					var lis = ul.item(1).getElementsByTagName('li');

					for (var i = 0; i < lis.length; i++) {
						var li = lis[i];
						var route = li.getAttribute('route');
						var span = li.childNodes.item(0);

						span.setAttribute('class', '');
						if(currentRoute.indexOf(route) != -1) {
							span.setAttribute('class', 'active');
						}
					};

				}
			}, 1);
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
		padding-bottom: 8px;
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

	.side-profile-photo {
		width: 120px;
		height: 120px;
		border-radius: 50%;
		background-size: 100% 100%;
		background-image: url(http://i2.hdslb.com/u_user/c143946c2acf6e34e836bd9e24871ad7.jpg);
		background-position: center;
		background-repeat: no-repeat;
		margin: 0 auto;
	}

	.side-profile-detail {
		text-align: center;
		padding: 15px;
	}

	.side-profile-detail span.description {
		color: rgb(209, 202, 192)!important;
		font-size: .8em!important;
	}

	.side-profile-detail .relations {
		font-size:1em!important;
		margin-top:15px;
		font-weight:200;
	}

	.side-profile-detail .relations span:hover {
		cursor: pointer;
		color: rgb(0, 149, 219);
	}

	.side-profile-footer {
		height: 100%;
		padding-top: 20px;
		padding-bottom: 20px;
	}

	.aside .aside-dialog .aside-body {
		padding-left: 0px;
		padding-right: 0px;
	}

	.side-profile-footer-content {
		padding-top: 20px;
		border-top: 1px solid rgb(220, 220, 220);
		text-align: center;
		font-size: 1.2em!important;
		font-weight: 200!important;
	}

	.side-profile-footer-content p {
		font-size: 3em!important;
		font-weight: 200!important;
		margin-top: 10px;
		margin-bottom: 10px;
	}

	.side-profile-footer-content div.col-xs-4.block {
		transition: all .2s ease;
	}

	.side-profile-footer-content div.col-xs-4.block:hover {
		color: rgb(0, 149, 219)!important;
		cursor: pointer;
		transform: scale(1.1);
	}

</style>