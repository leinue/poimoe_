<template>

<div class="bg">

	<div class="col-md-6 col-md-offset-3">
		<div class="timeline" style="padding-top:12px;">
			<div class="col-xs-2" style="padding-right:0px">
				<div class="timeline-author">
					<div style="{{myPhoto}}" class="imgdiv"></div>
				</div>
			</div>
			<div class="col-xs-10" style="padding-bottom:18px;">
				<div class="timeline-new">
					<div @click="toNewCGPage" class="new-timeline">
						<span class="glyphicon glyphicon-pencil"></span><span> 描绘你的世界</span>
					</div>
					<span class="normal">或</span>
					<div class="new-timeline">
						<span> 分享你的世界</span>					
					</div>
				</div>
			</div>
		</div>

		{{loadMyTimeline()}}

		<div class="timeline" v-for="item in myTimeline">
			<div class="col-xs-2" style="padding-right:0px">
				<div class="timeline-author">
					<div style="{{myPhoto}}" class="imgdiv"></div>
				</div>
			</div>
			<div class="col-xs-10" style="padding-bottom:12px;">
				
				<div class="timeline-new content">

					<div class="timeline-content-header">
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
									{{item.likeCnt | numberToZero}}个收藏
								</li>
								<li @click="likeThis(item._id)">
									<span class="glyphicon glyphicon-heart-empty" v-bind:class="item.favourited == true ? 'like-active' : ''"></span>
								</li>
								<li @click="transferThis(item._id)">
									<span class="glyphicon glyphicon-transfer"></span>
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

</template>

<script>

	var util = require('../../commons/scripts/commons.js');

	export default {
		data() {
			return {
				newCGModalIsShow: false,
				myPhotoSrc: localStorage.photo,
				myPhoto: 'background-image: url(' + localStorage.photo + ')!important;',
				username: localStorage.username,
				publishTime: 'null',
				myTimeline: {}
			}
		},

		methods: {
			toNewCGPage: function() {
				util.cancelActiveMenu();
				router.go('/cg/new');
			},

			loadMyTimeline: function() {

				var _this = this;

				services.CGService.getByUid(localStorage._id, 1, 10).then(function(res) {
				
					var data = res.data.message;

					_this.myTimeline = data;

					console.log(data);

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

			},

			viewPeopleWhoLikeThis: function(id) {

			},

			pathToSearch: function(name) {
				util.pathToSearch(name);
			},

			removeThisCG: function(id) {

				var isConfirmed = util.confirm('您确定要删除该CG吗');

				if(isConfirmed) {

					services.CGService.remove(id).then(function(res) {

						var code = res.data.code;
						var data = res.data.message;

						if(code != 200) {
							util.messageBox(data);
							return false;
						}

						util.messageBox(data);

					}, function(err) {
						util.handleError(err);
					});

				}

			}
		},

		created() {


		}
	};

</script>

<style>
	

</style>
