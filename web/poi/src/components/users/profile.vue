<template>

	<div>
		<div class="side-profile" style="margin-top:15px;">
		    <div class="side-profile-photo" style="background-image:url(http://www.people.com.cn/mediafile/pic/20140709/49/4202888730341368797.jpg)"></div>
		    <div class="side-profile-detail">
		    	<p style="margin-bottom:10px">江泽民</p>
		    	<span class="description">闷声发大财</span>
		    	<p class="relations">
			    	<span @click="toFollowing()">0 关注</span>
			    	<span @click="toFollower()">0 粉丝</span>
		    	</p>
		    </div>
		    <div class="side-profile-footer">
			    <div class="col-md-6 col-md-offset-3">
					<div class="side-profile-footer-content">
						<div @click="pathTo('/works')" class="col-xs-4 block">
							<p>0</p>
							<span>投稿</span>
						</div>
						<div @click="pathTo('/favourites')" class="col-xs-4 block">
							<p>0</p>
							<span>收藏</span>
						</div>
						<div @click="pathTo('')" class="col-xs-4 block">
							<p>0</p>
							<span>删除</span>
						</div>
					</div>			    	
			    </div>
		    </div>
		</div>

		<div class="page">
		    <router-view transition="expand"></router-view>
		</div>
	</div>

</template>

<script>

	var util = require('../../commons/scripts/commons.js');

	//a

	export default {
		created() {
			
		},

		methods: {
			pathTo: function(path) {
				util.cancelActiveMenu();
				router.go(path);
			}
		}
	}

</script>

<style>

</style>