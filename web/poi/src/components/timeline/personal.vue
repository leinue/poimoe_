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

	<div class="timeline">
		<div class="col-xs-10 col-xs-offset-2">
			 <div class="timeline-new content newtime" @click="loadMyTimeline()">
			 	有15条新消息
			 </div>
		</div>
	</div>

	{{loadMyTimeline()}}

	<div class="timeline">
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
						{{publishTime}}
					</div>
				</div>

				<div class="timeline-new-section" style="background-image:url(http://www.html5tricks.com/demo/css3-image-hover-effect/iceberg_1x.jpg)"></div>

				<div class="timeline-content-footer">
					<div class="timeline-content">
						<span>习习蛤蛤胡搞毛搞</span>
						<div class="timeline-tags">
							<span>#长门有希</span>
							<span>#凉宫春日</span>
						</div>
					</div>
					<div class="timeline-real-footer">
						<ul>
							<li>
								3个收藏
							</li>
							<li>
								<span class="glyphicon glyphicon-heart-empty"></span>
							</li>
							<li>
								<span class="glyphicon glyphicon-transfer"></span>
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
				newCGModalIsShow: false,
				myPhotoSrc: localStorage.photo,
				myPhoto: 'background-image: url(' + localStorage.photo + ')!important;',
				username: localStorage.username,
				publishTime: 'null',
				myTimeline: {}
			}
		},
		components: {

		},
		methods: {
			toNewCGPage: function() {
				util.cancelActiveMenu();
				router.go('/cg/new');
			},

			loadMyTimeline: function() {

				console.log(localStorage._id);
				services.CGService.getByUid(localStorage._id).then(function(res) {
				
					console.log(res);

				}, function(err) {
					util.handleError(err);
				});

				// this.$set('publishTime', 'sadfgh');
			}
		},

		created() {


		}
	};

</script>

<style>
	

</style>
