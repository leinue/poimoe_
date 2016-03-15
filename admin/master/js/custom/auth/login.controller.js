
(function() {
    'use strict';

    angular
        .module('auth.login')
        .controller('LoginController', LoginController);

    LoginController.$inject = ['$log', '$mdDialog', '$mdToast', 'AuthService', '$state'];
    
    function LoginController($log, $mdDialog, $mdToast, AuthService, $state) {
	
		var vm = this;

        vm.account = {
            username: '',
            password: ''
        };

        localStorage.rememberMe = typeof localStorage.rememberMe == 'undefined' || localStorage.rememberMe == 'false' ? false : localStorage.rememberMe;

        vm.rememberMe = localStorage.rememberMe == 'true' ? true : false;

        if(localStorage.rememberMe === 'true') {
            vm.account.username = localStorage.email;
            vm.account.password = localStorage.password;
        }

		vm.loginIn = function() {

            if(vm.account.username == '') {
                var toast = $mdToast.simple()
                    .content('请填写用户名')
                    .action('确定')
                    .highlightAction(false)
                    .position('top right');
                $mdToast.show(toast).then(function() {
                    // $state.go(pathTo);
                });
                return false;
            }

            if(vm.account.password == '') {
                var toast = $mdToast.simple()
                    .content('请填写密码')
                    .action('确定')
                    .highlightAction(false)
                    .position('top right');
                $mdToast.show(toast).then(function() {
                    // $state.go(pathTo);
                });
                return false;
            }

            AuthService.login(vm.account.username, vm.account.password)
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

                var userData = res.data;

                sessionStorage.isFromLoginPage = true;

                AuthService.parseUserInfo(userData);

                if(vm.rememberMe) {
                    localStorage.rememberMe = true;
                    localStorage.email = vm.account.username;
                    localStorage.password = vm.account.password;
                }

                if(localStorage.isRoot == 'false') {
                    $state.go('auth.noAuth');
                }else {
                    $state.go('app.welcome');
                }

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
