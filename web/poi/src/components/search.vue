<template>

	<div style="background: rgb(249, 245, 239);">
        <search></search>

        <div class="timeline" v-for="item in CGList">
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
							{{item.updatedAt}}
						</div>
					</div>

					<div class="timeline-new-section" style="background-image:url({{item.image}})"></div>

					<div class="timeline-content-footer">
						<div class="timeline-content">
							<span>{{item.content}}</span>
							<div class="timeline-tags">
								<span v-for="tag in item.tag_list">#{{tag.name}}</span>
							</div>
						</div>
						<div class="timeline-real-footer">
							<ul>
								<li @click="viewPeopleWhoLikeThis(item._id)">
									{{item.likeCnt | numberToZero}}个收藏
								</li>
								<li @click="likeThis(item._id)">
									<span class="glyphicon glyphicon-heart-empty"></span>
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

</template>

<script>

	import util from '../commons/scripts/commons.js';
    import search from './search/search.vue';

	export default {
		data() {

			return {
                keywordSearched: '',
                displayNavSearch: false,

                CGList: {}
			}

		},

		components: {
			'search': search
		},

		methods: {

			init: function() {
				// console.log(keywords);
			},

			loadThisSearchNav: function() {
                util.resetNavSearchSize();
                this.displayNavSearch = true;
            },

            hideThisSearchNav: function() {
                this.displayNavSearch = false;
            },

            pipeToSearchInput: function(key) {
                this.keywordSearched = key;
            },

            toSearchPage: function() {
                util.cancelActiveMenu();
                var key = this.keywordSearched;
                var route = {
                    name: 'search-key',
                    params: {
                        keywords: key
                    }
                };
                router.replace(route);
            }

		},

		created() {

			var _this = this;

			_this.$set('keywordSearched', router._currentRoute.params.keywords);
			var key = _this.$get('keywordSearched');

			if(key != '') {

				var servicesInterval = setInterval(function() {

					if(typeof window.services != 'undefined') {

						clearInterval(servicesInterval);

						window.services.SiteService.search(key, 1, 10).then(function(res) {

							var code = res.data.code;
							var data = res.data.message;

							if(code != 200) {
								util.messageBox(data);
								return false;
							}

							_this.$set('CGList', data);

						}, function(err) {
							util.handleError(err);
						});

					}

				}, 1);

			}
		}
	}

</script>

<style>



</style>