<template>

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

	<div class="timeline" v-show="indexMesssageCount > 0">
		<div class="col-xs-10 col-xs-offset-2">
			 <div class="timeline-new content newtime" @click="loadMyTimeline()">
			 	有 {{indexMesssageCount}} 条新消息
			 </div>
		</div>
	</div>

	{{loadMyTimeline()}}
	{{startIndexTimelineComet()}}

	<div class="timeline a-bounceinB" v-for="(key, item) in myTimeline">
		<div class="col-xs-2" style="padding-right:0px">
			<div @click="toProfile(item.user_id._id)" class="timeline-author">
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
						{{item.user_id.username | nullToVisual}}
					</div>
					<div class="header-right">
						{{item.updatedAt | nullToVisual}}
					</div>
				</div>

				<div class="timeline-new-section" style="background-image:url({{item | judgePhotoIsTransfered}})"></div>

				<div class="timeline-content-footer">
					<div class="timeline-content">
						<span>{{item.content || item.repost.content}}</span>
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
				newCGModalIsShow: false,
				myPhotoSrc: localStorage.photo,
				myPhoto: 'background-image: url(' + localStorage.photo + ')!important;',
				username: localStorage.username,
				publishTime: 'null',
				myTimeline: {},
				myUid: localStorage._id,
				indexMesssageCount: 0,

				currentPage: 1
			}
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
					this.currentPage ++;
				}

				services.UserService.loadTimeline(this.currentPage, 10).then(function(res) {

	        		var code = res.data.code;
	        		var data = res.data.message;

	        		if(code != 200) {
	        			util.messageBox(data);
	        			return false;
	        		}

	        		if(!more) {
	        			_this.myTimeline = data;
	        		}else {
	        			if(data.length === 0) {
	        				util.messageBox('没有更多内容了');
	        				return false;
	        			}else {
	        				for (var i = 0; i < data.length; i++) {
	        					var curr = data[i];
	        					_this.myTimeline.push(curr);
	        				};
	        			}
	        		}

	        	}, function(err) {
	        		util.handleError(err);
	        	});
			},

			likeThis: function(tid, favourited, key) {
				if(!favourited) {
					util.likeThisTheme(tid, function(data) {});
				}else {
					util.unlikeThisTheme(tid, function(data) {});
				}
			},

			transferThis: function(id) {
				util.transferThis(id, function(data) {});
			},

			viewPeopleWhoLikeThis: function(id) {

			},

			removeThisCG: function(id) {
				util.removeThisCG(id, function(data) {});
			},

			pathToSearch: function(name) {
				util.pathToSearch(name);
			},

			startIndexTimelineComet: function() {
				var _this = this;

				var es = new EventSource('http://api.poimoe.com//timeline/message/index/count/' + localStorage._id);

				es.onmessage = function(e) {
					_this.indexMesssageCount = JSON.parse(e.data).message;
					console.log(_this.indexMesssageCount);
				};

				es.onerror = function(e) {
					util.handleError('comet服务出错');
				};

				es.onopen = function(e) {}
			},

			turnoffIndexTimelineComet: function() {
				services.TimelineService.turnOffES().then(function(res) {

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
			},

			drawYourWorld: function() {
				window.location.href="http://kaku.poimoe.com";
			}
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

		}
	};

</script>

<style>
	

</style>
