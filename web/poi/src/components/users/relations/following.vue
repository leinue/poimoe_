<template>

	<div id="relations-container" style="background: rgb(249, 245, 239);">
		
		<div class="col-md-6 col-md-offset-3">
			<div class="timeline" style="padding-top:12px;">
				
			</div>

			<div class="timeline">
				<div class="col-xs-2" style="padding-right:0px">
					<div class="timeline-author">
						<img src="http://i2.hdslb.com/u_user/c143946c2acf6e34e836bd9e24871ad7.jpg">
					</div>
				</div>
				<div class="col-xs-10" style="padding-bottom:12px;">
					
					<div class="timeline-new content">

						<div class="timeline-content-header">
							<div class="header-left">
								xieyang
							</div>
							<div class="header-right">
								<button style="margin-top:-4px;" class="btn btn-default outline"><span class="glyphicon glyphicon-plus"></span> 关注</button>
							</div>
						</div>

						<div class="relations-img">
							<div class="col-md-4">
								<div class="timeline-new-section relations" style="background-image:url(https://img-sketch.secure.pixiv.net/c/c_180/uploads/medium/file/416074/7840959996393829039.png)"></div>
							</div>
							<div class="col-md-4">
								<div class="timeline-new-section relations" style="background-image:url(https://img-sketch.secure.pixiv.net/c/c_180/uploads/medium/file/415186/6437562090413771074.png)"></div>
							</div>
							<div class="col-md-4">
								<div class="timeline-new-section relations" style="background-image:url(https://img-sketch.secure.pixiv.net/c/c_180/uploads/medium/file/415175/3536930356003292631.png)"></div>
							</div>
						</div>

					</div>

				</div>
			</div>

			<div class="timeline">
				<div class="col-xs-2" style="padding-right:0px">
					<div class="timeline-author">
						<img src="http://i2.hdslb.com/u_user/c143946c2acf6e34e836bd9e24871ad7.jpg">
					</div>
				</div>
				<div class="col-xs-10" style="padding-bottom:12px;">
					
					<div class="timeline-new content">

						<div class="timeline-content-header">
							<div class="header-left">
								xieyang
							</div>
							<div class="header-right">
								<button style="margin-top:-4px;" class="btn btn-default outline"><span class="glyphicon glyphicon-plus"></span> 关注</button>
							</div>
						</div>

						<div class="relations-img">
							<div class="col-md-4">
								<div class="timeline-new-section relations" style="background-image:url(https://img-sketch.secure.pixiv.net/c/c_180/uploads/medium/file/416074/7840959996393829039.png)"></div>
							</div>
							<div class="col-md-4">
								<div class="timeline-new-section relations" style="background-image:url(https://img-sketch.secure.pixiv.net/c/c_180/uploads/medium/file/415186/6437562090413771074.png)"></div>
							</div>
							<div class="col-md-4">
								<div class="timeline-new-section relations" style="background-image:url(https://img-sketch.secure.pixiv.net/c/c_180/uploads/medium/file/415175/3536930356003292631.png)"></div>
							</div>
						</div>

					</div>

				</div>
			</div>

		</div>
		
	</div>

</template>

<script>

	export default {

		data() {

		},

		methods: {

		},

		created() {

			// console.log(router._currentRoute.params);

			setTimeout(function() {
				var rc = document.getElementById('relations-container');
				rc.style.height = document.height + 'px';
			}, 100);

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
