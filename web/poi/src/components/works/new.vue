<template>

<div style="background: rgb(249, 245, 239);" id="new-cg-container">
	{{init()}}
	<div class="col-md-6 col-md-offset-3 a-bounceinB" style="padding-top:12px;">
		<div class="timeline">
			<div class="col-xs-10" style="padding-bottom:12px;width:100%;">
				
				<div class="timeline-new content">

					<div class="timeline-content-header">
						<div class="header-left">
							{{username | nullToVisual}}
						</div>
					</div>

					<div class="timeline-new-section upload" style="background: rgb(237, 247, 253);cursor:default">
						<div @click="uploadCG()" class="timeline-new-section-outer" id="my-cg-viewer">
							<h1 v-show="isCGShow === false" style="line-height: 14">上传CG</h1>
							<div id="cg-outer">
	    						<img style="display:none" id="sharing-viewer" class="cg-viewer" width="100" height="100" border="0">
							</div>
							<form style="display:none" enctype="multipart/form-data" method="post" target="upload" v-bind:action="cgUploadAction" > 
								<input type="file" id="cg-source" name="upfile" v-on:change="previewImage()"/>
								<input id="submit-cg-btn" type="submit" /> 
							</form>
							<iframe style="display:none" id="ifr" name="upload"></iframe>
						</div>
					</div>

					<div class="timeline-content-footer">
						<div class="timeline-content upload">
							<textarea class="form-control" placeholder="写下你的图片描述" v-model="cg.content" rows="6"></textarea>
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

			var _this = this;

			var roomId = router._currentRoute.params.roomId;
			var imgName = router._currentRoute.params.imgName;

			var isSharing = false;

			if(roomId != undefined && imgName != undefined) {
				var imageUrl = 'http://image.poimoe.com/upload/' + localStorage._id + '/roomCG/' + roomId + '/sharing/' + imgName;
				isSharing = true;
			}

			setTimeout(function() {
				var newCGContainer = document.getElementById('new-cg-container');
				newCGContainer.setAttribute('style', newCGContainer.getAttribute('style') + 'height:' + document.height + 'px');

				if(isSharing) {
					_this.$set('cg.image', imageUrl);
					var sharingViewer = document.getElementById('sharing-viewer')
					sharingViewer.setAttribute('src', imageUrl);
					sharingViewer.setAttribute('style', 'display: block;width:100%;height:100%;');			
					_this.$set('isCGShow', true);
				}

			}, 1);
		},

		data() {
			return {

				cg: {
					content: '',
					uid: localStorage._id,
					tag_list: [],
					image: ''
				},

				username: localStorage.username,

				tags: '',

				displayTagsSearch: false,

				tagsSearched: {},

				tagsConfrimed: [],

				keyExistsInTagsSearched: true,

				isCGShow: false,

				cgUploadAction: ''

			}
		},

		methods: {
			back: function() {
				window.history.go(-1);
			},

			init: function() {

				if(document.domain == 'localhost') {
					this.cgUploadAction = 'http://image.poimoe.com/upload.php?uid=' + localStorage._id + '/cgs/' + util.curentTime() + '&cors=true&corsurl=http://localhost:8080/upload.html';					
				}else {
					this.cgUploadAction = 'http://image.poimoe.com/upload.php?uid=' + localStorage._id + '/cgs/' + util.curentTime() + '&cors=true&corsurl=http://poi.poimoe.com/upload.html';
				}
			},

			publishNewCG: function() {

				if(this.cg.image == '') {
					util.messageBox('请上传图片');
					return false;
				}

				services.CGService.publish(this.cg).then(function(res) {

					var code = res.data.code;
					var data = res.data.message;

					if(code != 200) {
						util.messageBox(data);
						return false;
					}

					util.messageBox('发布成功');

					localStorage.draftsCount = parseInt(localStorage.draftsCount) + 1;

					router.go('/works');

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
			},

			uploadCG: function() {
	        	document.getElementById("cg-source").click();
			},

			previewImage: function() {

				var width = document.getElementById('my-cg-viewer').style.width;
				var height = document.getElementById('my-cg-viewer').offsetHeight - 2;

				util.previewImage('cg-source', 'cg-outer', 'cg-viewer', '', 'width:100%;height:' + height + 'px;');
				this.isCGShow = true;

				var _this = this;

	        	util.syncUploadPic('submit-cg-btn', 'ifr', function(picJSON) {
		        	_this.cg.image = picJSON.message.preview;
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
		height: 100%;
	}

	.timeline-new-section-outer h1 {
		font-weight: 200!important;
	}

	.timeline-new.cotent input {
		height: 34px;
	}

</style>