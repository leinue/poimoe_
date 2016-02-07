<template>
   
    <div style="margin-top:-21px;z-index:3000">

        <div @click="leaveThisRoom()" class="type-circle header-circle" style="left: 65px;">
            <span class="glyphicon glyphicon-arrow-left"></span>
        </div>

        <div class="row a-bounceinT">

        	<div class="col-md-12" style="padding:0px;border-top:1px solid rgb(217, 217, 217)">
        		<div class="col-md-3" style="padding-left:0px;padding-right:0px;border-bottom:1px solid rgb(217, 217, 217);height:90vh;border-right:1px solid rgb(217, 217, 217)">
	        		<div class="chatting-section">
	        			<div class="kaku-member">
                            <div title="{{people.username}}" @click="viewProfile(people._id)" class="room-photo" v-for="people in room.people" style="background-image: url({{people.photo}});"></div>     
	        			</div>
	        			<div class="message-detail" id="msg-wrap">
	        				<div class="message-detail-content">
	        					<div class="direct-message creator" v-bind:class="{'creator': myId == people.sender._id, 'receiver': myId != people.sender._id}" v-for="chat in room.chatting">
	        						<div class="avatar direct-message-creator-photo" style="background-image: url({{chat.sender.photo}});" @click="viewProfile(chat.sender._id)">
	        						</div>
	        						<div class="direct-message-body">
	        							<div class="direct-message-header">
	        								<span class="direct-message-creator-name">{{chat.sender.username}}</span>
	        								<time class="time-stamp">{{chat.createdAt}}</time>
	        							</div>
	        							<div class="direct-message-content">
	        							<br>
	        								{{chat.content}}
	        							</div>
	        						</div>
	        					</div>
	        				</div>
	        				<div class="message-send-form" id="msg-send-wrap-id">
	        					<div class="message-box-wrap" v-bind:class="{'active': isShowFullSendForm == true, 'noactive': isShowFullSendForm == false}">
        							<div class="msg-input-wrap">
        								<textarea v-model="message"  v-on:focus="showFullSendForm()" placeholder="说点什么..."></textarea>
        								<!-- v-on:blur="rollbackSendFormStatus()" -->
        							</div>
	        						<div class="message-send-input-wrap">
	        							<div class="msg-btn-wrap">
	        								<button @click="rollbackSendFormStatus()">取消</button>
	        								<button @click="confirmToSendChattingMessage()">发送</button>
	        							</div>
	        						</div>
	        					</div>
	        				</div>
	        			</div>
	        		</div>
	        	</div>
	        	<div class="col-md-9" style="padding-left:0px;padding-right:0px">
	        		<div class="row" style="border-bottom: 1px solid #d8d8d8;">
		        		<div class="col-md-9" style="padding:0px;">
							<div class="main-canvas">
								<canvas id="kakuCanvas"></canvas>
							</div>
		        		</div>
		        		<div class="col-md-3" style="padding-left:0px;padding-right:0px;height:500px">
		        			<div class="zoom-well">
			        			<div class="kaku-map">
			        				<canvas></canvas>
			        				<div class="kaku-viewer"></div>
			        			</div>
								<div class="zoom-control">
									<div class="zoom-button"><span class="glyphicon glyphicon-zoom-in"></span></div>
									<div class="zoom-button"><span class="glyphicon glyphicon-resize-full"></span></div>
									<div class="zoom-button"><span class="glyphicon glyphicon-zoom-out"></span></div>
									<div class="zoom-button right">100%</div>
								</div>		        				
		        			</div>
		        			<div class="layer-well">
		        				<div class="layer-content">
		        					<ul class="layer-list">
		        						<li class="active">
		        							<input type="text" class="name-input">
		        							<span class="layer-name">layer name</span>
		        							<div class="eye-button">
		        								 <span class="glyphicon glyphicon-eye-open"></span>
		        							</div>
		        							<div class="opacity-rate">
		        								<span>100</span>
		        							</div>
		        						</li>
		        						<li>
		        							<input type="text" class="name-input">
		        							<span class="layer-name">layer name</span>
		        							<div class="eye-button">
		        								 <span class="glyphicon glyphicon-eye-open"></span>
		        							</div>
		        							<div class="opacity-rate">
		        								<span>100</span>
		        							</div>
		        						</li>
		        						<li>
		        							<input type="text" class="name-input">
		        							<span class="layer-name">layer name</span>
		        							<div class="eye-button">
		        								 <span class="glyphicon glyphicon-eye-open"></span>
		        							</div>
		        							<div class="opacity-rate">
		        								<span>100</span>
		        							</div>
		        						</li>
		        						<li>
		        							<input type="text" class="name-input">
		        							<span class="layer-name">layer name</span>
		        							<div class="eye-button">
		        								 <span class="glyphicon glyphicon-eye-open"></span>
		        							</div>
		        							<div class="opacity-rate">
		        								<span>100</span>
		        							</div>
		        						</li>
		        					</ul>
		        				</div>
		        				<div class="layer-opacity-slider">
		        					<div class="row">
		        						<div class="col-md-2" style="padding:0px;">
				        					<span class="label">透明度</span>
			        					</div>
			        					<div class="col-md-8">
				        					<input class="opacity-slider" type="range">		        						
			        					</div>
			        					<div class="col-md-2" style="padding:0px;">
			        						<span class="label">100%</span>
			        					</div>
		        					</div>
		        				</div>
		        				<div class="layer-controls">
									<div class="zoom-button"><span class="glyphicon glyphicon-plus"></span></div>
									<div class="zoom-button"><span class="glyphicon glyphicon-minus"></span></div>
		        				</div>
		        			</div>
		        		</div>   			
	        		</div>
	        		<div class="row">
	        			<div class="col-md-4">
			        		<div class="master-controls">
			        			<div class="button-container">
			        				<a class="tool-button"><span class="glyphicon glyphicon-erase"></span></a>
			        				<a class="tool-button"><span class="glyphicon glyphicon-pushpin"></span></a>
			        				<a class="tool-button active"><span class="glyphicon glyphicon-pencil"></span></a>
			        				<a class="tool-button"><span class="glyphicon glyphicon-share-alt"></span></a>
			        				<a class="tool-button reverse"><span class="glyphicon glyphicon-share-alt"></span></a>
			        			</div>
			        		</div>	        				
	        			</div>
	        			<div class="col-md-4">
	        				
	        			</div>
	        			<div class="col-md-4">
	        				<div class="button-container" style="margin-top:7px;">
	    						<div class="row">
	        						<div class="col-md-2" style="padding:0px;text-align:center">
			        					<span class="label">透明度</span>
		        					</div>
		        					<div class="col-md-8">
			        					<input class="opacity-slider" type="range">		        						
		        					</div>
		        					<div class="col-md-2" style="padding:0px;">
		        						<span class="label">100%</span>
		        					</div>
	        					</div>
	        					<div class="row">
	        						<div class="col-md-2" style="padding:0px;text-align:center">
			        					<span class="label">大小</span>
		        					</div>
		        					<div class="col-md-8">
			        					<input class="opacity-slider" type="range">		        						
		        					</div>
		        					<div class="col-md-2" style="padding:0px;">
		        						<span class="label">100%</span>
		        					</div>
	        					</div>
	        					<div class="row">
	        						<div class="col-md-2" style="padding:0px;text-align:center;text-align:center">
			        					<span class="label">阴影</span>
		        					</div>
		        					<div class="col-md-8">
			        					<input class="opacity-slider" type="range">		        						
		        					</div>
		        					<div class="col-md-2" style="padding:0px;">
		        						<span class="label">100%</span>
		        					</div>
	        					</div>
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

    var common = {

    	adjustUI: function(form, closeForm) {

    		form = form || false;
    		closeForm = closeForm || false;

    		var msgWrap = document.getElementById('msg-wrap');
        	var msgWrapWidth = msgWrap.offsetWidth;
        	var msgWrapHeight = msgWrap.offsetHeight;

        	var msgSendWrap = document.getElementById('msg-send-wrap-id');
        	var msgSendWrapHeight = msgSendWrap.offsetHeight;

        	msgSendWrap.setAttribute('style', 'width:' + msgWrapWidth + 'px');
        	if(!form) {
	        	msgWrap.setAttribute('style', 'height:' + (msgWrapHeight - msgSendWrapHeight - 87) + 'px');        		
        	}else {
        		if(!closeForm) {
		        	msgWrap.setAttribute('style', 'height:' + (msgWrapHeight - msgSendWrapHeight + 50) + 'px');        				
        		}else {
		        	msgWrap.setAttribute('style', 'height:' + (msgWrapHeight - msgSendWrapHeight + 144) + 'px');
        		}
        	}

        	msgWrap.scrollTop = msgWrapHeight;

    	}

    };

    export default {
        data() {
            return {
            	isShowFullSendForm: false,
            	sendFormClicked: false,

            	myId: localStorage._id,

            	room: {},
            	message: ''
            }
        },

        components: {

        },

        methods: {

        	showFullSendForm: function() {
        		if(!this.sendFormClicked) {
	        		this.sendFormClicked = true;
	        		this.isShowFullSendForm = true;
		        	setTimeout(function() {
			        	common.adjustUI(true);
		        	}, 500);
        		}
        	},

        	rollbackSendFormStatus: function() {
        		if(this.sendFormClicked) {
	        		this.isShowFullSendForm = false;
	        		this.sendFormClicked = false;
		        	common.adjustUI(true, true);
        		}
        	},

        	confirmToSendChattingMessage: function() {
        		var _this = this;
        		var chatMessage = {
        			sender: localStorage._id,
        			roomId: _this.room._id,
        			message: _this.message,
        			accessToken: localStorage.accessToken
        		};
        		console.log(chatMessage);
        		chatSocket.emit('chat message', chatMessage);
        	},

        	enterRoom: function(id) {

        		var _this = this;

                var chatSocket = io('ws://socket.poimoe.com/chat');
				chatSocket.emit('enter chatting room', {
        			people: localStorage._id,
        			roomId: id,
        			passport: sessionStorage[id],
        			username: localStorage.username
        		});

				window.chatSocket = chatSocket;

				chatSocket.on('enter chatting room succeed', function(res) {

        			var code = res.code;
                    var data = res.message;

                    if(code != 200) {
                        util.messageBox(data);
                        router.go('/index');
                        return false;
                    }

                    console.log(res);

                    _this.room = data[0];

                    _this.room.chatting.reverse();

				});

				chatSocket.on('enter chatting room failed', function(msg) {
					console.log(msg);
				});

				chatSocket.on('leave room failed', function(msg) {
					console.log(msg);
					util.handleError(msg);
				});

				chatSocket.on('sys', function(msg) {
					console.log(msg);
				});

                chatSocket.on('chat message', function(msg) {

        			if(typeof msg === 'string') {
        				msg = JSON.parse(msg);
        			}

					console.log(msg);

					var code = msg.code;
					var data = msg.message;

					if(code != 200) {
						util.messageBox(data);
						return false;
					}

					_this.room.chatting.push(data.chatting[0]);
					_this.message = '';
				});

        	},

        	leaveThisRoom: function() {
        		// var _this = this;
        		// chatSocket.emit('leave', {
        		// 	leaver: localStorage._id,
        		// 	roomId: _this.room._id
        		// });

        		router.go('/index');
        		
    //     		chatSocket.on('leave room succeed', function(msg) {
				// 	console.log(msg);
				// });

				// chatSocket = undefined;
        	},

        	viewProfile: function(id) {
        		window.open('http://poi.poimoe.com/#!/profile/' + id);
        	}

        },

        ready() {
        	common.adjustUI();
			var id = router._currentRoute.params.id;

			var _this = this;

            var servicesInterval = setInterval(function() {
                if(typeof window.services != 'undefined') {

					_this.$get('enterRoom')(id);

                    clearInterval(servicesInterval);

                }
            }, 1);
        }
    };


