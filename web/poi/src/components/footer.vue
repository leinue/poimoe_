<template>

	<div>
		<di v-show="showScroolToTop == true" transition="footer" @click="scrollToTop()" class="scroll-top">
			<a><span class="glyphicon glyphicon-eject"></span></a>
		</div>
		<div  @click="showFooter" class="footer">
			<span class="glyphicon glyphicon-exclamation-sign"></span>
		</div>
		<div v-show="footer.show" transition="footer" @click="hideFooter" class="footer-content">
		</div>
		<div v-show="footer.show" transition="realfooter" class="footer-real">
			<a href="http://poimoe.com" target="_blank">© poimoe</a>
			Powered by <a href="http://ivydom.com" target="_blank">ivydom.com</a>
		</div>
	</div>

</template>

<script>

	var util = require('../commons/scripts/commons.js');
	
	export default {
		data() {
			return {
				footer: {
					show: false
				},

				showScroolToTop: false
			};
		},

		methods: {
			showFooter: function(){
				this.footer.show = true;
			},

			hideFooter: function() {
				this.footer.show = false;
			},

			scrollToTop: function() {
				util.scrollToTop();
			}
		},

		ready() {

			var _this = this;

			var currentRoute = router._currentRoute.path;

			setInterval(function() {
				if(util.getScrollTop() > 50 && currentRoute != '/index') {
					_this.$set('showScroolToTop', true);
				}else {
					_this.$set('showScroolToTop', false);
				}
			}, 500);

		}
	};


</script>

<style>
	
	.footer {
		position: fixed;
		bottom: 14px;
		right: 20px;
		border-radius: 50%;
		color: rgb(156, 157, 164);
		transition: all .3s ease;
		font-size: 2.2em;
	}

	.footer:hover {
		color: rgb(55, 62, 82);
		transform: scale(1.2,1.2);
		-ms-transform: scale(1.2,1.2);	/* IE 9 */
		-webkit-transform: scale(1.2,1.2);	/* Safari 和 Chrome */
		-o-transform: scale(1.2,1.2);	/* Opera */
		-moz-transform: scale(1.2,1.2);	/* Firefox */
	}

	.footer-content {
		position: fixed;
		width: 100%;
		height: 100%;
		background: rgba(0, 0, 0, 0.4);
		z-index: 6555;
		top: 0;
		left: 0;
		opacity: 0;
	}

	.footer-real {
		width: 100%;
		padding: 20px;
		position: fixed;
		bottom: 0;
		left: 0;
		background: rgb(55, 62, 82);
		z-index: 65535;
		color: rgba(255, 255, 255, 0.4);
	}

	.footer-real a{
		color: rgb(255, 255, 255);
	}

	/* 必需 */
	.footer-transition {
	  	transition: all .3s ease;
	  	opacity: 1;
	}

	.footer-enter, .footer-leave {
		opacity: 0;
	}

	/* 必需 */
	.realfooter-transition {
	  	transition: all .2s ease;
	  	opacity: 1;
	}

	.realfooter-enter, .realfooter-leave {
		padding: 0 10px;
		opacity: 0;
	}

	.scroll-top {
		position: fixed;
		bottom: 14px;
		right: 220px;
		z-index: 1000;
	}

	.scroll-top a {
		display: block;
		width: 60px;
		height: 60px;
		border: 1px solid #DDDFE1;
		text-align: center;
		line-height: 60px;
		font-size: 30px;
		margin-top: -1px;
		color: rgb(255, 255, 255);
		background-color: rgb(220, 215, 215);
		border-radius: 4px;
		transition: all 0.5s ease 0s;
		cursor: pointer;
	}

	.scroll-top a:hover {
		background: rgb(55, 62, 82);
		transform: scale(1.2);
	}

</style>