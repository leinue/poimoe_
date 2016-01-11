<template>

	<div class="timeline-master bg">
		
		<div @click="pathTo('public')" id="public-timeline" class="type-circle" v-bind:class="currentPage == 'public' ? 'active' : ''">
			公共
		</div>

		<div @click="pathTo('personal')" id="personal-timeline" class="type-circle right" v-bind:class="currentPage != 'public' ? 'active' :  ''">
			我的	
		</div>

	    <div class="page">
		    <router-view transition="expand"></router-view>
		</div>

	</div>

</template>

<script>

	export default {

		data() {
			return {
				currentPage: 'personal'
			};
		},

		methods: {
			pathTo: function(url) {
				router.go('/timeline/' + url);
				this.currentPage = url;
			}
		}

	};

	window.onload=function(){
		var changeBG=0,scrollTop=0;

		setInterval(function(){
			scrollTop=document.body.scrollTop;
			var _public = document.getElementById('public-timeline');
			var _personal = document.getElementById('personal-timeline');

			if(_public != null) {

				if(scrollTop > 94) {
					_public.setAttribute('style','top:60px;width:40px;height:40px;line-height:40px;');
					_personal.setAttribute('style', 'top:110px;width:40px;height:40px;line-height:40px;');
				}else {
					_public.setAttribute('style','top:110px;');
					_personal.setAttribute('style', 'top:180px;');				
				}

			}

		},1);
	}
	
</script>

<style>

	.timeline-master {
		background: rgb(249, 245, 239);
	}

	.type-circle {
		position: fixed;
		width: 50px;
		height: 50px;
		border-radius: 50%;
		border: 1px solid rgb(0, 149, 219);
		left: 20px;
		top: 110px;
		transition: all .3s ease;
		text-align: center;
		line-height: 50px;
		z-index: 655;
		color: rgb(0, 149, 219);
	}

	.type-circle.right {
		top: 170px;
	}

	.type-circle:hover {
		background: rgb(0, 149, 219);
		transform: scale(1.2, 1.2);
		cursor: pointer;
		color: rgb(255, 255, 255);
	}

	.type-circle.active {
		background: rgb(0, 149, 219);
		color: rgb(255, 255, 255);
	}

	.timeline {

		padding-bottom: 0px;

	}

	.timeline-author {
		text-align: center;
		padding-bottom: 12px;
	}

	.timeline-author .imgdiv {
		width: 60px;
		height: 60px;
		border-radius: 50%;
		transition: all .3s ease;
		cursor: pointer;
		background-size:cover;
	}

	.timeline-author .imgdiv:hover {
		transform: scale(1.1, 1.1);
	}

	.timeline-content {
		border-radius: 3px;
		/*border-radius: 50%;*/
	}

	.timeline-new {
		/*height: 60px;*/
		border-radius: 60px;
		text-align: center;
		background: rgb(255, 255, 255);
		line-height: 60px;
	}

	.timeline-new span {
		color: rgb(0, 149, 219);
		cursor: pointer;
		font-size: 1.4em;
	}

	.timeline-new div.new-timeline {
		transition: all .2s ease;
		display: inline;
		position: absolute;
	}

	.timeline-new div.new-timeline:first-child {
		margin-left: -156px
	}

	.timeline-new div.new-timeline:last-child {
		margin-left: 10px;
	}

	.timeline-new span.normal {
		color: rgb(80, 80, 80);
		cursor: auto;
	}

	.timeline-new div.new-timeline:hover {
		transform: scale(1.1, 1.1);
	}

	.timeline-new.content {
		border-radius: 4px;
		margin-bottom: 10px;		
	}

	.timeline-new.content.newtime {
		line-height: 40px;
		background: rgb(246, 251, 253);
		border: 1px solid rgb(219, 238, 250);
		cursor: pointer;
		text-align: left;
		color: rgb(0, 149, 219);
		padding-left: 15px;
		padding-right: 15px;
		font-size: .8em;
	}

	.timeline-new.content.newtime:hover {
		background: rgb(191, 227, 246);
	}

	.timeline-content-header {
		border-bottom: 1px solid rgb(249, 245, 239);
		line-height: 44px;
		text-align: left;
		padding-left: 15px;
		padding-right: 15px;
	}

	.timeline-content-header .header-right {
		text-align: right;
		margin-top: -40px;
		font-size: .8em;
		color: rgb(85, 91, 108);
	}

	.timeline-new-section {
		transition: all .3s ease;
		border-bottom: 1px solid rgb(249, 245, 239);
		height: 540px;
		background-size: cover;
		background-repeat: no-repeat;
		cursor: zoom-in;
	}

	.timeline-new-section:hover {
		transform: scale(1.02);
		box-shadow: 1px 2px 12px rgb(170, 170, 170);
	}

	.timeline-content {
		padding-top: 6px;
		padding-left: 15px;
		padding-bottom: 15px;
		font-size: 18px;
		color: rgb(85, 85, 85);
		text-align: left;
		font-weight: 200;
	}

	.timeline-content span {
		color: rgb(85, 85, 85);
		font-weight: 200;
		font-size: 16px;
	}

	.time-real-footer {
		display: table;
		width: 100%;
	}

	.timeline-real-footer ul {
		display: table-row;
	}

	.timeline-real-footer ul li{
		display: table-cell;
		padding-left: 15px;
		padding-right: 15px;
		color: rgb(209, 202, 192);
		font-weight: 500;
		cursor: pointer;
		transition: all .3s ease;
	}

	.timeline-real-footer ul li span {
		font-size: 18px;
		color: rgb(209, 202, 192);
		font-weight: 200;
	}

	.timeline-real-footer ul li(2) {
		padding-top: 2px;
	}

	.timeline-real-footer ul li:hover {
		color: rgb(0, 149, 219);
		transform: scale(1.2);
	}

	.timeline-real-footer ul li:nth-child(2) span:hover {
		color: rgb(247, 81, 156);
	}

	span.glyphicon.glyphicon-heart-empty.like-active {
		color: rgb(247, 81, 156);
	}

	.timeline-real-footer ul li:nth-child(3) span:hover {
		color: rgb(241, 130, 39);
	}

	.timeline-tags span{
		color: rgb(0, 147, 222)!important;
	}

	.timeline-tags span:hover {
		text-decoration: underline;
	}

</style>
	