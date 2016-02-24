<template>

	<div>
		<div class="side-profile a-bounceinT" style="margin-top:15px;">
		    <div class="side-profile-photo" style="{{photo | photoNullToVision}}"></div>

		    <div class="side-profile-detail">
		    	<p style="margin-bottom:10px">{{username}}</p>
		    	<span class="description">{{introduction}}</span>
		    	<div style="padding-top:15px;">
					<button v-show="uid != myUid && !followedByMe" @click="followThisUser(uid)" style="margin-top:-4px;" class="btn btn-default outline"><span class="glyphicon glyphicon-plus"></span> 关注</button>
					<button v-show="uid != myUid && followedByMe == true" @click="unFollowThisUser(uid)" v-show="uid != myUid" style="margin-top:-4px;" class="btn btn-default outline"><span class="glyphicon glyphicon-minus"></span> 取消关注</button>
		    	</div>
		    	<p class="relations">
			    	<span @click="toFollowing(uid)">{{followingCount}} 关注</span>
			    	<span @click="toFollower(uid)">{{followerCount}} 粉丝</span>
		    	</p>
		    </div>

		    <div class="side-profile-footer">
			    <div class="col-md-6 col-md-offset-3">
					<div class="side-profile-footer-content">
						<div @click="loadUserDrafts()" class="col-xs-3 block">
							<p>{{draftsCount}}</p>
							<span>投稿</span>
						</div>
						<div @click="loadUserFavourites()" class="col-xs-3 block">
							<p>{{favouritesCount}}</p>
							<span>收藏</span>
						</div>
						<div @click="loadUserTransfer()" class="col-xs-3 block">
							<p>{{transferCount}}</p>
							<span>转发</span>
						</div>
						<div class="col-xs-3 block">
							<p>{{deletedCount}}</p>
							<span>删除</span>
						</div>
					</div>			    	
			    </div>
		    </div>
			<div class="col-md-6 col-md-offset-3" style="margin-top:25px;">
			    <nodata v-show="userItems.length === 0"></nodata>
				<div class="timeline a-bounceinB" v-for="item in userItems">
					<div class="col-xs-2" style="padding-right:0px">
						<div class="timeline-author">
							<div style="{{photo | photoNullToVision}}" class="imgdiv"></div>
						</div>
					</div>
					<div class="col-xs-10" style="padding-bottom:12px;">
						
						<div class="timeline-new content">

							<div class="timeline-content-header">
								<div v-show="item.isRepost == true" class="timeline-transfer">
									<span class="glyphicon glyphicon-transfer" style="color:rgb(241, 130, 39);"></span>
									<span class="timeline-transfer-name" style="font-size: 12px;">{{item.reposterName | nullToVisual}}</span>
									<div class="header-right" style="font-size:10px;">
										{{item.repost.updatedAt | nullToVisual}}
									</div>
								</div>
								<div class="header-left">
									{{username}}
								</div>
								<div class="header-right">
									{{item.updatedAt}}
								</div>
							</div>

							<div class="timeline-new-section" style="background-image:url({{item.image}})"></div>

							<div class="timeline-content-footer">
								<div class="timeline-content">
									<span>{{item.content}}</span>
									<div class="timeline-tags">
										<span @click="pathToSearch(tag.name)" v-for="tag in item.tag_list">#{{tag.name}}</span>
									</div>
								</div>
								<div class="timeline-real-footer">
									<ul>
										<li @click="viewPeopleWhoLikeThis(item._id)">
											{{item.favouritesCount | numberToZero}}个收藏
										</li>
										<li @click="likeThis(item._id, item.favourited, key)">
											<span class="glyphicon glyphicon-heart-empty" v-bind:class="item.favourited == true ? 'like-active' : ''"></span>
										</li>
										<li @click="transferThis(item._id)">
											<span class="glyphicon glyphicon-transfer" v-bind:class="item.reposted == true ? 'transfer-active' : ''"></span>
										</li>
										<li @click="removeThisCG(item._id)">
											<span class="glyphicon glyphicon-trash"></span>
										</li>
									</ul>
								</div>
							</div>

						</div>

					</div>
				</div>
			</div>

		</div>

		<div class="page">
		    <router-view transition="expand"></router-view>
		</div>
	</div>

</template>

