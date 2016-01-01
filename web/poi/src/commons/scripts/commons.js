var vue = require('vue');

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
		var lis = ul.item(1).getElementsByTagName('li');

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
	}


};