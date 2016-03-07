<template>
   
    <div style="margin-top:-21px;z-index:3000">

        <div @click="leaveThisRoom()" title="退出当前房间" class="type-circle header-circle" style="left: 115px;">
            <span class="glyphicon glyphicon-arrow-left"></span>
        </div>

        <div @click="syncPaintingStatus()" title="保存当前绘画/UI状态" class="type-circle header-circle" style="left: 165px;">
            <span class="glyphicon glyphicon-ok"></span>
        </div>

        <div @click="shareThisCG()" title="分享绘画" class="type-circle header-circle" style="left: 215px;">
            <span class="glyphicon glyphicon-share-alt"></span>
        </div>

        <div @click="toggleSyncPaintingStatus()" v-bind:class="{'active': instantSaving.startInstantSavingThread == true, 'noactive': instantSaving.startInstantSavingThread == false}" title="{{instantSaving.tips}}" class="type-circle header-circle sync" style="left: 265px;">
            <span class="glyphicon glyphicon-refresh"></span>
        </div>

        <loading v-show="isLoaded == false"></loading>

        <div v-show="isLoaded == true" class="row a-bounceinT">

        	<div class="col-md-12" style="padding:0px;border-top:1px solid rgb(217, 217, 217)">
        		<div class="col-md-3" style="padding-left:0px;padding-right:0px;border-bottom:1px solid rgb(217, 217, 217);height:90vh;border-right:1px solid rgb(217, 217, 217);background: rgb(238, 238, 238)">
	        		<div class="chatting-section" style="text-align:center">
	        		<span>房间名称：{{room.name}}</span>
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
        								<textarea v-model="message"  v-on:focus="showFullSendForm()" v-on:keyup.enter="confirmToSendChattingMessage()" placeholder="说点什么..."></textarea>
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
								<canvas width="800" height="800" id="base-canvas"></canvas>
								<canvas v-bind:style="{zIndex: layer.zindex, display: layer.display, opacity: layer.opacity, marginTop: layer.marginTop}" width="800" height="800" id="{{layer.id}}" v-for="layer in paint.layer"></canvas>
								<div id="cursor" v-bind:style="paintUI.colorPickerCursorPosition" v-show="paint.isColorPicker == true"></div>
							</div>
		        		</div>
		        		<div class="col-md-3" style="padding-left:0px;padding-right:0px;">
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
		        						<li v-on:dblClick="makeThisLayerEditable(key)" @click="toggleLayer(key, layer.id, paint.currentLayer.index)" v-bind:class="{'active': layer.active == true , 'noactivelayer': layer.active == false, 'edit-status': layer.editable == true}" v-for="(key, layer) in paint.layer">
		        							<input v-model="layer.name" v-on:dblClick="makeThisLayerEditable(key, false)" @keyup.enter="confirmEditThisLayerName(key, layer.name)" type="text" class="name-input">
		        							<span class="layer-name">{{layer.name}}</span>
		        							<div class="eye-button">
		        								 <span @click="hideThisLayer(key)" v-show="layer.display == 'block'" class="glyphicon glyphicon-eye-open"></span>
		        								 <span @click="showThisLayer(key)" v-show="layer.display == 'none'" class="glyphicon glyphicon-eye-close"></span>
		        							</div>
		        							<div class="opacity-rate">
		        								<span>{{layer.opacity}}</span>
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
				        					<input v-model="paint.layer[paint.currentLayer.index].opacity" class="opacity-slider" type="range">	
			        					</div>
			        					<div class="col-md-2" style="padding:0px;">
			        						<span class="label">{{paint.layer[paint.currentLayer.index].opacity}}%</span>
			        					</div>
		        					</div>
		        				</div>
		        				<div class="layer-controls">
									<div @click="addNewLayer()" class="zoom-button"><span class="glyphicon glyphicon-plus"></span></div>
									<div @click="removeThisLayer()" class="zoom-button"><span class="glyphicon glyphicon-minus"></span></div>
		        				</div>
		        			</div>
		        		</div>   			
	        		</div>
	        		<div class="row">
	        			<div class="col-md-4">
			        		<div class="master-controls">
			        			<div class="button-container">
			        				<a @click="useBrush()" class="tool-button" v-bind:class="{'active': paint.isEraser == false && paint.isColorPicker == false, 'noac': paint.isEraser == true}"><span class="glyphicon glyphicon-pencil"></span></a>
			        				<a @click="useColorPicker()" v-bind:class="{'active': paint.isColorPicker == true, 'noac': paint.isColorPicker == false}" class="tool-button"><span class="glyphicon glyphicon-pushpin"></span></a>
			        				<a @click="useEraser()" v-bind:class="{'active': paint.isEraser == true && paint.isColorPicker == false, 'noac': paint.isEraser == false}" class="tool-button"><span class="glyphicon glyphicon-erase"></span></a>
			        				<a @click="reDraw()" class="tool-button reverse"><span class="glyphicon glyphicon-share-alt"></span></a>
			        				<a @click="uploadPic()" class="tool-button">
			        					<span class="glyphicon glyphicon-cloud-upload"></span>
			        					<input id="upfile" v-on:change="getPicFile()" type="file" style="display:none" v-model="paint.picData">
			        				</a>
			        				<a @click="getImgUrl()" class="tool-button"><span class="glyphicon glyphicon-download-alt"></span></a>
			        				<a @click="clearCanvas()" class="tool-button"><span class="glyphicon glyphicon-trash"></span></a>
			        			</div>
			        		</div>
	        			</div>
	        			<div class="col-md-4" id="color-picker-area"></div>
	        			<div class="col-md-4">
	        				<div class="button-container" style="margin-top:7px;">
	    						<div class="row">
	        						<div class="col-md-2" style="padding:0px;text-align:center">
			        					<span class="label">透明度</span>
		        					</div>
		        					<div class="col-md-8">
			        					<input disabled="true" class="opacity-slider" type="range">		        						
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
			        					<input v-show="paint.isEraser == false" class="opacity-slider" type="range" min="1" max="100" v-model="paint.lineWidth">
			        					<input v-show="paint.isEraser == true" class="opacity-slider" type="range" min="1" max="100" v-model="paint.eraserRadius">
		        					</div>
		        					<div class="col-md-2" style="padding:0px;">
		        						<span v-show="paint.isEraser == false" class="label">{{paint.lineWidth}}px</span>
		        						<span v-show="paint.isEraser == true" class="label">{{paint.eraserRadius}}px</span>
		        					</div>
	        					</div>
	        					<div class="row">
	        						<div class="col-md-2" style="padding:0px;text-align:center;text-align:center">
			        					<span class="label">阴影</span>
		        					</div>
		        					<div class="col-md-8">
			        					<input disabled="true" class="opacity-slider" type="range">		        						
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
    import colorPickerCursor from '../../commons/images/cursor.png';
    import ColorPicker from '../../commons/scripts/ColorPicker.js';
    import loading from '../loading/loading.vue';

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
            	message: '',

            	isLoaded: false,

            	paint: {
            		x: [], //鼠标移动时x坐标
            		y: [], //鼠标移动时y坐标
            		lock: false, //鼠标移动前，判断鼠标是否按下
            		isEraser: false,
            		eraserRadius: 15,
            		isColorPicker: false,
            		canvas: '',
            		cxt: '',
            		baseCanvas: '',
            		baseCxt: '',
            		lineWidth: 5,
            		strokeStyle: 'rgba(0, 0, 0, 0)',
            		width: 0,
            		height: 0,

            		clickDrag: [],

            		touch: ('createTouch' in document),
            		startEvent: this.touch ? 'touchstart' : 'mousedown',
            		moveEvent: this.touch ? 'touchmove' : 'mousemove',
            		endEvent: this.touch ? 'touchend' : 'mouseup',

            		layer: [{
            			name: '背景',
            			opacity: 100,
            			display: 'block',
            			zindex: 1,
            			id: 'layer-bg',
            			active: true,
            			editable: false,
            			marginTop: 0,
            			dataURL: ''
            		}],

            		currentLayer: {
            			id: 'layer-bg',
            			index: 0
            		},

            		picData: '',
            		dataURL: ''
            	},

            	paintUI: {
            		colorPickerCursorPosition: '',
            		colorPicker: {}
            	},

            	instantSaving: {
            		instantSavingThreadFlag: 0,
            		startInstantSavingThread: false,
            		tips: '关闭自动保存'
            	}
            }
        },

        components: {
        	'loading': loading
        },

        methods: {

        	shareThisCG: function(obj, cb) {

        		var navToPoi = obj.navToPoi == false ? obj.navToPoi : true;

        		//上传图片
        		//存到cookie
        		//加载poi新增CG页面
        		var base64 = obj.base64 || this.paint.baseCanvas.toDataURL();

        		var requestParams = navToPoi ? localStorage._id + '/roomCG/' + this.room._id + '/sharing' : localStorage._id + '/roomCG/' + this.room._id + '/painting';

        		requestParams = obj.isLayer ? requestParams + '/layers' : requestParams;

        		services.KakuService.uploadBase64ToServer({
        			uid: requestParams,
        			nodel: obj.nodel || 'no'
        		}, {
        			base64Image: base64
        		}).then(function(res) {

	                var code = res.data.status;
                    var data = res.data.message;

                    if(code != 200) {
                        util.messageBox(data, true);
                        return false;
                    }

                    var imageUrl = data.origin;

                    if(navToPoi) {
	                    util.setCookie('shareCG', imageUrl, 1);
	                    window.location.href = 'http://poi.poimoe.com/#!/cg/new';
                    }else {
                    	cb(imageUrl);
                    }

        		}, function(err) {
        			util.handleError(err);
        		});
        	},

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

        		if(_this.message == '') {
        			util.messageBox('请输入发送内容');
        			return false;
        		}

        		var chatMessage = {
        			sender: localStorage._id,
        			roomId: _this.room._id,
        			message: _this.message,
        			accessToken: localStorage.accessToken
        		};
        		console.log(chatMessage);
        		chatSocket.emit('chat message', chatMessage);
        	},

        	addNewLayer: function(layer, noSocket) {
        		noSocket = noSocket || false;

        		var thisPaint = this.paint;
        		var thisPaintLayer = thisPaint.layer;

        		var currentLayerIndex = thisPaint.currentLayer.index;

        		thisPaintLayer[currentLayerIndex].active = false;
        		thisPaintLayer[currentLayerIndex].zindex = -1;

        		var layerId = 'LAYER' + util.randomString(8);
        		var layerCount = thisPaintLayer.length;
        		var layer = layer || {
					name: '背景' + layerCount,
        			opacity: 100,
        			display: 'block',
        			zindex: 1,
        			id: layerId,
        			active: true,
        			editable: false,
        			marginTop: '-800px',
        			dataURL: ''
        		};
        		thisPaintLayer.push(layer);

        		this.toggleLayer(layerCount, layerId, currentLayerIndex);

        		layer.people = localStorage._id;

        		if(!noSocket) {
	        		chatSocket.emit('new layer', layer);        			
        		}
        	},

        	removeThisLayer: function(index, noSocket) {
        		noSocket = noSocket || false;

        		var thisPaint = this.paint;
        		var thisPaintLayer = thisPaint.layer;
        		var currentLayer = thisPaint.currentLayer;

        		var currentLayerIndex = index || currentLayer.index;
        		var tmpIndex = currentLayerIndex;

        		if(currentLayerIndex === 0) {
        			util.messageBox('不允许删除的图层');
        			return false;
        		}

        		thisPaintLayer.splice(currentLayerIndex);

        		this.toggleLayer(currentLayerIndex - 1, thisPaintLayer[currentLayerIndex - 1].id);

        		if(!noSocket) {
		    		chatSocket.emit('remove layer', {
		    			index: tmpIndex,
		    			people: localStorage._id
		    		});        			
        		}
        	},

        	toggleLayer: function(activeIndex, activeId, unactiveIndex, noSocket) {
        		if(activeIndex == unactiveIndex) {
        			return false;
        		}

        		noSocket = noSocket || false;

        		var thisPaint = this.paint;
        		var thisPaintLayer = thisPaint.layer;
        		var currentLayer = thisPaint.currentLayer;

        		currentLayer.index = activeIndex;
        		currentLayer.id = activeId;
        		thisPaintLayer[activeIndex].active = true;
        		thisPaintLayer[activeIndex].zindex = 1;
        		if(typeof unactiveIndex != 'undefined') {
	        		thisPaintLayer[unactiveIndex].active = false;
	        		thisPaintLayer[unactiveIndex].zindex = -1;  			
        		}
        		this.initPaintInterval(activeId);
        		if(!noSocket) {
        			chatSocket.emit('toggle layer', {
        				activeIndex: activeIndex,
        				activeId: activeId,
        				unactiveIndex: unactiveIndex,
        				people: localStorage._id
        			});
        		}
        	},

        	showThisLayer: function(id, noSocket) {
        		noSocket = noSocket || false;
        		this.paint.layer[id].display = 'block';
        		if(!noSocket) {
		    		chatSocket.emit('show layer', {
		    			index: id,
		    			people: localStorage._id
		    		});        			
        		}
        	},

        	hideThisLayer: function(id, noSocket) {
        		noSocket = noSocket || false;
        		this.paint.layer[id].display = 'none';
        		if(!noSocket) {
		    		chatSocket.emit('hide layer', {
		    			index: id,
		    			people: localStorage._id
		    		});        			
        		}
        	},

        	makeThisLayerEditable: function(id, makeFalse) {
        		makeFalse = makeFalse || true;
        		this.paint.layer[id].editable = !this.paint.layer[id].editable;
        		console.log(makeFalse);
        		if(!makeFalse) {
        			setTimeout(function() {
	        			this.paint.layer[id].editable = false;        				
        			}, 10);
        		}
        	},

        	confirmEditThisLayerName: function(index, name) {
        		this.paint.layer[index].editable = false;
        		var layer = this.paint.layer[index];
        		layer.people = localStorage._id;
        		layer.index = index;
        		chatSocket.emit('modify layer', layer);
        	},

        	initPaintInterval: function(activeId) {
        		var _this = this;
    			var canvasInitInterval = setInterval(function() {
    				var canvas = document.getElementById(activeId);
	        		if(canvas == null) {
	        			console.log('初始化canvas失败,正在尝试重新初始化...');
	        		}else {
	        			clearInterval(canvasInitInterval);
		        		_this.initPaint(canvas, true);	        			
	        		}
    			}, 100);
        	},

        	initBasePaint: function() {
        		this.paint.baseCanvas = document.getElementById('base-canvas');
        		this.paint.baseCxt = this.paint.baseCanvas.getContext('2d');

        		this.paint.baseCxt.lineJoin = 'round';//两条线段连接方式
        		this.paint.baseCxt.lineWidth = this.paint.lineWidth;//线条宽度
        		this.paint.baseCxt.globalCompositeOperation = "source-over";
        	},

        	initPaint: function(canvas, nofill) {
        		console.log(this.paint);
        		this.paint.canvas = canvas || document.getElementById(this.paint.currentLayer.id);
        		nofill = nofill || false;

        		if(!this.paint.canvas.getContext) {
        			util.messageBox('对不起，您的浏览器暂不支持canvas');
        			return false;
        		}

        		this.paint.cxt = this.paint.canvas.getContext('2d');
        		this.paint.cxt.lineJoin = 'round';//两条线段连接方式
        		this.paint.cxt.lineWidth = this.paint.lineWidth;//线条宽度
        		this.paint.cxt.globalCompositeOperation = "source-over";

        		this.paint.width = this.paint.canvas.width;
        		this.paint.height = this.paint.canvas.height;

        		if(!nofill) {
	        		// this.paint.cxt.fillStyle = 'rgba(255, 255, 255, 100)';
	        		// this.paint.cxt.fillRect(0,0,this.paint.width,this.paint.height);
        		}

        		var _this = this;

        		if(!_this.colorPicker) {

	    		    _this.colorPicker = ColorPicker.init({
	        			onColorChange: function(color) {
	        				_this.paint.strokeStyle = color;
	        			},
	        			defaultColor: 'rgba(0, 0, 0, 255)'
	        		});
				    var panel = _this.colorPicker.getPanel();
				    document.getElementById('color-picker-area').appendChild(panel);

        		}

        		this.bindCanvas();
        	},

        	bindCanvas: function(canvas) {
        		var _this = this;
        		var t = _this.paint;

        		canvas = canvas || t.canvas;
	            /*鼠标按下事件，记录鼠标位置，并绘制，解锁lock，打开mousemove事件*/
        		canvas['on' + t.startEvent] = function(e) {
	        		t.cxt.lineWidth = t.lineWidth;//线条宽度
	        		t.cxt.strokeStyle = t.strokeStyle;//线条颜色
	        		t.baseCxt.lineWidth = t.lineWidth;
	        		t.baseCxt.strokeStyle = t.strokeStyle;
	                var touch = t.touch ? e.touches[0] : e;
	                var mp = _this.getMousePos(touch);
	                var _x = mp.x;
	                var _y = mp.y;
                    t.lock = true;
                    if(t.isEraser) {
                    	_this.resetErase(_x, _y, touch);
                    }else {
                    	if(t.isColorPicker) {
                    		var pixcolor = _this.getPixelColor(_x, _y);
                    		_this.paintUI.colorPickerCursorPosition = 'left:' + _x + 'px;top:' + _y + 'px';
                    		_this.setBrushColor(pixcolor);
                    		t.lock = false;
                    	}else {
	                        _this.movePoint(_x, _y, true);//记录鼠标位置
	                        _this.drawPoint(true);//绘制路线
	                        _this.drawPoint(true, t.baseCxt);//绘制路线
                    	}
                    }
        		};
        		/*鼠标移动事件*/
	            canvas['on' + t.moveEvent] = function(e) {
	                var touch = t.touch ? e.touches[0] : e;
	                if(t.lock) {
    	                var mp = _this.getMousePos(touch);
		                var _x = mp.x;
		                var _y = mp.y;
	                    if(t.isEraser) {
                            _this.resetErase(_x, _y, touch);
	                    }else {
	                        _this.movePoint(_x, _y, true);//记录鼠标位置
	                        _this.drawPoint(true);//绘制路线
	                        _this.drawPoint(true, t.baseCxt);//绘制路线
	                    }
	                }else {
	                	if(t.isColorPicker) {
                    		var pixcolor = _this.getPixelColor(_x, _y);
                    		_this.paintUI.colorPickerCursorPosition = 'left:' + _x + 'px;top:' + _y + 'px';
                    	}
	                }
	            };
	            /*鼠标弹起事件*/
	            canvas['on' + t.endEvent] = function(e) {
	                /*重置数据*/
	                t.lock = false;
	                t.x = [];
	                t.y = [];
	                t.clickDrag = [];
            	};

        	},

        	getMousePos: function(touch) {
        		var t = this.paint;
                var rect = t.canvas.getBoundingClientRect(); 
                var _x = touch.clientX - rect.left * (t.canvas.width / rect.width);//鼠标在画布上的x坐标，以画布左上角为起点
                var _y = touch.clientY - rect.top * (t.canvas.height / rect.height);//鼠标在画布上的y坐标，以画布左上角为起点
                return {
                	x: _x,
                	y: _y
                }
        	},

        	getPixelColor: function(_x, _y) {
        		var t = this.paint;
				var imageData = t.cxt.getImageData(_x, _y, 1, 1);
				var pixel = imageData.data;
				var pixcolor = "rgba(" + pixel[0] + "," + pixel[1] + "," + pixel[2] + "," + pixel[3] + ")";
				return pixcolor;
        	},

        	setBrushColor: function(color) {
        		this.paint.strokeStyle = color;
        		this.colorPicker.setThumbnailSwatchColor(color);
        	},

        	clearCanvas: function(noSocket) {
        		noSocket = noSocket || false;
	            this.paint.cxt.clearRect(0, 0, this.paint.width, this.paint.height);//清除画布，左上角为起点
	            this.paint.baseCxt.clearRect(0, 0, this.paint.width, this.paint.height);//清除画布，左上角为起点
	            if(!noSocket) {
	            	chatSocket('clear layer', {
	            		people: localStorage._id
	            	});
	            }        
        	},

        	resetErase: function(_x, _y, touch) {
        		var t = this.paint;
        		var cxt = t.cxt;
        		for (var i = 0; i < 2; i++) {
        			if(i === 1) {
        				cxt = t.baseCxt;
        			}
	        		cxt.globalCompositeOperation = "destination-out";
		            cxt.beginPath();
		            cxt.arc(_x, _y, t.eraserRadius, 0, Math.PI * 2);
		            cxt.strokeStyle = "rgba(250,250,250,0)";
		            cxt.fill();
		            cxt.globalCompositeOperation = "source-over";
        		};
        	},

        	resetBrush: function() {

        	},

        	movePoint: function(x, y, dragging) {
        		var t = this.paint;
	            t.x.push(x);
	            t.y.push(y);
	            t.clickDrag.push(y);
        	},

        	drawPoint: function(sendSocket, cxt) {

        		sendSocket = sendSocket || false;

        		var t = this.paint;
        		var cxt = cxt || t.cxt;
        		cxt.fillStyle = "#000000";

        		if(sendSocket) {
	        		chatSocket.emit('start draw kaku', {
	        			x: t.x,
	        			y: t.y,
	        			strokeStyle: t.strokeStyle,
	        			clickDrag: t.clickDrag,
	        			lineWidth: t.lineWidth,
	        			eraserRadius: t.eraserRadius,
	        			people: localStorage._id
	        		});
        		}

				for(var i=0; i < t.x.length; i++) {   
	                cxt.beginPath();//context.beginPath() , 准备绘制一条路径	                
	                if(t.clickDrag[i] && i){//当是拖动而且i!=0时，从上一个点开始画线。
	                    cxt.moveTo(t.x[i-1], t.y[i-1]);//context.moveTo(x, y) , 新开一个路径，并指定路径的起点
	                }else{
	                    cxt.moveTo(t.x[i] - 1, t.y[i]);
	                }

	                cxt.lineTo(t.x[i], t.y[i]);//context.lineTo(x, y) , 将当前点与指定的点用一条笔直的路径连接起来
	                cxt.closePath();//context.closePath() , 如果当前路径是打开的则关闭它
	                cxt.stroke();//context.stroke() , 绘制当前路径
	            }

	            cxt.save();
        	},

        	reDraw: function() {
        		this.paint.cxt.restore();
        	},

        	useEraser: function() {
        		this.paint.isEraser = true;
        		this.paint.isColorPicker = false;
        	},

        	useBrush: function() {
        		this.paint.isEraser = false;
        		this.paint.isColorPicker = false;
        		this.paint.cxt.strokeStyle = this.paint.strokeStyle;
        	},

        	useColorPicker: function() {
        		this.paint.isEraser = false;
        		this.paint.isColorPicker = true;
        	},

        	toggleBtnStatus: function() {

        	},

        	getImgUrl: function() {
        		window.open(this.paint.baseCanvas.toDataURL());
        	},

        	uploadPic: function() {
        		document.getElementById('upfile').click();
        	},

        	getPicFile: function() {

        		var file = document.getElementById('upfile');

			    var reader = new FileReader();

			    var _this = this;

			    reader.readAsDataURL(file.files[0]);  
			    reader.onload = function(e){
			    	_this.drawImage(this.result);
			    };

			    reader.onerror = function(e) {
			    	console.log(e);
			    };

			    reader.onabort = function(e) {
			    	console.log(e);
			    };
        	},

        	drawImage: function(src, noSocket) {

        		noSocket = noSocket || false;

    			var image = new Image();
        		image.src = src;

        		var _this = this;
        		image.onload = function() {
	        		_this.paint.cxt.drawImage(image, 0, 0);
	        		_this.paint.baseCxt.drawImage(image, 0, 0);

	        		if(!noSocket) {
	        			chatSocket.emit('draw image', {
	        				image: src,
	        				people: localStorage._id
	        			});	        			
	        		}
        		};

        	},

        	drawImageOnCanvas: function(src, canvas, cb) {
    			var image = new Image();

    			console.log(src);

        		image.crossOrigin = "anonymous";
        		image.src = src;

        		console.log(image);

        		image.onload = function() {
	        		canvas.drawImage(image, 0, 0);
	        		if(cb) {
	        			cb(this);
	        		}
        		};        		
        	},

        	enterRoom: function(id) {

        		var _this = this;

                var chatSocket = io('ws://socket.poimoe.com/chat');
				chatSocket.emit('enter chatting room', {
        			people: localStorage._id,
        			roomId: id,
        			passport: sessionStorage[id],
        			username: localStorage.username,
        			accessToken: localStorage.accessToken
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

                    if(_this.room.paint != null) {
	                    _this.paint = _this.room.paint;

	                    // 将字符串的false或true转换为真实的false或true
	                    for(var key in _this.paint) {

	                    	_this.paint[key] = _this.paint[key] == 'false' ? false : (_this.paint[key] == 'true' ? true : _this.paint[key]);

	                    	if(key == 'layer' || key == 'currentLayer') {
                    			if(typeof _this.paint[key].length == 'number') {

                    				for (var i = 0; i < _this.paint[key].length; i++) {
                    					var curr = _this.paint[key][i];
                    					for(var k in curr) {
                    						_this.paint[key][i][k] = _this.paint[key][i] == 'false' ? false : ( _this.paint[key][i][k] == 'true' ? true : _this.paint[key][i][k] );
                    					}
                    				};

                    			}
	                    	}

	                    }

	                    _this.paint.x = [];
	                    _this.paint.y = [];
	                    _this.paint.clickDrag = [];
                    }
                    // _this.paintUI = _this.room.paintUI;

                    setTimeout(function() {
	                    _this.initPaint();
	                    _this.initBasePaint();

	                    //初始化用户图像

	                    //先将图片转换为dataURL，否则在使用toDataURL时会产生跨域问题

	                    _this.drawImageOnCanvas(_this.paint.dataURL, _this.paint.baseCxt);
	                    _this.drawImageOnCanvas(_this.paint.dataURL, _this.paint.cxt);

	                    for (var i = 0; i < _this.paint.layer.length; i++) {
	                    	var currentLayer = _this.paint.layer[i];
	                    	console.log(currentLayer.id);
	                    	var tmpCxt = document.getElementById(currentLayer.id).getContext('2d');
	                    	if(currentLayer.dataURL != '') {
		                    	_this.drawImageOnCanvas(currentLayer.dataURL, tmpCxt);
	                    	}
	                    };

	                    _this.isLoaded = true;

	                    setTimeout(function() {
	    		        	common.adjustUI();
	                    }, 400);

        				_this.initKakuMQSocket();
						_this.initKakuInstantSavingThread();

                    }, 10);

                    //// _this.initKakuSocket(id);

				});

				chatSocket.on('enter chatting room failed', function(msg) {
					util.handleError(msg, 'socket');
				});

				chatSocket.on('leave room failed', function(msg) {
					util.handleError(msg, 'socket');
				});

				chatSocket.on('leave room succeed', function(msg) {
					console.log(msg);
				});

				chatSocket.on('sys', function(msg) {
					util.handleError(msg, 'socket');
				});

                chatSocket.on('chat message', function(msg) {

        			if(typeof msg === 'string') {
        				msg = JSON.parse(msg);
        			}

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

        	syncPaintingStatus: function(isLeave) {

        		var _this = this;

        		isLeave = isLeave || false;

				var cxtList = ['baseCanvas', 'baseCxt', 'cxt', 'canvas'];

				var img = new Image;

				img.crossOrigin = '*';
				img.src = '';
				
				img.onload = function() {

				};

				var dataURL = this.paint.baseCanvas.toDataURL();

				_this.shareThisCG({
					base64: dataURL,
					navToPoi: false,
					nodel: 'no'
				}, function(imageUrl) {

					_this.paint.dataURL = imageUrl;
					var tmpCanvas = {};

					var paintLayerLength = _this.paint.layer.length;

					console.log('sdfghj');

					// _this.paint.layer.forEach(function(currentLayer, i) {
					// 	tmpCanvas = document.getElementById(currentLayer.id);
					// 	if(tmpCanvas != null) {
					// 		_this.shareThisCG({
					// 			base64: tmpCanvas.toDataURL(),
					// 			navToPoi: false,
					// 			nodel: true,
					// 			isLayer: true
					// 		}, function(layerImg) {
					// 			_this.paint.layer[i].dataURL = layerImg;

					// 			console.log(layerImg, i);

					// 			if(i == paintLayerLength - 1) {

					// 				var tmpPaint = util.cloneObject(_this.paint, cxtList);
					// 				var tmpPaintUI = util.cloneObject(_this.paintUI);

					// 				var data = {
					// 					roomId: _this.room._id,
					// 					people: localStorage._id,
					// 					paint: tmpPaint,
					// 					paintUI: tmpPaintUI,
					// 					accessToken: localStorage.accessToken
					// 				};

					// 				localStorage.roomStatus = JSON.stringify(data);

					// 				chatSocket.emit('save image', data);
					// 			}

					// 		});
					// 	}
					// });

					var tmpLayerDataURL = [];

					for (var i = 0; i < _this.paint.layer.length; i++) {
						var currentLayer = _this.paint.layer[i];
						tmpCanvas = document.getElementById(currentLayer.id);
						if(tmpCanvas != null) {
							tmpLayerDataURL.push(tmpCanvas.toDataURL());
						}
					};

					var requestParams = localStorage._id + '/roomCG/' + _this.room._id + '/painting/layers';

					console.log(requestParams);

	        		services.KakuService.uploadBase64ToServer({
	        			uid: requestParams,
	        			nodel: 'no'
	        		}, {
	        			layersList: tmpLayerDataURL
	        		}).then(function(res) {

		                var code = res.data.status;
	                    var data = res.data.message;

	                    console.log(data);

	                    if(code != 200) {
	                        util.messageBox(data, true);
	                        return false;
	                    }

	        		}, function(err) {
	        			util.handleError(err);
	        		});

				});

        	},

        	toggleSyncPaintingStatus: function() {
        		if(this.instantSaving.startInstantSavingThread) {
        			clearInterval(this.instantSaving.instantSavingThreadFlag);
        			this.instantSaving.tips = '开启自动保存';
        			util.messageBox('关闭自动保存成功');
        			this.instantSaving.startInstantSavingThread = false;
        		}else {
        			this.initKakuInstantSavingThread();
        			util.messageBox('开启自动保存成功');
        		}
        	},

			initKakuInstantSavingThread: function() {

				var _this = this;

				_this.instantSaving.startInstantSavingThread = true;
    			_this.instantSaving.tips = '关闭自动保存';

				_this.instantSaving.instantSavingThreadFlag = setInterval(function() {
					_this.syncPaintingStatus();
				}, 10000);

				chatSocket.on('get save image succeed', function(data) {
					console.log(data);
					util.messageBox(data.message);
				});

				chatSocket.on('get save image failed', function(data) {
					util.handleError(data, 'socket');
				});

			},

        	initKakuMQSocket: function() {

        		var _this = this;

				chatSocket.on('get kaku path', function(data) {

					if(!(data.people.toString() == localStorage._id)) {
						_this.paint.strokeStyle = data.strokeStyle;
						_this.paint.lineWidth = data.lineWidth;
						_this.paint.x = data.x;
						_this.paint.y = data.y;
						_this.paint.clickDrag = data.clickDrag;
						_this.paint.eraserRadius = data.eraserRadius;
						_this.drawPoint();
						_this.drawPoint(false, _this.paint.baseCxt);
					}
				});

				chatSocket.on('get new layer', function(data) {

					console.log(data);

					if(!(data.people.toString() == localStorage._id)) {
						_this.addNewLayer(data, true);
					}
				});

				chatSocket.on('get modify layer', function(data) {

					console.log(data);

					if(!(data.people.toString() == localStorage._id)) {

					}
				});

				chatSocket.on('get remove layer', function(data) {

					console.log(data);

					if(!(data.people.toString() == localStorage._id)) {
						var i = data.index;
						data.index = null;
						this.paint.layer[i] = data;
					}
				});

				chatSocket.on('get show layer', function(data) {

					console.log(data);

					if(!(data.people.toString() == localStorage._id)) {
						_this.showThisLayer(data.index, true);
					}
				});

				chatSocket.on('get hide layer', function(data) {

					console.log(data);

					if(!(data.people.toString() == localStorage._id)) {
						_this.hideThisLayer(data.index, true);
					}
				});

				chatSocket.on('get toggle layer', function(data) {

					console.log(data);

					if(!(data.people.toString() == localStorage._id)) {
						_this.toggleLayer(data.activeIndex, data.activeId, data.unactiveIndex, true);
					}
				});

				chatSocket.on('get clear layer', function(data) {

					console.log(data);

					if(!(data.people.toString() == localStorage._id)) {
						_this.clearCanvas(true);
					}
				});

				chatSocket.on('get draw image', function(data) {

					console.log(data);
						_this.drawImage(data.image, true);

					if(!(data.people.toString() == localStorage._id)) {
						_this.drawImage(data.image, true);
					}
				});

        	},

        	initKakuSocket: function(id) {

				var kakuSocket = io('ws://socket.poimoe.com/kaku');

				kakuSocket.emit('kaku message', {
					roomId: id,
					people: localStorage._id,
					username: localStorage.username
				});

				kakuSocket.on('kaku message', function(msg){
					console.log(msg);
				});

				window.kakuSocket = kakuSocket;

        	},

        	leaveThisRoom: function() {
        		this.syncPaintingStatus(true);
        		router.go('/index');     		
        	},

        	viewProfile: function(id) {
        		window.open('http://poi.poimoe.com/#!/profile/' + id);
        	}

        },

        ready() {
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
		background: rgba(255, 255, 255, 0);		
	}

	.main-canvas {
		width: 100%;
		border: 1px solid rgb(216, 216, 216);
		border-top: none;
		border-bottom: none;
		border-left: none;
		height: 74vh;
		overflow: scroll;
		background: rgba(0, 0, 0, 0);
	}

	.main-canvas canvas {
		position: relative;
	}

	.main-canvas canvas#base-canvas {
		display: none;
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
		background: rgb(238, 238, 238);
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

	#cursor {
		position: absolute;
		height: 11px;
		width: 11px;
		background: url(../../commons/images/cursor.png);
		z-index: 65535;
	}

	.swatch {
		width: 20px;
		height: 20px;
		float: right;
	}

	.color-picker-panel {
		padding: 15px;
	}

</style>
