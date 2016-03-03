<template>

	{{init()}}

	<div id="alert-success" role="alert" class="alert alert-success top displaynone" style="width: 400px;"><button @click="hideThisSuccessAlert()" type="button" class="close"><span>×</span></button><span class="glyphicon glyphicon-ok-sign"></span>
		  <strong>提示信息</strong>
		  <p id="success-tips"></p>
	</div>

	<div id="alert-danger" role="alert" class="alert alert-danger top displaynone" style="width: 400px;"><button @click="hideThisDangerAlert()" type="button" class="close"><span>×</span></button><span class="glyphicon glyphicon-info-sign"></span>
		  <strong>服务器提了一个问题</strong>
		  <p id="danger-tips" style="margin-left: 47px;"></p>
	</div>

    <div @click="pathTo('/index')" id="main-page" class="type-circle header-circle active" v-bind:class="currentPage == 'public' ? 'active' : ''">
        <span class="glyphicon glyphicon-home"></span>
    </div>

    <div @click="pathTo('/search')" id="search-button" class="type-circle header-circle">
        <span class="glyphicon glyphicon-search"></span>
    </div>

	<div v-show="isLogin == 'true'" title="发布CG" @click="pathToNewCGPage()" id="newcg-button" class="type-circle header-circle right">
        <span class="glyphicon glyphicon-plus"></span>
    </div>

	<div v-show="isLogin == 'true'" @click="showMyProfile()" id="userprofile-button" class="type-circle header-circle right">
        <span class="glyphicon glyphicon-user"></span>
    </div>

    <div v-show="isLogin == 'true'" @click="showNotifications()" id="usernoti-button" class="type-circle header-circle right">
    	<div v-show="notificationCount > 0 || notificationCount == '99+'" class="noti-tip">
    		<span>{{notificationCount}}</span>
    	</div>
    	<span class="glyphicon glyphicon-bell"></span>
    </div>

	<div v-show="isLogin == 'true'" @click="logout()" id="exit-button" class="type-circle header-circle right">
        <span class="glyphicon glyphicon-log-out"></span>
    </div>

    <div v-show="isLogin == 'false'" title="登录" @click="toLogin()" id="usernoti-button" class="type-circle header-circle right">
    	<span class="glyphicon glyphicon-log-in"></span>
    </div>

	<div v-show="isLogin == 'false'" title="注册" @click="toRegister()" id="exit-button" class="type-circle header-circle right">
        <span class="glyphicon glyphicon-plus"></span>
    </div>

    <div class="notification-center {{boncein}}">
    	<ul>
    		<li v-for="noti in notificationsList">
    			<div @click="pathToProfile(noti.operator._id)" class="avatar" style="background-image: url({{noti.operator.photo}});"></div>
    			<div class="body">
    				<span><a @click="pathToProfile(noti.operator._id)">{{noti.operator.username}}</a> {{noti.did | notificationActionFilter}}了您的分享 </span>
    				<span class="time">{{noti.createdAt}}</span>
    			</div>
    			<div @click="pathToCG(noti.targetTheme._id)" class="noti-item" style="background-image: url({{noti.targetTheme.image}});"></div>
    		</li>
    		<li>
    			<div @click="pathToNotifications()" class="body more"><a>查看更多</a></div>
    		</li>
    	</ul>
    </div>

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
	      <ul class="nav navbar-nav navbar-right" id="profile-menu">
	        <!-- <li @click="pathToNewCGPage()"><a>投稿</a></li>
	        <li v-show="isLogin == 'true'"><a @click="showMyProfile()">个人中心</a></li> 
	       	<li v-show="isLogin == 'false'" @click="toLogin()"><a>登录</a></li>
	       	<li v-show="isLogin == 'false'" @click="toRegister()"><a>注册</a></li>
	       	<li v-show="isLogin == 'true'" @click="logout()"><a>退出</a></li> -->
	      </ul>
	    </div><!-- /.navbar-collapse -->
	  </div><!-- /.container-fluid -->
	</nav>

	<style type="text/css">
		.imghead {filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod=image);}
	</style>

  	<sidebar :show.sync="showRight" placement="right" header="Poimoe" :width="600">
  		<div class="side-profile">
  			<span title="修改资料" v-show="!editable" class="glyphicon glyphicon-pencil" @click="modifyProfile()" id="modify-pencil" style="padding-left:15px"></span>
  			<span title="同步资料" class="glyphicon glyphicon-refresh" @click="syncProfile()" style="padding-left:15px;" id="modify-pencil"></span>
  			<span title="详细资料" class="glyphicon glyphicon-home" @click="toDetailProfile()" id="modify-pencil" style="padding-left:15px;"></span>
  		  	<span title="确认修改" v-show="editable" class="glyphicon glyphicon-ok" @click="confirmToModifyProfile()" id="modify-pencil" style="padding-left:15px"></span>
		  	<span title="取消修改" v-show="editable" class="glyphicon glyphicon-remove" @click="cancelModifyProfile()" id="modify-pencil" style="padding-left:15px"></span>
			<form style="display:none" enctype="multipart/form-data" method="post" target="pupload" v-bind:action="photoUploadAction" > 
	    		<input type="file" id="imgbtn-source" name="upfile" v-on:change="previewImage()" />
				<input id="submit-photo-btn" type="submit" /> 
			</form>
			<iframe style="display:none" id="photo-ifr" name="pupload"></iframe>
		    <div @click="uploadMyPhoto()" class="side-profile-photo" style="{{photo}}">
		    	<div v-show="editable" id="photo-outer">
	    			<img class="side-profile-photo imghead" id="photo-inner" width="100" height="100" border="0">
				</div>
		    </div>
		    <div class="side-profile-detail">
		    	<div>
   			    	<p style="margin-bottom:10px" v-on:DblClick="modifyProfile()">{{username | nullToVisual}}</p>
			    	<div class="col-md-6 col-md-offset-3">
				    	<input class="form-control" v-model="username" placeholder="想叫个什么呢？" v-show="editable" type="text"/>
			    	</div>
		    	</div>
		    	<div>
			    	<div class="col-md-6 col-md-offset-3">
					    <span class="description" v-on:DblClick="modifyProfile()" placeholder="一句话描述自己">{{introduction | nullToVisual}}</span>
				    	<textarea v-model="introduction" class="form-control" v-show="editable">{{introduction}}</textarea>
			    	</div>
		    	</div>
		    	<div style="margin-bottom:25px;" class="col-md-6 col-md-offset-3">
			    	<p class="relations">
				    	<span @click="toFollowing()">{{followingCount}} 关注</span>
				    	<span @click="toFollower()">{{followerCount}} 粉丝</span>
			    	</p>		    		
		    	</div>
		    </div>
		    <div class="side-profile-footer">
			    <div class="col-md-6 col-md-offset-3">
					<div class="side-profile-footer-content">
						<div @click="pathToAndCloseThis('/works')" class="col-xs-4 block">
							<p>{{draftsCount}}</p>
							<span>投稿</span>
						</div>
						<div @click="pathToAndCloseThis('/favourites')" class="col-xs-4 block">
							<p>{{favouritesCount}}</p>
							<span>收藏</span>
						</div>
						<div @click="pathToAndCloseThis('')" class="col-xs-4 block">
							<p>{{deletedCount}}</p>
							<span>删除</span>
						</div>
					</div>			    	
			    </div>
		    </div>
  		</div>
  	</sidebar>

  	<div class="row" style="margin-right:0px;margin-bottom:15px;">
  		<div class="col-md-6 col-md-offset-3" style="padding-left: 0px;padding-right: 0px">
  			<div class="menu-header" id="poi-header" style="background-color: rgb(249, 245, 239)">
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

	var util = require('../commons/scripts/commons.js');

	export default {
		data() {
			return {
				msg: 'hello from header.vue',
				showRight: false,
				menu: {
					currentName: 'index'
				},

				username: localStorage.username,
				introduction: localStorage.introduction,
				photo: 'background-image: url(' + localStorage.photo + ');',
				photoSrc: localStorage.photo,

				editable: false,

				draftsCount: localStorage.draftsCount,
				favouritesCount: localStorage.favouritesCount,
				deletedCount: localStorage.deletedCount,

				followerCount: localStorage.followerCount,
				followingCount: localStorage.followingCount,

				notificationCount: 0,
				realNofiticationCount: 0,

				boncein: '',

				notificationsList: [],

				newPhoto: false,

				photoUploadAction: ''
			};
		},

		methods: {
			init: function() {
				this.isLogin = localStorage.login;

				if(this.isLogin == 'true') {
					this.startNotificationComet();					
				}

				if(document.domain == 'localhost') {
					this.photoUploadAction = 'http://image.poimoe.com/upload.php?uid=' + localStorage._id + '/photo&cors=true&corsurl=http://localhost:8080/upload.html';
				}else {
					this.photoUploadAction = 'http://image.poimoe.com/upload.php?uid=' + localStorage._id + '/photo&cors=true&corsurl=http://poi.poimoe.com/upload.html';
				}
			},

			hideThisDangerAlert: function() {
				util.hideMessageBox('alert-danger');
			},

			hideThisSuccessAlert: function() {
				util.hideMessageBox('alert-success');
			},

			pathTo: function(path){
				util.cancelActiveMenu();
				this.menu.currentName = path;
				router.replace(path);
			},

			pathToAndCloseThis: function(path) {
				this.pathTo(path);
				this.showRight = false;
			},

			pathToNewCGPage: function() {
				util.cancelActiveMenu();
				router.go('/cg/new');
			},

			toLogin: function() {
				util.cancelActiveMenu();
				router.go({
					path: '/login',
					params: {
						prev: router.path
					}
				});
			},

			toRegister: function() {
				util.cancelActiveMenu();
				router.go({
					path: '/register',
					params: {
						prev: router.path
					}
				});
			},

			toFollowing: function() {
				this.pathToAndCloseThis('/relations/following/' + localStorage._id);
			},

			toFollower: function() {
				this.pathToAndCloseThis('/relations/follower/' + localStorage._id);
			},

			logout: function() {

				var _this = this;

				services.UserService.logout().then(function(res) {

					var data = res.data;

					util.messageBox(data.message);

					if(data.code == 200 || data.code == 4001) {
						util.logout();
						_this.isLogin = 'false';
						_this.pathToAndCloseThis('/index');
					}

				}, function(err) {
					util.handleError(err);
				});
				
			},

			modifyProfile: function() {
				this.editable = !this.editable;
			},

			cancelModifyProfile: function() {
				this.editable = false;
			},

			confirmToModifyProfile: function() {

				var _this = this;

				_this.uploadPhoto(function(picJSON) {

					console.log(picJSON);

					localStorage.photo = picJSON.message.preview;
					_this.photoSrc = localStorage.photo;
					_this.photo = 'background-image: url(' + localStorage.photo + ');';

					services.UserService.modifyProfile({
						uid: localStorage._id,
						sex: localStorage.sex,
						photo: localStorage.photo,
						intro: _this.introduction,
						region: localStorage.region,
						username: _this.username
					}).then(function(res) {

						var code = res.data.code;
						var data = res.data.message;

						if(code != 200) {
							util.messageBox(data, true);
							return false;
						}

						util.messageBox(data);
						_this.editable = false;
						localStorage.username = _this.username;
						localStorage.introduction = _this.introduction;

					}, function(err) {
						util.handleError(err);
					});

				});
			},

			uploadPhoto: function(cb) {
				if(this.newPhoto) {
					util.syncUploadPic('submit-photo-btn', 'photo-ifr', function(picJSON) {
						cb(picJSON);
		        	});
				}else {
					cb({
						code: 200,
						message: {
							preview: localStorage.photo
						}
					});
				}
			},

			syncProfile: function() {

				this.showRight = false;

				var _this = this;

				services.UserService.countDraft(localStorage._id).then(function(res) {

					var code = res.data.code;
					var data = res.data.message;

					if(code != 200) {
						util.messageBox(data);
						return false;
					}

					localStorage.draftsCount = data;
					_this.draftsCount = localStorage.draftsCount;

				}, function(err) {
					util.handleError(err);
				});

				services.UserService.countFavourites(localStorage._id).then(function(res) {

					var code = res.data.code;
					var data = res.data.message;

					if(code != 200) {
						util.messageBox(data);
						return false;
					}

					localStorage.favouritesCount = data;
					_this.favouritesCount = localStorage.favouritesCount;

				}, function(err) {
					util.handleError(err);
				});

				services.UserService.countDeleted(localStorage._id).then(function(res) {

					var code = res.data.code;
					var data = res.data.message;

					if(code != 200) {
						util.messageBox(data);
						return false;
					}

					localStorage.deletedCount = data;
					_this.deletedCount = localStorage.deletedCount;

				}, function(err) {
					util.handleError(err);
				});

				services.UserService.countFo(localStorage._id).then(function(res) {

					var code = res.data.code;
					var data = res.data.message;

					if(code != 200) {
						util.messageBox(data);
						return false;
					}

					localStorage.followingCount = data.following;
					localStorage.followerCount = data.follower;

					_this.followingCount = data.following;
					_this.followerCount = data.follower;

					_this.showRight = true;

				}, function(err) {
					util.handleError(err);
				});
			},

			toDetailProfile: function() {
				this.pathToAndCloseThis('/profile/' + localStorage._id);
			},

			showMyProfile: function() {
				var _this = this;
				_this.showRight = true;

				if(typeof localStorage.draftsCount == 'undefined' || typeof localStorage.followingCount == 'undefined' || localStorage.reLogin == 'true') {

					_this.syncProfile();
					localStorage.reLogin = false;

				}else {

					_this.deletedCount = localStorage.deletedCount;
					_this.favouritesCount = localStorage.favouritesCount;
					_this.draftsCount = localStorage.draftsCount;

					_this.followingCount = localStorage.followingCount;
					_this.followerCount = localStorage.followerCount;
				}

			},

			previewImage: function() {
				var img = util.previewImage('imgbtn-source', 'photo-outer', 'photo-inner', 'side-profile-photo', 'margin-top:0px;');
			},

	        uploadMyPhoto: function() {
	        	this.editable = true;
	        	this.newPhoto = true;
	        	document.getElementById("imgbtn-source").click();	        		
	        },

	        showNotifications: function() {

	        	var _this = this;

	        	if(this.boncein != 'a-bouncein') {
		        	services.TimelineService.getPersonalMessage(localStorage._id, 1, 4).then(function(res) {

		        		var code = res.data.code;
		        		var data = res.data.message;

		        		if(code != 200) {
		        			util.messageBox(data);
		        		}

		        		_this.notificationsList = data;
		        		console.log(_this.notificationsList);

		        	}, function(err) {
		        		util.handleError(err);
		        	});	        		
	        	}
	        	this.boncein = this.boncein == 'a-bouncein' ? '' : 'a-bouncein';
	        },

	        startNotificationComet: function() {
				var _this = this;

				var es = new EventSource('http://api.poimoe.com/timeline/message/personal/count/' + localStorage._id);

				es.onmessage = function(e) {
					_this.notificationCount = JSON.parse(e.data).message;
					_this.realNofiticationCount = _this.notificationCount;
					if(_this.notificationCount >= 100) {
						_this.realNofiticationCount = '99+';
					}
				};

				es.onerror = function(e) {
					util.handleError('comet服务出错');
				};

				es.onopen = function(e) {}
	        },

	        pathToNotifications: function() {
	        	util.cancelActiveMenu();
	        	router.go('/notifications');
	        	this.boncein = '';
	        },

	        pathToCG: function(id) {
	        	this.pathTo('/view/' + id);
	        },

	        pathToProfile: function(id) {
	        	this.pathTo('/profile/' + id);
	        }

		},

        props: {
            isLogin: {
                type: String,
                default: localStorage.login
            }
        },

		created() {
			var routerInterval = 0;
			routerInterval = setInterval(function() {
				if(router != null) {
					clearInterval(routerInterval);
					var currentRoute = router._currentRoute.path;

					var poiHeader = document.getElementById('poi-header');
					var ul = poiHeader.childNodes;

					if(ul.item(1) != null){
						var lis = ul.item(1).getElementsByTagName('li');
					}else {
						var lis = ul.item(0).getElementsByTagName('li');
					}

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

			setInterval(function() {

				// var login = localStorage.login;

				// console.log(login);

				// if(login == 'true') {

				// 	var pm = document.getElementById('profile-menu');

				// 	var pmLi = pm.getElementsByTagName('li');

				// 	for (var i = 0; i < pmLi.length; i++) {
				// 		var curr = pmLi[i];

				// 		var currStyle = curr.getAttribute('style');

				// 		if(currStyle != null ){
				// 			if(currStyle.indexOf('none') != -1) {
				// 				curr.setAttribute('style', '');
				// 			}
				// 		}

				// 	};

				// }

			}, 1000);
		}

	};

</script>	

<style>
	
	.header-circle {
		width: 40px!important;
		height: 40px!important;
		line-height: 40px!important;
	}

	.menu-header {
		display: table;
		margin-top: -19px;
		width: 100%;
	}

	.menu-header ul{
		list-style: none;
		display: table-row;
	}

	.menu-header ul li {
		display: table-cell;
		text-align: center;
		padding-top: 8px;
		width: 25%;
	}

	.menu-header ul li span {
		padding-top: 8px;
		letter-spacing: 1px;
		color: rgb(68, 68, 68);
		font-weight: 200;
	}

	.menu-header ul li span:hover {
		cursor: pointer;
		border-top: 2px solid rgb(55, 62, 82);
	}

	.menu-header ul li span.active {
		border-top: 2px solid rgb(0, 133, 242);
		color: rgb(0, 133, 242)!important;
	}

	.side-profile-photo {
		width: 120px;
		height: 120px;
		border-radius: 50%;
		background-size: cover;
		background-position: center;
		background-repeat: no-repeat;
		margin: 0 auto;
		cursor: pointer;
		transition: all .3s ease;
	}

	.side-profile-photo:hover {
		transform: scale(1.05, 1.05);
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
		/*padding-bottom: 20px;*/
	}

	.aside .aside-dialog .aside-body {
		padding-left: 0px;
		padding-right: 0px;
	}

	.side-profile-footer-content {
		padding-top: 20px;
		border-top: 1px solid rgb(0, 149, 219);
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

	.side-profile-footer-content div.col-xs-3.block {
		transition: all .2s ease;
		cursor: pointer!important;
	}

	.side-profile-footer-content div.col-xs-3.block:hover {
		color: rgb(0, 149, 219)!important;
		cursor: pointer;
		transform: scale(1.1);
	}

	#modify-pencil:hover {
		cursor: pointer;
		color: rgb(35, 119, 186);
	}

	#main-page {
		top: 15px;
		left: 20px;
	}

	#search-button {
		top: 15px;
		left: 70px;
	}

	.type-circle.right {
		top: 5px;
		right: 0!important;
	}

	#newcg-button {
		right: 170px!important;
		top: 15px;
	}

	#exit-button {
		right: 20px!important;
		top: 15px;
	}

	#userprofile-button {
		right: 120px!important;
		top: 15px;
	}

	#usernoti-button {
		right: 70px!important;
		top: 15px;
	}

	.noti-tip {
		background: rgb(207, 0, 31);
		position: absolute;
		border: none;
		width: 18px;
		height: 18px;
		border-radius: 9px;
		line-height: 18px;
		margin-left: 24px;
		color: white;
		font-size: 12px;
		letter-spacing: .1px;
	}

	.notification-center {
		background: rgb(255, 255, 255);
		width: 280px;
		position: fixed;
		right: 20px; 
		font-size: 12px;
		line-height: 15px;
		border-radius: 4px;
		max-height: 360px;
		top: 66px;
		z-index: 3000;
		box-shadow: 0 0 15px rgba(99, 75, 37, 0.1);
		opacity: 0;
		display: none;
	}

	.notification-center ul {
		width: 100%;
		height: 100%;
		padding: 0px;
	}

	.notification-center ul li {
		padding: 10px;
		border-bottom: 1px solid rgba(46, 151, 216, 0.12);
	}

	.notification-center ul li a {
		cursor: pointer;
	}

	.notification-center ul li .avatar {
		width: 40px;
		height: 40px;
		border-radius: 20px;
		background-color: #FFFFFF;
		background-size: cover;
		background-repeat: no-repeat;
		background-position: 50% 50%;
		cursor: pointer;
	}

	.notification-center ul li .body {
		display: inline-block;
		vertical-align: top;
		padding-top: 8px;
		padding-left: 50px;
		padding-right: 50px;
		margin-top: -40px;
	}

	.notification-center ul li .body.more {
		width: 100%;
		text-align: center;
		vertical-align: middle;
		margin-top: -4px;
	}

	.notification-center ul li .body .time {
		color: #d0cac1;
		font-size: 10px;
		display: block;
	}

	.notification-center ul li .noti-item {
		width: 40px;
		height: 40px;
		background-color: #FFFFFF;
		background-size: cover;
		background-repeat: no-repeat;
		background-position: 50% 50%;
		position: absolute;
		margin-top: -55px;
		margin-left: 220px;
		vertical-align: top;
		cursor: pointer;
	}

</style>
