<template>

<div style="background: rgb(249, 245, 239);" id="new-cg-container">
	<div class="col-md-6 col-md-offset-3" style="padding-top:12px;">
		<div class="timeline">
			<div class="col-xs-10" style="padding-bottom:12px;width:100%;">
				
				<div class="timeline-new content">

					<div class="timeline-content-header">
						<div class="header-left">
							{{username | nullToVisual}}
						</div>
					</div>

					<div class="timeline-new-section upload" style="background: rgb(237, 247, 253);height:88px;cursor:default">
						<div class="timeline-new-section-outer">
							<h1>上传图像</h1>
						</div>
					</div>

					<div class="timeline-content-footer">
						<div class="timeline-content upload">
							<textarea placeholder="写下你的图片描述" v-model="cg.content" row="3"></textarea>
						</div>
						<div class="tags-selector">
							<input type="text" placeholder="搜索你喜欢的标签" v-model="tags" v-bind:onchange="searchTags(tags)" v-on:blur="hideTagsNav(this)" class="form-control">
							<div class="nav-search new-cg-tag" v-bind:class="{'nav-search-display': displayTagsSearch == true, 'nav-search-hide': displayTagsSearch == false}">
		                        <ul>
		                            <li v-for="tag in tagsSearched" @click="pipeToSearchInput(tag.name, tag._id)">{{tag.name}}</li>
		                            <li @click="addNewTag()" v-show="!keyExistsInTagsSearched">创建 {{tags}} 标签</li>
		                        </ul>
							</div>
	                        <div class="tag-visual" v-for="tag in tagsConfrimed">
	                        	<span>{{tag.name}}</span>
	                        	<span @click="removeThisTag(tag._id)" class="glyphicon glyphicon-remove"></span>
	                        </div>
						</div>
						<div class="new-cg-confirm">
							<button class="btn btn-default" @click="back()" style="margin-right:10px;">取消</button>
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
					tag_list: [],
					image: 'http://www.html5tricks.com/demo/css3-image-hover-effect/iceberg_1x.jpg'
				},

				username: localStorage.username,

				tags: '',

				displayTagsSearch: false,

				tagsSearched: {},

				tagsConfrimed: [],

				keyExistsInTagsSearched: true

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
			},

			searchTags: function() {
				if(this.tags != ''){
					this.displayTagsSearch = true;
					var _this = this;
					services.TagsService.search(this.tags, 1, 10).then(function(res) {

						_this.tagsSearched = res.data.message;

						if(res.data.code !== 200) {
							util.messageBox(_this.tagsSearched);
							return false;
						}

						if(_this.tagsSearched.length === 0) {
							_this.keyExistsInTagsSearched = false;
						}else {

							for (var i = 0; i < _this.tagsSearched.length; i++) {
								var curr = _this.tagsSearched[i];
								if(curr.name == _this.tags) {
									_this.keyExistsInTagsSearched = true;
									return false;
									break;
								}
							};

							_this.keyExistsInTagsSearched = false;
						}

					}, function(err) {
						util.handleError(err);
					});
				}
			},

			hideTagsNav: function(obj) {
				this.displayTagsSearch = false;
			},

			pipeToSearchInput: function(content, _id) {
				this.tags = '';

				var isRepeat = false;

				var tagLength = this.cg.tag_list.length;

				if(tagLength == 5) {
					util.messageBox('最多添加5个标签');
					return false;
				}

				for (var i = 0; i < tagLength; i++) {
					var curr = this.cg.tag_list[i];
					if(curr == _id) {
						isRepeat = true;
						break;
					}
				};

				if(!isRepeat) {
					this.cg.tag_list.push(_id);					
					this.tagsConfrimed.push({
						name: content,
						_id: _id
					});
				}

			},

			removeThisTag: function(_id) {

				for (var i = 0; i < this.cg.tag_list.length; i++) {
					var curr = this.cg.tag_list[i];

					if(curr == _id) {
						this.cg.tag_list.splice(i, 1);
					}

					var tagConfirmed = this.tagsConfrimed[i];

					if(tagConfirmed._id == _id) {
						this.tagsConfrimed.splice(i, 1);
					}
				};
				
			},

			addNewTag: function() {

				var _this = this;

				services.TagsService.add(this.tags).then(function(res) {

					var data = res.data.message;

					if(res.data.code != 200) {
						util.messageBox(data);
					}

					_this.pipeToSearchInput(data.name, data._id);

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
		margin-top: 4px;
	}

	.timeline-new-section-outer {
		border: 1px dashed rgb(220, 220, 217);
	}

	.timeline-new-section-outer h1 {
		font-weight: 200!important;
	}

	.timeline-new.cotent input {
		height: 34px;
	}

</style>