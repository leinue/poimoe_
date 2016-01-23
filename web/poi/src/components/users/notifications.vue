<template>

	<div>
		<!-- {{animateNotificationPanel()}} -->
		<div class="col-md-6 col-md-offset-3" style="padding:15px;">
			<div class="notification-center a-bouncein notification-page">
		    	<ul>
		    		<li>
		    			<div class="avatar"></div>
		    			<div class="body">
		    				<span><a>阿久津　圭@モイライ</a>さんがあなたのリスナップを</span>
		    				<span class="time">3 days ago</span>
		    			</div>
		    			<div class="noti-item"></div>
		    		</li>
		    		<li>
		    			<div class="avatar"></div>
		    			<div class="body">
		    				<span><a>阿久津　圭@モイライ</a>さんがあなたのリスナップを</span>
		    				<span class="time">3 days ago</span>
		    			</div>
		    			<div class="noti-item"></div>
		    		</li>
		    		<li>
		    			<div class="avatar"></div>
		    			<div class="body">
		    				<span><a>阿久津　圭@モイライ</a>さんがあなたのリスナップを</span>
		    				<span class="time">3 days ago</span>
		    			</div>
		    			<div class="noti-item"></div>
		    		</li>
		    		<li>
		    			<div class="avatar"></div>
		    			<div class="body">
		    				<span><a>阿久津　圭@モイライ</a>さんがあなたのリスナップを</span>
		    				<span class="time">3 days ago</span>
		    			</div>
		    			<div class="noti-item"></div>
		    		</li>
		    		<li>
		    			<div class="body more" style="padding-bottom: 10px;"><a>查看更多</a></div>
		    		</li>
		    	</ul>
		    </div>
		</div>

	</div>

</template>

<script>

	var util = require('../../commons/scripts/commons.js');
	var filters = require('../../filters/index.js');

	export default {

		data() {

			return {

				boncein: ''

			};

		},

		created() {
			
			var uid = router._currentRoute.params.uid;

			var _this = this;

			if(uid != '') {

				var servicesInterval = setInterval(function() {

					if(typeof window.services != 'undefined') {

						clearInterval(servicesInterval);

						// window.services.UserService.getProfile(uid).then(function(res) {

						// 	var code = res.data.code;
						// 	var data = res.data.message;

						// 	if(code != 200) {
						// 		util.messageBox(data);
						// 		return false;
						// 	}


						// }, function(err) {
						// 	util.handleError(err);
						// });
					}

				}, 1);

			}

		},

		methods: {

			animateNotificationPanel: function() {
	        	this.boncein = this.boncein == 'a-bouncein' ? '' : 'a-bouncein';
	        	console.log(this.boncein);
			}

		}
	}

</script>

<style>

</style>