(function() {
    'use strict';

    angular
        .module('app.loadingbar')
        .run(loadingbarRun)
        ;
    loadingbarRun.$inject = ['$rootScope', '$timeout', 'cfpLoadingBar', '$mdDialog', '$mdToast', '$state'];
    function loadingbarRun($rootScope, $timeout, cfpLoadingBar, $mdDialog, $mdToast, $state){

      // Loading bar transition
      // ----------------------------------- 
      var thBar;
      $rootScope.$on('$stateChangeStart', function(evt, next, curr) {

        var publicRoutes = ['auth.login'];

        if(localStorage.isFromLoginPage == 'true' && localStorage.isFromLoginPage != undefined) {
          localStorage.isFromLoginPage = 'false';
          return false;
        }

        //控制未登录只能访问登录页面
        if(localStorage.login == undefined || localStorage.login == 'false') {

          for (var i = 0; i < publicRoutes.length; i++) {
            var route = publicRoutes[i];

            if(next.name.indexOf(route) == -1) {
              var toast = $mdToast.simple()
                .content('无权限访问, 请登录')
                .action('确定')
                .highlightAction(false)
                .position('top right');
              $mdToast.show(toast).then(function() {
                $state.go('auth.login');
              });
              if(document.domain == 'localhost') {
                window.location.href = "http://" + document.domain + ':8080/index.html#/auth/login';                
              }else {
                window.location.href = "http://" + document.domain + '/index.html#/auth/login';
              }
              $state.go('auth.login');
              break;
            }

          };

          return false;

        }

        var accessDeniedPageAfterLogin = ['auth.login'];

        // 控制登录后禁止访问登录等页面
        if(localStorage.login == 'true') {

          for (var i = 0; i < accessDeniedPageAfterLogin.length; i++) {
            var route = accessDeniedPageAfterLogin[i];
            if(next.name.indexOf(route) != -1) {
              var toast = $mdToast.simple()
                .content('您已登录过')
                .action('确定')
                .highlightAction(false)
                .position('top right');
              $mdToast.show(toast).then(function() {
                $state.go('app.welcome');
              });
              if(document.domain == 'localhost') {
                window.location.href = "http://" + document.domain + ':8080/index.html#/app/welcome';                
              }else {
                window.location.href = "http://" + document.domain + '/index.html#/app/welcome';
              }
            }
          };
          
        }

        if($('.wrapper > section').length) // check if bar container exists
          thBar = $timeout(function() {
            cfpLoadingBar.start();
          }, 0); // sets a latency Threshold
      });

      $rootScope.$on('$stateChangeSuccess', function(event) {
          event.targetScope.$watch('$viewContentLoaded', function () {
            $timeout.cancel(thBar);
            cfpLoadingBar.complete();
          });
      });

    }

})();