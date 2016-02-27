<template>

	<div id="relations-container" style="background: rgb(249, 245, 239);">
		
		<div class="col-md-6 col-md-offset-3">
			<div class="timeline" style="padding-top:12px;">
				
			</div>

			<loading v-show="isLoaded == false"></loading>
			<nodata v-show="fans.length === 0"></nodata>

			<div class="timeline a-bounceinB" v-for="(key, fan) in fans">
				<div class="col-xs-2" style="padding-right:0px">
					<div class="timeline-author">
						<div style="background-image:url({{fan.photo | photoNullToVision}})" class="imgdiv"></div>
					</div>
				</div>
				<div class="col-xs-10" style="padding-bottom:12px;">
					
					<div class="timeline-new content">

						<div class="timeline-content-header">
							<div class="header-left">
								{{fan.username | nullToVisual}}
							</div>
							<div class="header-right">
								<button v-show="fan.followedByMe === false" @click="followThis(fan._id, key)" style="margin-top:-4px;" class="btn btn-default outline"><span class="glyphicon glyphicon-plus"></span> 关注</button>
								<button v-show="fan.followedByMe == true" @click="unfollowThis(fan._id, key)" style="margin-top:-4px;" class="btn btn-default outline"><span class="glyphicon glyphicon-minus"></span> 取消关注</button>
							</div>
						</div>

						<div class="relations-img">
							<div class="col-md-4" v-for="cg in fan.posts">
								<div @click="viewThisCG(cg._id)" class="timeline-new-section relations" style="background-image:url({{cg.image}})"></div>
							</div>
							<div v-show="fan.posts.length === 0" class="col-md-12" style="padding:0px">
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
	var nodata = require('../../error/nodata.vue');
	var loading = require('../../loading/loading.vue');

	export default {

		data() {

			return {

				fans: [],

				isLoaded: false

			}

		},

		methods: {

			viewThisCG: function(id) {
                router.go('/view/' + id);
			},

			unfollowThis: function(uid, key) {
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
					_this.fans.splice(key, 1);

				}, function(err) {
					util.handleError(err);
				});
			},

			followThis: function(uid, key) {

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
					_this.fans[key].followedByMe = false;

				}, function(err) {
					util.handleError(err);
				});

			}

		},

		components: {
			'nodata': nodata
		},

		created() {

			var uid = router._currentRoute.params.uid;
			var _this = this;

			if(uid == localStorage._id) {
				nodata.props.content.default = "您暂时没有粉丝";
			}else {
				nodata.props.content.default = "该用户暂时没有粉丝";				
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

						_this.$set('fans', data[0].follower);
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
