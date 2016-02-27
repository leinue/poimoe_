<template>

<div class="bg">

	<div class="col-md-6 col-md-offset-3">
		<div class="timeline" style="padding-top:12px;">
			<div class="col-xs-2" style="padding-right:0px">
				<div @click="toProfile()" class="timeline-author">
					<div style="{{myPhoto}}" class="imgdiv"></div>
				</div>
			</div>
			<div class="col-xs-10" style="padding-bottom:18px;">
				<div class="timeline-new">
					<div @click="drawYourWorld()" class="new-timeline">
						<span class="glyphicon glyphicon-pencil"></span><span> 描绘你的世界</span>
					</div>
					<span class="normal">或</span>
					<div @click="toNewCGPage()" class="new-timeline">
						<span> 分享你的世界</span>					
					</div>
				</div>
			</div>
		</div>

		<!-- {{loadMyTimeline()}} -->

		<div class="timeline a-bounceinB" v-for="item in myTimeline">
			<div class="col-xs-2" style="padding-right:0px">
				<div @click="toProfile(item.user_id._id)" class="timeline-author">
					<div style="{{myPhoto}}" class="imgdiv"></div>
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
									{{item.favouritesCount | numberToZero}}个收藏
								</li>
								<li @click="likeThis(item._id, item.favourited, key)">
									<span class="glyphicon glyphicon-heart-empty" v-bind:class="item.favourited == true ? 'like-active' : ''"></span>
								</li>
								<li @click="transferThis(item._id)">
									<span class="glyphicon glyphicon-transfer" v-bind:class="item.reposted == true ? 'transfer-active' : ''"></span>
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

		<loading v-show="isLoaded == false"></loading>

	</div>
	
</div>

</template>

<script>

	var util = require('../../commons/scripts/commons.js');
	var loading = require('../loading/loading.vue');

	export default {
		data() {
			return {
				newCGModalIsShow: false,
				myPhotoSrc: localStorage.photo,
				myPhoto: 'background-image: url(' + localStorage.photo + ')!important;',
				username: localStorage.username,
				publishTime: 'null',
				myTimeline: [],

				currentPage: 1,

				isLoaded: false
			}
		},

		components: {
			'loading': loading
		},

		methods: {
			toNewCGPage: function() {
				util.cancelActiveMenu();
				router.go('/cg/new');
			},

			toProfile: function(id) {
				util.toProfile(id);
			},

			loadMyTimeline: function(more) {

				more = more || false;

				var _this = this;

				if(more) {
					this.currentPage += 1;
				}

    			var pageCnt = this.currentPage === 1 ? 10 : 5;

				services.CGService.getByUid(localStorage._id, this.currentPage, pageCnt).then(function(res) {
				
					var data = res.data.message;

					if(_this.currentPage === 1) {
						_this.myTimeline = data;
					}else {
						if(data.length === 0) {
							util.messageBox('没有更多内容了');
							return false;
						}
						for (var i = 0; i < data.length; i++) {
							var curr = data[i];
							_this.myTimeline.push(curr);
						};

						sessionStorage.turnOnscroll = 'false';

						console.log(_this.myTimeline.length);

						// console.log();
					}

					_this.isLoaded = true;

					// console.log(data);

				}, function(err) {
					util.handleError(err);
				});

			},

			likeThis: function(tid, favourited, key) {
				if(!favourited) {
					util.likeThisTheme(tid, function(data) {});
				}else {
					util.unlikeThisTheme(tid, function(data) {})
				}
			},
			
			transferThis: function(id) {
				util.transferThis(id, function(data) {});
			},

			viewPeopleWhoLikeThis: function(id) {

			},

			pathToSearch: function(name) {
				util.pathToSearch(name);
			},

			removeThisCG: function(id) {
				util.removeThisCG(id, function(data) {});
			},

			drawYourWorld: function() {
				window.location.href="http://kaku.poimoe.com";
			}
		},

		created() {

		},

		ready() {

			var _this = this;

			var throldHold = 400; //两次scroll事件触发之间最小的事件间隔
			window.onscroll = function () {
        		if(timer) {
        			clearTimeout(timer);
        		}
        		timer = setTimeout(function() {
					if(util.scrollToBottom()) {
						_this.loadMyTimeline(true);
					}
        		}, throldHold);
    		}

			var servicesInterval = setInterval(function() {

				if(typeof window.services != 'undefined') {

					clearInterval(servicesInterval);

					_this.$get('loadMyTimeline')();

				}

			}, 1);
		}
	};

</script>

<style>
	

</style>
