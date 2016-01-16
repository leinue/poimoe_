<template>

<div class="col-md-6 col-md-offset-3">
	<div class="timeline" style="padding-top:12px;">
		<div class="col-xs-2" style="padding-right:0px">
			<div class="timeline-author">
				<div style="{{myPhoto}}" class="imgdiv"></div>
			</div>
		</div>
		<div class="col-xs-10" style="padding-bottom:18px;">
			<div class="timeline-new">
				<div @click="toNewCGPage()" class="new-timeline">
					<span class="glyphicon glyphicon-pencil"></span><span> 描绘你的世界</span>
				</div>
				<span class="normal">或</span>
				<div class="new-timeline">
					<span> 分享你的世界</span>					
				</div>
			</div>
		</div>
	</div>

	<div class="timeline">
		<div class="col-xs-10 col-xs-offset-2">
			 <div class="timeline-new content newtime">
			 	有15条新消息
			 </div>
		</div>
	</div>

	{{loadPublicTimeline()}}

	<div class="timeline" v-for="item in publicTimeline">
		<div class="col-xs-2" style="padding-right:0px">
			<div class="timeline-author">
				<div style="background-image: url({{item.user_id.photo | photoNullToVision}})" class="imgdiv"></div>
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
						{{item.user_id.username}}
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
							<span v-for="tag in item.tag_list">#{{tag.name}}</span>
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

</template>

<script>

	var util = require('../../commons/scripts/commons.js');

	export default {
		data() {
			return {
				publicTimeline: {},
				myPhoto: 'background-image: url(' + localStorage.photo + ')!important;',

				myUid: localStorage._id
			}
		},
		components: {

		},
		methods: {
			toNewCGPage: function() {
				util.cancelActiveMenu();
				router.go('/cg/new');
			},

			loadPublicTimeline: function() {

				var _this = this;

				services.CGService.getAll(1, 10).then(function(res) {
				
					var data = res.data.message;
					var code = res.data.code;

					if(code != 200) {
						util.messageBox(data);
						return false;
					}

					_this.publicTimeline = data;

				}, function(err) {
					util.handleError(err);
				});

			},

			likeThis: function(tid, favourited, key) {
				if(!favourited) {
					util.likeThisTheme(tid, function(data) {

					});
				}else {
					util.unlikeThisTheme(tid, function(data) {

					})
				}
			},

			transferThis: function(id) {
				util.transferThis(id, function(data) {});
			},

			removeThisCG: function(id) {
				util.removeThisCG(id, function(data) {});
			}

		}
	};


</script>

<style>
	

</style>
