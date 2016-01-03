<template>

<div style="background: rgb(249, 245, 239);" id="new-cg-container">
	<div class="col-md-6 col-md-offset-3" style="padding-top:12px;">
		<div class="timeline">
			<div class="col-xs-10" style="padding-bottom:12px;width:100%;">
				
				<div class="timeline-new content">

					<div class="timeline-content-header">
						<div class="header-left">
							xieyang
						</div>
					</div>

					<div class="timeline-new-section upload" style="background: rgb(237, 247, 253);height:88px;cursor:default">
						<div class="timeline-new-section-outer">
							<h1>上传图像</h1>
						</div>
					</div>

					<div class="timeline-content-footer">
						<div class="timeline-content upload">
							<textarea v-model="cg.content"></textarea>
						</div>
						<div class="new-cg-confirm">
							<button class="btn btn-default" @click="back()" style="margin-right:10px;">返回</button>
							<button class="btn btn-primary" @click="publishNewCG()">投稿</button>
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
		created() {
			setTimeout(function() {
				var newCGContainer = document.getElementById('new-cg-container');
				newCGContainer.setAttribute('style', newCGContainer.getAttribute('style') + 'height:' + document.height + 'px');
			},1);
		},

		data() {
			return {

				cg: {
					content: '',
					uid: localStorage._id,
					tag_list: {},
					image: 'http://www.html5tricks.com/demo/css3-image-hover-effect/iceberg_1x.jpg'
				}

			}
		},

		methods: {
			back: function() {
				window.history.go(-1);
			},

			publishNewCG: function() {
				services.CGService.publish(this.cg).then(function(res) {

					console.log(res);

				}, function(err) {
					util.handleError(err);
				});
			}
		}
	}
	
</script>

<style>

	.timeline-new-section .upload {
		/*!important;*/
	}
	
	.timeline-content.upload{
		padding-left: 0px;
		padding-bottom: 0px;
	}

	.timeline-content.upload textarea {
		border: none;
		width: 100%;
		border-bottom: 1px solid rgb(251, 246, 241);
	}

	.new-cg-confirm {
		text-align: right;
		padding-right: 15px;
		margin-top: -25px;
	}

	.timeline-new-section-outer {
		border: 1px dashed rgb(220, 220, 217);
	}

	.timeline-new-section-outer h1 {
		font-weight: 200!important;
	}

</style>