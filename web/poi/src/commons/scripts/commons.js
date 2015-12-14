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
    }

};