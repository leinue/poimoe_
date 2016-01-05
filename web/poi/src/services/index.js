var UserService = require('./UserService.js');
var CGService = require('./CGService.js');
var TagsService = require('./TagsService');

var model = {
	instance: undefined,
	baseUrl: 'http://api.poimoe.com/'
};

module.exports = {

	init: function(obj) {
		model.instance = obj;
		
		return {
			UserService: UserService.init(model.instance, model.baseUrl),

			CGService: CGService.init(model.instance, model.baseUrl),

			TagsService: TagsService.init(model.instance, model.baseUrl)
		}
	}

};
