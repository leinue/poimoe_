var KakuService = require('./KakuService.js');

var model = {
	instance: undefined,
	baseUrl: 'http://localhost'
};

module.exports = {

	init: function(obj) {
		model.instance = obj;
		
		return {
			KakuService: KakuService.init(model.instance, model.baseUrl)
		}
	}

};
