
(function() {
    'use strict';

    angular
        .module('auth.noAuth')
        .controller('NoAuthController', NoAuthController);

    NoAuthController.$inject = ['$log', '$mdDialog', '$mdToast', 'AuthService', '$state'];
    
    function NoAuthController($log, $mdDialog, $mdToast, AuthService, $state) {

    	var vm = this;

    	vm.isLogin = typeof localStorage.login == 'undefined' || localStorage.login == 'false' ? false : true;

    	vm.logout = function() {

    		AuthService.logout()
            .success(function(res) {

                if(res.code != 200) {
                    var toast = $mdToast.simple()
                          .content(res.message)
                          .action('我知道了')
                          .highlightAction(false)
                          .position('top right');
                    $mdToast.show(toast).then(function() {
                    });
                    return false;
                }

                AuthService.clearAfterLogout();
                $state.go('auth.login');
            })
            .error(function(res) {
                var toast = $mdToast.simple()
                    .content('出错了，错误代码：' + status)
                    .action('我知道了')
                    .highlightAction(false)
                    .position('top right');
                $mdToast.show(toast).then(function() {
                });
            });

    	};
    }

})();