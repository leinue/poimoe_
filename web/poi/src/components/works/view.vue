<template>

	<div style="background: rgb(249, 245, 239);">
		
		<div class="col-md-6 col-md-offset-3 a-bounceinB">
			<div class="timeline" style="padding-top:12px;">
				
			</div>

		    <div class="timeline" v-for="item in cg">
				<div class="col-xs-2" style="padding-right:0px">
					<div @click="toProfile(item.user_id._id)" class="timeline-author">
						<div style="background-image:url({{item.user_id.photo | photoNullToVision}})" class="imgdiv"></div>
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
								{{item.user_id.username | nullToVisual}}
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
									<span @click="toSearchPage(tag.name)" v-for="tag in item.tag_list">#{{tag.name}}</span>
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
									<li v-show="item.user_id._id == myUid" @click="removeThisCG(item._id)">
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

</template>

<script>

	var util = require('../../commons/scripts/commons.js');

	export default {

		data() {

			return {
				cg: [],

				myUid: localStorage._id
			}

		},

		methods: {

			toSearchPage: function(name) {
				util.pathToSearch(name);
			},

			likeThis: function(tid, favourited, key) {
				if(!favourited) {
					util.likeThisTheme(tid, function(data) {});
				}else {
					util.unlikeThisTheme(tid, function(data) {});
				}
			},

			transferThis: function(id) {
				util.transferThis(id, function(data) {});
			},

			viewPeopleWhoLikeThis: function(id) {

			},

			removeThisCG: function(id) {
				util.removeThisCG(id, function(data) {});
			},

			toProfile: function(id) {
				util.toProfile(id);
			}

		},

		created() {

			var tid = router._currentRoute.params.id;

			var _this = this;

			if(tid != '') {

				var servicesInterval = setInterval(function() {

					if(typeof window.services != 'undefined') {

						clearInterval(servicesInterval);

						window.services.CGService.viewOne(tid).then(function(res) {

							var code = res.data.code;
							var data = res.data.message;

							if(code != 200) {
								util.messageBox(data);
								return false;
							}

							console.log(data);

							_this.$set('cg', data);

						}, function(err) {
							util.handleError(err);
						});

					}

				}, 1);

			}

		}

	}
	
</script>

<style>

</style>