</script>

<style>

	canvas {
		background: rgb(255, 255, 255);		
	}

	.main-canvas {
		width: 100%;
		border: 1px solid rgb(216, 216, 216);
		border-top: none;
		border-bottom: none;
		border-left: none;
		height: 74vh;
		overflow: scroll;
	}

	.main-canvas canvas{
		width: 100%;
		height: 100%;
	}

	.kaku-map {
		width: 100%;
		/*background: rgb(234, 234, 234);*/
		padding-left: 20px;
		padding-right: 20px;
		padding-top: 6px;
		padding-bottom: 2px;
		border-bottom: 1px solid #d8d8d8;
		border-radius: 2px;
	}

	.kaku-map canvas {
		width: 100%;
		height: 140px;
	}

	.kaku-viewer {
		position: absolute;
		width: 70%;
		border: 1px solid rgb(0, 0, 0);
		top: 10px;
		height: 10%;
	}

	.zoom-control {
		margin-top: 5px;
		height: 23px;
		margin-bottom: 5px;
	}

	.zoom-control .zoom-button, .layer-controls .zoom-button{
		width: 23px;
		height: 23px;
		margin: 0 5px 0 0;
		border-radius: 4px;
		cursor: pointer;
		float: left;
		text-align: center;
		transition: all 0.4s ease-in-out;
		font-size: 11px;
	}

	.zoom-control .zoom-button span, .layer-controls .zoom-button span {
		height: 23px;
		width: 23px;
		line-height: 23px;
		border-radius: 4px;
		transition: all 0.3s ease;
		color: #7f7f7f;
	}

	.zoom-control .zoom-button span:hover, .layer-controls .zoom-button span:hover {
		background: rgb(222, 222, 222);
	}

	.zoom-control .zoom-button.right{
		width: 30px;
		height: 23px;
		font-size: 9px;
		line-height: 21px;
		color: #7f7f7f;
		float: right;
		text-align: right;
	}

	.layer-well {
		width: 100%;
		height: calc(100% - 164px);
		height: -moz-calc(100% - 164px);
	}

	.layer-content, .chatting-section {
		/*background: rgb(234, 234, 234);*/
		border-radius: 2px;
		padding: 5px;
		height: 100%;
	}

	.layer-list {
		margin-bottom: 0px;
		overflow-x: hidden;
		overflow-y: auto;
		color: #000;
		text-align: left;
		padding: 0;
		list-style: none;
	}

	.layer-list li {
		width: 100%;
		padding: 4px;
		color: rgb(0, 0, 0);
		cursor: default;
		font-size: 11px;
		line-height: 22px;
		overflow: hidden;
		text-align: left;
		border-bottom: 1px solid #d8d8d8;
		color: #000;
	}

	.layer-list li input {
		display: none;
	}

	.layer-list li.edit-status input{
		display: block;
	}

	.layer-list li.edit-status .layer-name {
		display: none;
	}

	.layer-list li.active {
		background: rgb(255, 255, 255);
	}

	.layer-list li.active .layer-name {
		font-weight: bold;
		font-style: italic;
		color: #808080;
	}

	.layer-list li.active span{
		color: rgb(0, 0, 0);
	}

	.layer-list li .layer-name {
		color: #7f7f7f;
	}

	.eye-button {
		position: absolute;
		right: 10px;
		font-size: 12px;
		margin-top: -20px;
		cursor: pointer;
	}

	.eye-button span, .opacity-rate span {
		color: #7f7f7f;
	}

	.opacity-rate {
		position: absolute;
		right: 32px;
		margin-top: -21px;
	}

	.name-input {
		border-top: 0px;
		border-left: 0px;
		border-right: 0px;
		border-bottom: 1px solid #d8d8d8;
	}

	.opacity-slider {
		height: 10px;
		margin-top: 7px;
		box-shadow: none;
		background: rgb(170, 170, 170);
	}

</style>
