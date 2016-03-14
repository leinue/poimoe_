
(function() {
    'use strict';

    angular
        .module('auth.login')
        .controller('LoginController', LoginController);

    LoginController.$inject = ['$log', '$mdDialog', '$mdToast', 'AuthService', '$state'];
    
    function LoginController($log, $mdDialog, $mdToast, AuthService, $state) {
	
		var vm = this;

		vm.loginIn = function() {

			sessionStorage.isFromLoginPage = true;

			$state.go('app.welcome');
		}; 

    }

})();
