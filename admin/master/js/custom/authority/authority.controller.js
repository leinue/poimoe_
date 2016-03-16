
(function() {
    'use strict';

    angular
        .module('app.authority')
        .controller('AuthorityController', AuthorityController);

    AuthorityController.$inject = ['$log', '$mdDialog', '$mdToast', 'AuthService', '$state'];
    
    function AuthorityController($log, $mdDialog, $mdToast, AuthService, $state) {

    	var vm = this;

    }

})();