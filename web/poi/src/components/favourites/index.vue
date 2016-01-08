<template>

<div style="background: rgb(249, 245, 239);">
		
	<div class="col-md-6 col-md-offset-3">
		<div class="timeline" style="padding-top:12px;">
			
		</div>

	    <div class="timeline" v-for="(index, item) in favouritesList">
			<div class="col-xs-2" style="padding-right:0px">
				<div class="timeline-author">
					<div style="background-image:url({{item.photo | photoNullToVision}})" class="imgdiv"></div>
				</div>
			</div>
			<div class="col-xs-10" style="padding-bottom:12px;">
				
				<div class="timeline-new content">

					<div class="timeline-content-header">
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

	export default {
		data() {

			return {
				favouritesList: {}
			}

		},

		components: {

		},

		methods: {

            toSearchPage: function(name) {
				util.pathToSearch(name);		
            },

            unlikeThis: function(id) {

            	services.UserService.removeFavourite(localStorage._id, id).then(function(res) {

            		var code = res.data.code;
            		var data = res.data.message;

            		if(code != 200) {
            			util.messageBox(data);
            			return false;
            		}

            		util.messageBox(data);

    				this.favouritesList.splice(index, 1);

            	}, function(err) {
            		util.handleError(err);
            	});

            }

		},

		created() {

			var _this = this;

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

						console.log(data[0].favourites);

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