<script>

	var util = require('../../commons/scripts/commons.js');
	var filters = require('../../filters/index.js');
	var nodata = require('../error/nodata.vue');

	export default {

		data() {

			return {

				draftsCount: 0,
				favouritesCount: 0,
				deletedCount: 0,
				transferCount: 0,

				followingCount: 0,
				followerCount: 0,

				username: '',
				introduction: '',
				photo: '',
				uid: '',
				myUid: localStorage._id,

				followedMe: false,
				followedByMe: false,

				userItems: [],
				currentPage: 1

			};

		},

		created() {
			
			var uid = router._currentRoute.params.uid;

			var _this = this;

			if(localStorage.login == 'false') {
				nodata.props.content.default = "您还没有登录，暂时无法查看数据:)";
			}else {
				nodata.props.content.default = "该用户没有内容:)";
			}

			if(uid != '') {

				var servicesInterval = setInterval(function() {

					if(typeof window.services != 'undefined') {

						clearInterval(servicesInterval);

						window.services.UserService.getProfile(uid).then(function(res) {

							var code = res.data.code;
							var data = res.data.message;

							if(code != 200) {
								util.handleError(data);
								return false;
							}

							console.log(data);

							var profile = data.user;

							_this.$set('draftsCount', data.draftCount);
							_this.$set('favouritesCount', data.favouritesCount);
							_this.$set('deletedCount', data.deletedCount);
							_this.$set('username', profile.username);
							_this.$set('introduction', profile.intro);
							profile.photo = filters.get('photoNullToVision')(profile.photo);
							_this.$set('photo', 'background-image:url(' + profile.photo + ')');
							_this.$set('uid', profile._id);
							_this.$set('followedMe', data.followedMe);
							_this.$set('followedByMe', data.followedByMe);

							_this.$set('followerCount', data.user.followerCount);
							_this.$set('followingCount', data.user.followingCount);

							_this.$get('loadUserDrafts')();
							_this.$get('loadUserTransferCount')();

						}, function(err) {
							console.log(err);
							util.handleError(err);
						});
					}

				}, 1);

			}

		},

		components: {
			'nodata': nodata
		},

		methods: {

			pathTo: function(path) {
				util.cancelActiveMenu();
				router.go(path);
			},

			followThisUser: function(uid) {

				var _this = this;

				services.RelationsService.follow(this.myUid, uid).then(function(res) {

					var code = res.data.code;
					var data = res.data.message;

					if(code != 200) {
						util.messageBox(data);
						return false;
					}

					util.messageBox(data);
					localStorage.followingCount = parseInt(localStorage.followingCount) + 1;
					_this.followedByMe = true;
					_this.followerCount ++;

				}, function(err) {
					util.handleError(err);
				});

			},

			toFollowing: function(id) {
				router.go('/relations/following/' + id);
			},

			toFollower: function(id) {
				router.go('/relations/follower/' + id);
			},

			unFollowThisUser: function(uid) {

				var _this = this;

				services.RelationsService.unfollow(localStorage._id, uid).then(function(res) {

					var code = res.data.code;
					var data = res.data.message;

					if(code != 200) {
						util.messageBox(data, true);
						return false;
					}

					util.messageBox(data);
					localStorage.followingCount = parseInt(localStorage.followingCount) - 1;
					_this.followedByMe = false;
					_this.followerCount --;
					if(_this.followerCount < 0) {
						_this.followerCount = 0;
					}

				}, function(err) {
					util.handleError(err);
				});
			},

			loadUserFavourites: function() {
				var _this = this;

				services.UserService.getFavouritesList(this.uid, this.currentPage, 10).then(function(res) {

					var code = res.data.code;
					var data = res.data.message;

					if(code != 200) {
						util.messageBox(data, true);
						return false;
					}

					_this.userItems = data;

					if(data.length === 0) {
						util.messageBox('该用户没有内容:)');
					}

				}, function(err) {
					util.handleError(err);
				});
			},

			loadUserDrafts: function() {
				var _this = this;

				services.CGService.getByUid(this.uid, this.currentPage, 10).then(function(res) {

					var code = res.data.code;
					var data = res.data.message;

					if(code != 200) {
						util.messageBox(data, true);
						return false;
					}

					_this.userItems = data;

					if(data.length === 0) {
						util.messageBox('该用户没有内容:)');
					}

				}, function(err) {
					util.handleError(err);
				});
			},

			loadUserTransfer: function() {
				var _this = this;

				services.CGService.getUserTransferByUid(this.uid, this.currentPage, 10).then(function(res) {

					var code = res.data.code;
					var data = res.data.message;

					if(code != 200) {
						util.messageBox(data, true);
						return false;
					}

					if(data.length === 0) {
						util.messageBox('该用户没有内容:)');
					}

					_this.userItems = data;

				}, function(err) {
					util.handleError(err);
				});				
			},

			loadUserTransferCount: function() {
				var _this = this;

				services.CGService.getUserTransferCountByUid(this.uid).then(function(res) {

					var code = res.data.code;
					var data = res.data.message;

					if(code != 200) {
						util.messageBox(data, true);
						return false;
					}

					_this.transferCount = data;

				}, function(err) {
					util.handleError(err);
				});				
			}

		}
	}

</script>

<style>

</style>