<template>

	<div>
		<!-- {{animateNotificationPanel()}} -->
		<div class="col-md-6 col-md-offset-3" style="padding:15px;">
			<div class="notification-center a-bouncein notification-page noti-big-page">
		    	<ul>
		    		<li v-for="noti in notiList">
						<div @click="pathToProfile(noti.operator._id)" class="avatar" style="background-image: url({{noti.targetUser.photo}});"></div>
    					<div class="body">
    						<span><a @click="pathToProfile(noti.operator._id)">{{noti.operator.username}}</a> {{noti.did | notificationActionFilter}}了您的分享 </span>
    						<span class="time">{{noti.createdAt}}</span>
    					</div>
    					<div @click="pathToCG(noti.targetTheme._id)" class="noti-item noti-big" style="background-image: url({{noti.targetTheme.image}});"></div>		    		
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

				boncein: '',
				notiList: []

			};

		},

		created() {
			
			var uid = router._currentRoute.params.uid;

			var _this = this;

			if(uid != '') {

				var servicesInterval = setInterval(function() {

					if(typeof window.services != 'undefined') {

						clearInterval(servicesInterval);

						services.TimelineService.getPersonalMessage(localStorage._id, 1, 10).then(function(res) {

			        		var code = res.data.code;
			        		var data = res.data.message;

			        		if(code != 200) {
			        			util.messageBox(data);
			        		}

			        		_this.$set('notiList', data);

			        	}, function(err) {
			        		util.handleError(err);
			        	});
						}

				}, 1);

			}

		},

		methods: {

			animateNotificationPanel: function() {
	        	this.boncein = this.boncein == 'a-bouncein' ? '' : 'a-bouncein';
	        	console.log(this.boncein);
			},

			pathToCG: function(id) {
	        	util.cancelActiveMenu();
	        	router.go('/view/' + id);
	        },

	        pathToProfile: function(id) {
	        	util.cancelActiveMenu();
	        	router.go('/profile/' + id);
	        }


		}
	}

</script>

<style>

	.noti-big {
		position: absolute;
		right: 15px;
	}

	.noti-big-page {
		max-height: 810px;
		margin-bottom: 30px;
	}

</style>