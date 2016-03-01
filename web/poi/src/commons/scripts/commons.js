var vue = require('vue');

window.loadEnd = function(cb) {

	var loadInterval = setInterval(function() {

		if(typeof window.router != 'undefined') {
			clearInterval(loadInterval);
			cb;
		}

	}, 1);

};

window.setCookie = function(c_name,value,expiredays) {  
	var exdate=new Date();
	exdate.setDate(exdate.getDate()+expiredays);
	document.cookie=c_name+ "=" +escape(value)+((expiredays==null) ? "" : ";expires="+exdate.toGMTString())+";path=/;domain=poimoe.com";
};

window.getCookie = function(c_name) {  
	if (document.cookie.length > 0){  
		c_start = document.cookie.indexOf(c_name + "=");
		if (c_start != -1){
			c_start = c_start + c_name.length+1;  
			c_end = document.cookie.indexOf(";",c_start);  
			if (c_end == -1){
				c_end = document.cookie.length;  
				return unescape(document.cookie.substring(c_start,c_end));  					
			}
		}
	}  
	return "";  
};

module.exports = {

	registerComponent: function(obj) {
		var myComponent = vue.extend({
			template: obj.template
		});

		vue.component(obj.name, myComponent);
	},

	getElementsByClassName: function(className) {
		var all = document.all ? document.all : document.getElementsByTagName( ' *' );
    	var elements = new Array();
    	for ( var e = 0; e < all.length; e ++ ) {
      		if (all[e].className == className) {
        		elements[elements.length] = all[e];
        		break ;
      		}
    	}
    	return elements;
    },

    cancelActiveMenu: function() {
		var poiHeader = document.getElementById('poi-header');
		var ul = poiHeader.childNodes;

		if(ul.item(1) != null){
			var lis = ul.item(1).getElementsByTagName('li');
		}else {
			var lis = ul.item(0).getElementsByTagName('li');
		}

		for (var i = 0; i < lis.length; i++) {
			var li = lis[i];
			var route = li.getAttribute('route');
			var span = li.childNodes.item(0);

			span.setAttribute('class', '');
		};
    },

    tologin: function() {
    	router.go('/login');
    	localStorage.logPrev = router.path;
    },

    toRegister: function() {
    	router.go('/register');
    	localStorage.logPrev = router.path; 
    },

    resetNavSearchSize: function() {
        var indexSearchNav = document.getElementById('index-nav-search');

        if(indexSearchNav != null) {
            var indexSearchInput = document.getElementById('index-search-input');

            var isiWidth = indexSearchInput.clientWidth + 1;
            indexSearchNav.setAttribute('style', 'width: ' + isiWidth + 'px');
        }
    },

	emailCheck: function(val) {
		var pattern = /^([\.a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/;
		if (!pattern.test(val)) {
			return false;
		}
		return true;
	},

	messageBox: function(message, danger) {

		var _this = this;

		var boxId = danger ? 'alert-danger' : 'alert-success';
		var tipsId = danger ? 'danger-tips' : 'success-tips';

		var alertSuccess = document.getElementById(boxId);
		var cls = alertSuccess.getAttribute('class');
		var cls = cls.split(' ');
		var i = cls.indexOf('displaynone');
		cls.splice(i, 1);
		cls.push('fade-enter');
		var cls = cls.join(' ');
		alertSuccess.setAttribute('class', cls);
		var tips = document.getElementById(tipsId);
		tips.innerHTML = message;

		setTimeout(function() {
			_this.hideMessageBox(boxId);
		}, 3000);

		var loginFailedList = [
			'access_token非法或用户登录已失效，请重新登录',
			'access_token已过期，请重新登录',
			'access_token非法，请重新登录',
			'用户未登录或无权限，请重新登录'
		];

		if(loginFailedList.indexOf(message) != -1) {
			_this.logout();
			router.go('/login');
			setTimeout(function() {
				window.location.reload();
			},1000);
		}
	},

	hideMessageBox: function(id) {
		var alertSuccess = document.getElementById(id);
		var cls = alertSuccess.getAttribute('class');
		var cls = cls.split(' ');
		var i = cls.indexOf('fade-enter');
		cls.splice(i, 1);
		cls.push('fade-leave');
		alertSuccess.setAttribute('class', cls.join(' '));
	},

	confirm: function(content) {
		return confirm(content);
	},

	handleError: function(err) {
		var result = '';
		console.log(err);
		if(typeof err === 'object') {
			var requestUrl = err.request.url || '';
			result += '<p>Status: ' + err.status + '</p>';
			result += '<p>Status Text: ' + err.statusText + '</p>';
			result += '<p>Data Code: ' + err.data.code + '</p>';
			result += '<p>Data Message: ' + err.data.message + '</p>';
			result += '<p>Request URL: ' + requestUrl + '</p>';
		}else {
			result = err;
		}
		this.messageBox(result, true);
	},

	session: function(key, val) {
		if(key == null) {
			return false;
		}

		localStorage[key] = val;
		return localStorage[key];
	},

	pathToSearch: function(name) {
		this.cancelActiveMenu();
        var route = {
            name: 'search-key',
            params: {
                keywords: name
            }
        };
        router.replace(route);
	},

	toPageTop: function() {
		document.documentElement.scrollTop = 0;
	},

	logout: function() {
		localStorage.login = 'false';
		localStorage.email = '';
		localStorage._id = '';
		localStorage.accessToken = '';
		localStorage.userData = '';
		localStorage.username = '';
		localStorage.photo = '';
		localStorage.introduction = '';
		localStorage.reLogin = false;
		//将http header Authorization头重新设置为匿名者
		Vue.http.headers.common['Authorization'] = 'Basic YW5vbnltb3Vz==';
		setCookie('userData', localStorage.userData, 0);
	},

	login: function(real) {
		localStorage.email = real.email;
		localStorage._id = real._id;
		localStorage.accessToken = real.accessToken;
		localStorage.userData = JSON.stringify(real);
		localStorage.username = real.username;
		localStorage.photo = real.photo;
		localStorage.reLogin = true;
		if(localStorage.photo == '') {
			localStorage.photo = 'https://pic1.zhimg.com/da8e974dc_l.jpg';
		}
		localStorage.introduction = real.intro;
		if(localStorage.introduction == '') {
			localStorage.introduction = '暂无介绍信息';
		}
		localStorage.login = 'true';
		setCookie('userData', localStorage.userData, 15);
	},

	toProfile: function(id) {
		id = localStorage._id || id;
		this.cancelActiveMenu();
		router.go('/profile/' + id);
	},

	unlikeThisTheme: function(tid, cb) {

		var _this = this;

    	services.UserService.removeFavourite(localStorage._id, tid).then(function(res) {

    		var code = res.data.code;
    		var data = res.data.message;

    		if(code != 200) {
    			_this.messageBox(data);
    			return false;
    		}

    		_this.messageBox(data);

    		if(localStorage.favouritesCount != '0') {
				localStorage.favouritesCount = parseInt(localStorage.favouritesCount) - 1;
    		}

			cb(data);

    	}, function(err) {
    		_this.handleError(err);
    	});
	},

	likeThisTheme: function(tid, cb) {

		var _this = this;

		services.UserService.addFavourite(localStorage._id, tid).then(function(res) {

			var code = res.data.code;
			var data = res.data.message;

			if(code != 200) {
				_this.messageBox(data);
				return false;
			}

			_this.messageBox(data);

			localStorage.favouritesCount = parseInt(localStorage.favouritesCount) + 1;

			cb(data);

		}, function(err) {
			_this.handleError(err);
		});
	},

	transferThis: function(id, cb) {

		var _this  = this;

		services.CGService.repost(localStorage._id, id).then(function(res) {

			var code = res.data.code;
			var data = res.data.message;

			if(code != 200) {
				_this.messageBox(data);
				return false;
			}

			_this.messageBox('转发成功');
			cb(data);

		}, function(err) {
			_this.handleError(err);
		});
	},

	removeThisCG: function(id, cb) {

		var _this = this;

		var isConfirmed = _this.confirm('您确定要删除该CG吗');

		if(isConfirmed) {

			services.CGService.remove(id).then(function(res) {

				var code = res.data.code;
				var data = res.data.message;

				if(code != 200) {
					_this.messageBox(data);
					return false;
				}

				localStorage.draftsCount = parseInt(localStorage.draftsCount) - 1;

				_this.messageBox(data);

				cb(data);

			}, function(err) {
				_this.handleError(err);
			});

		}

	},

	//图片上传预览,IE使用了滤镜
    previewImage: function(fileid, outer, inner, class_, style_) {

    	var _this = this;

    	var file = document.getElementById(fileid);
      	var MAXWIDTH  = 260; 
      	var MAXHEIGHT = 180;
      	var div = document.getElementById(outer);
      	if(file.files && file.files[0]) {
          	div.innerHTML ='<img style="' + style_ + '" id="' + inner + '" class="' + class_ + '">';
          	var img = document.getElementById(inner);
          	img.onload = function(){
	            var rect = _this.clacImgZoomParam(MAXWIDTH, MAXHEIGHT, img.offsetWidth, img.offsetHeight);
	            img.width  =  rect.width;
	            img.height =  rect.height;
	            // img.style.marginTop = rect.top + 'px';
          	}
      		var reader = new FileReader();
      		reader.onload = function(evt){img.src = evt.target.result;}
      		reader.readAsDataURL(file.files[0]);
      		return img;
      }else {
        var sFilter='filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod=scale,src="';
        file.select();
        var src = document.selection.createRange().text;
      	div.innerHTML ='<img style="' + style_ + '" id="' + inner + '" class="' + class_ + '">';
	    var img = document.getElementById(inner);
        img.filters.item('DXImageTransform.Microsoft.AlphaImageLoader').src = src;
        var rect = _this.clacImgZoomParam(MAXWIDTH, MAXHEIGHT, img.offsetWidth, img.offsetHeight);
        status =('rect:'+rect.top+','+rect.left+','+rect.width+','+rect.height);
        div.innerHTML = "<div id='divhead' style='width:"+rect.width+"px;height:"+rect.height+"px;margin-top:"+rect.top+"px;"+sFilter+src+"\"'></div>";
        return div.innerHTML;
      }
    },

	clacImgZoomParam: function(maxWidth, maxHeight, width, height){
	    var param = {top:0, left:0, width:width, height:height};
	    if( width>maxWidth || height>maxHeight )
	    {
	        rateWidth = width / maxWidth;
	        rateHeight = height / maxHeight;
	         
	        if( rateWidth > rateHeight )
	        {
	            param.width =  maxWidth;
	            param.height = Math.round(height / rateWidth);
	        }else
	        {
	            param.width = Math.round(width / rateHeight);
	            param.height = maxHeight;
	        }
	    }
	     
	    param.left = Math.round((maxWidth - param.width) / 2);
	    param.top = Math.round((maxHeight - param.height) / 2);
	    return param;
	},

	syncUploadPic: function(submitBtnId, ifrId, cb) {
		document.getElementById(submitBtnId).click();

		var _this = this;

        var getJSON = function() {
        	var picJSON = JSON.parse(localStorage.pictureUploadedJSON);

        	if(picJSON.status != 200) {
        		_this.messageBox('上传失败，请重试');
        		return false;
        	}

        	cb(picJSON);
        };

        var oFrm = document.getElementById(ifrId);

		oFrm.onload = oFrm.onreadystatechange = function() {
		     if (this.readyState && this.readyState != 'complete') {
		     	return false;
		     }
		     else {
		         getJSON();
		     }
		}
	},

	turnoffEventSource: function(backend) {
		backend = backend || false;

		var _this = this;

		services.TimelineService.turnOffES().then(function(res) {

			var code = res.data.code;
			var data = res.data.message;

			if(code != 200) {
				if(!backend) {
					_this.messageBox(data);					
				}
				return false;
			}

			if(!backend) {
				_this.messageBox(data);
			}

		}, function(err) {
			_this.handleError(err);
		});
	},

	//滚动条在Y轴上的滚动距离
	getScrollTop: function(){
	　　var scrollTop = 0, bodyScrollTop = 0, documentScrollTop = 0;
	　　if(document.body){
	　　　　bodyScrollTop = document.body.scrollTop;
	　　}
	　　if(document.documentElement){
	　　　　documentScrollTop = document.documentElement.scrollTop;
	　　}
	　　scrollTop = (bodyScrollTop - documentScrollTop > 0) ? bodyScrollTop : documentScrollTop;
	　　return scrollTop;
	},

	//文档的总高度
	getScrollHeight: function(){
	　　var scrollHeight = 0, bodyScrollHeight = 0, documentScrollHeight = 0;
	　　if(document.body){
	　　　　bodyScrollHeight = document.body.scrollHeight;
	　　}
	　　if(document.documentElement){
	　　　　documentScrollHeight = document.documentElement.scrollHeight;
	　　}
	　　scrollHeight = (bodyScrollHeight - documentScrollHeight > 0) ? bodyScrollHeight : documentScrollHeight;
	　　return scrollHeight;
	},

	//浏览器视口的高度
	getWindowHeight: function(){
	　　var windowHeight = 0;
	　　if(document.compatMode == "CSS1Compat"){
	　　　　windowHeight = document.documentElement.clientHeight;
	　　}else{
	　　　　windowHeight = document.body.clientHeight;
	　　}
	　　return windowHeight;
	},

	scrollToBottom: function() {
		return this.getScrollTop() + this.getWindowHeight() == this.getScrollHeight()
	},

	scrollToTop: function(acceleration, time) {
		acceleration = acceleration || 0.1; 
		time = time || 16; 
		 
		var x1 = 0;
		var y1 = 0;
		var x2 = 0;
		var y2 = 0;
		var x3 = 0;
		var y3 = 0; 
		 
		if (document.documentElement) { 
			x1 = document.documentElement.scrollLeft || 0; 
			y1 = document.documentElement.scrollTop || 0; 
		} 
		if (document.body) {
			x2 = document.body.scrollLeft || 0;
			y2 = document.body.scrollTop || 0;
		} 

		var x3 = window.scrollX || 0;
		var y3 = window.scrollY || 0; 
		 
		// 滚动条到页面顶部的水平距离 
		var x = Math.max(x1, Math.max(x2, x3)); 
		// 滚动条到页面顶部的垂直距离 
		var y = Math.max(y1, Math.max(y2, y3)); 
		 
		// 滚动距离 = 目前距离 / 速度, 因为距离原来越小, 速度是大于 1 的数, 所以滚动距离会越来越小 
		var speed = 1 + acceleration; 
		window.scrollTo(Math.floor(x / speed), Math.floor(y / speed)); 
		 
		// 如果距离不为零, 继续调用迭代本函数
		if(x > 0 || y > 0) { 
			var _this  = this;
			window.setTimeout(function() {
				_this.scrollToTop(acceleration, time);
			}, time); 
		} 
	}

};