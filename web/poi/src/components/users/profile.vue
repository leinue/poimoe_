<template>

	<div>
		<div class="side-profile" style="margin-top:15px;">
		    <div class="side-profile-photo" style="{{photo | photoNullToVision}}"></div>
		    <div class="side-profile-detail">
		    	<p style="margin-bottom:10px">{{username}}</p>
		    	<span class="description">{{introduction}}</span>
		    	<div style="padding-top:15px;">
					<button v-show="uid != myUid && !followedByMe" @click="followThisUser(uid)" style="margin-top:-4px;" class="btn btn-default outline"><span class="glyphicon glyphicon-plus"></span> 关注</button>
					<button v-show="uid != myUid && followedByMe == true" @click="unFollowThisUser(uid)" v-show="uid != myUid" style="margin-top:-4px;" class="btn btn-default outline"><span class="glyphicon glyphicon-minus"></span> 取消关注</button>
		    	</div>
		    	<p class="relations">
			    	<span @click="toFollowing()">{{followingCount}} 关注</span>
			    	<span @click="toFollower()">{{followerCount}} 粉丝</span>
		    	</p>
		    </div>
		    <div class="side-profile-footer">
			    <div class="col-md-6 col-md-offset-3">
					<div class="side-profile-footer-content">
						<div @click="pathTo('/works')" class="col-xs-4 block">
							<p>{{draftsCount}}</p>
							<span>投稿</span>
						</div>
						<div @click="pathTo('/favourites')" class="col-xs-4 block">
							<p>{{favouritesCount}}</p>
							<span>收藏</span>
						</div>
						<div @click="pathTo('')" class="col-xs-4 block">
							<p>{{deletedCount}}</p>
							<span>转发</span>
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

	export default {

		data() {

			return {

				draftsCount: 0,
				favouritesCount: 0,
				deletedCount: 0,

				followingCount: 0,
				followerCount: 0,

				username: '',
				introduction: '',
				photo: '',
				uid: '',
				myUid: localStorage._id,

				followedMe: false,
				followedByMe: false

			};

		},

		created() {
			
			var uid = router._currentRoute.params.uid;

			var _this = this;

			if(uid != '') {

				var servicesInterval = setInterval(function() {

					if(typeof window.services != 'undefined') {

						clearInterval(servicesInterval);

						window.services.UserService.getProfile(uid).then(function(res) {

							var code = res.data.code;
							var data = res.data.message;

							if(code != 200) {
								util.messageBox(data);
								return false;
							}

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

						}, function(err) {
							util.handleError(err);
						});
					}

				}, 1);

			}

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

				}, function(err) {
					util.handleError(err);
				});

			},

			unFollowThisUser: function(uid) {

				var _this = this;

				services.RelationsService.unfollow(localStorage._id, uid).then(function(res) {

					var code = res.data.code;
					var data = res.data.message;

					if(code != 200) {
						util.messageBox(data);
						return false;
					}

					util.messageBox(data);
					localStorage.followingCount = parseInt(localStorage.followingCount) - 1;
					_this.followedByMe = false;

				}, function(err) {
					util.handleError(err);
				});
			}

		}
	}

</script>

<style>

</style>