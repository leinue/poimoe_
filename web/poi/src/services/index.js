var UserService = require('./UserService.js');

var model = {
	instance: undefined,
	baseUrl: 'http://api.poimoe.com/'
};

module.exports = {

	init: function(obj) {
		model.instance = obj;
		
		return {
			UserService: UserService.init(model.instance, model.baseUrl)
		}
	}

};
