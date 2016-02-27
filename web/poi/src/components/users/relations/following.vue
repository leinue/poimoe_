<template>

	<div id="relations-container" style="background: rgb(249, 245, 239);">
		
		<div class="col-md-6 col-md-offset-3">
			<div class="timeline" style="padding-top:12px;">
				
			</div>

			<loading v-show="isLoaded == false"></loading>
			<nofo v-show="following.length === 0"></nofo>

			<div class="timeline a-bounceinB" v-for="user in following">
				<div class="col-xs-2" style="padding-right:0px">
					<div class="timeline-author">
						<div @click="toProfile(user._id)" style="background-image:url({{user.photo | photoNullToVision}})" class="imgdiv"></div>
					</div>
				</div>
				<div class="col-xs-10" style="padding-bottom:12px;">
					
					<div class="timeline-new content">

						<div class="timeline-content-header">
							<div class="header-left">
								{{user.username}}
							</div>
							<div class="header-right">
								<button @click="unfollowThis(user._id)" style="margin-top:-4px;" class="btn btn-default outline"><span class="glyphicon glyphicon-minus"></span> 取消关注</button>
							</div>
						</div>

						<div class="relations-img">
							<div class="col-md-4" v-for="cg in posts">
								<div @click="viewThisCG(cg._id)" class="timeline-new-section relations" style="background-image:url({{cg.image}})"></div>
							</div>
							<div v-show="user.posts.length === 0" class="col-md-12" style="padding:0px">
								<div class="timeline-new-section relations" style="background-image:url(https://img-sketch.secure.pixiv.net/c/c_180/uploads/medium/file/416074/7840959996393829039.png)"></div>
							</div>
						</div>

					</div>

				</div>
			</div>

		</div>
		
	</div>

</template>

<script>

	var util = require('../../../commons/scripts/commons.js');
	var nofo = require('../../error/nodata.vue');
	var loading = require('../../loading/loading.vue');

	export default {

		data() {

			return {
				following: [],

				isLoaded: false
			}

		},

		methods: {

			toProfile: function(uid) {
                router.go('/profile/' + uid);
			},

			viewThisCG: function(tid) {
                router.go('/view/' + tid);
			},

			unfollowThis: function(uid) {
				services.RelationsService.unfollow(localStorage._id, uid).then(function(res) {

					var code = res.data.code;
					var data = res.data.message;

					if(code != 200) {
						util.messageBox(data);
						return false;
					}

					util.messageBox(data);
					localStorage.followingCount = parseInt(localStorage.followingCount) - 1;

				}, function(err) {
					util.handleError(err);
				});
			}

		},

		components: {
			'nofo': nofo,
			'loading': loading
		},

		created() {

			var uid = router._currentRoute.params.uid;
			var _this = this;

			if(uid == localStorage._id) {
				nofo.props.content.default = "您暂时没有关注用户";
			}else {
				nofo.props.content.default = "该用户暂时没有关注用户";
			}


			var serviceInterval = setInterval(function() {

				if(typeof window.services != 'undefined') {

					clearInterval(serviceInterval);

					window.services.RelationsService.getAll(uid, 1, 10).then(function(res) {

						var code = res.data.code;
						var data = res.data.message;

						if(code != 200) {
							util.messageBox(data);
							return false;
						}

						_this.$set('following', data[0].follow);
						_this.$set('isLoaded', true);

					}, function(err) {
						util.handleError(err);
					});

				}

			}, 1);

		}

	}
	
</script>

<style>

	.timeline-new-section.relations {
		height: 180px!important;
	}

	.timeline-new-section.relations:hover {
		transform: none;
		box-shadow: none;
		cursor: pointer;
	}

	.relations-img {
		/*height:180px;*/
	}

	.relations-img .col-md-4 {
		padding-left: 0px;
		padding-right: 0px;
	}

</style>
