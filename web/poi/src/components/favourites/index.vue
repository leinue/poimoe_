<template>

<div class="bg">
		
	<div class="col-md-6 col-md-offset-3">
		<div class="timeline" style="padding-top:12px;">
			
		</div>

		<no-favourites v-show="favouritesList.length === 0"></no-favourites>

	    <div class="timeline" v-for="(index, item) in favouritesList">
			<div class="col-xs-2" style="padding-right:0px">
				<div class="timeline-author">
					<div style="background-image:url({{item.photo | photoNullToVision}})" class="imgdiv"></div>
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
							{{item.updatedAt}}
						</div>
					</div>

					<div class="timeline-new-section" style="background-image:url({{item.image}})"></div>

					<div class="timeline-content-footer">
						<div class="timeline-content">
							<span>{{item.content}}</span>
							<div class="timeline-tags">
								<span @click="toSearchPage(tag.name)" v-for="tag in item.tag_list">#{{tag.name}}</span>
							</div>
						</div>
						<div class="timeline-real-footer">
							<ul>
								<li @click="viewPeopleWhoLikeThis(item._id)">
									{{item.likeCnt | numberToZero}}个收藏
								</li>
								<li @click="unlikeThis(item._id, index)">
									<span class="glyphicon glyphicon-heart-empty like-active"></span>
								</li>
								<li @click="transferThis(item._id)">
									<span class="glyphicon glyphicon-transfer"></span>
								</li>
								<li ng-show="item.user_id._id == myUid" @click="removeThisCG(item._id)">
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

	import util from '../../commons/scripts/commons.js';
	import noFavourites from '../error/nodata.vue';

	export default {
		data() {

			return {
				favouritesList: {},

				myUid: localStorage._id
			}

		},

		components: {
			'noFavourites': noFavourites
		},

		methods: {

            toSearchPage: function(name) {
				util.pathToSearch(name);		
            },

            unlikeThis: function(id) {

            	util.unlikeThisTheme(id, function(data) {
            		
            	});

            }

		},

		created() {

			var _this = this;

			noFavourites.props.content.default = "您暂时没有收藏CG";

			var servicesInterval = setInterval(function() {

				if(typeof window.services != 'undefined') {

					clearInterval(servicesInterval);

					window.services.UserService.getFavouritesList(localStorage._id, 1, 10).then(function(res) {

						var code = res.data.code;
						var data = res.data.message;

						if(code != 200) {
							util.messageBox(data);
							return false;
						}

						console.log(data[0].favourites[0].user_id);

						_this.$set('favouritesList', data[0].favourites);

					}, function(err) {
						util.handleError(err);
					});

				}

			}, 1);

		}
	}
	
</script>

<style>
	
</style>