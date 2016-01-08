<template>

	<div style="background: rgb(249, 245, 239);">
		
		<div class="col-md-6 col-md-offset-3">
			<div class="timeline" style="padding-top:12px;">
				
			</div>

		    <div class="timeline" v-for="item in cg">
				<div class="col-xs-2" style="padding-right:0px">
					<div class="timeline-author">
						<div style="background-image:url({{item.photo | photoNullToVision}})" class="imgdiv"></div>
					</div>
				</div>
				<div class="col-xs-10" style="padding-bottom:12px;">
					
					<div class="timeline-new content">

						<div class="timeline-content-header">
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
										{{item.likeCnt | numberToZero}}个收藏
									</li>
									<li @click="unlikeThis(item._id, index)">
										<span class="glyphicon glyphicon-heart-empty like-active"></span>
									</li>
									<li @click="transferThis(item._id)">
										<span class="glyphicon glyphicon-transfer"></span>
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

			cg: []

		},

		methods: {

			toSearchPage: function(name) {
				util.pathToSearch(name);
			},

			unlikeThis: function(id, index) {
				util.unlikeThisTheme(id, function() {
					
				});
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
