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

        if(localStorage.isFromLoginPage == 'true' && localStorage.isFromLoginPage != undefined) {
          localStorage.isFromLoginPage = 'false';
          return false;
        }

        if($('.wrapper > section').length) // check if bar container exists
          thBar = $timeout(function() {
            cfpLoadingBar.start();
          }, 0); // sets a latency Threshold
      });

      $rootScope.$on('$stateChangeSuccess', function(event, next, curr) {

        event.targetScope.$watch('$viewContentLoaded', function () {
          $timeout.cancel(thBar);
          cfpLoadingBar.complete();
        });

        var alertInfo = function(content, pathTo) {
          var toast = $mdToast.simple()
            .content(content)
            .action('确定')
            .highlightAction(false)
            .position('top right');
          $mdToast.show(toast).then(function() {
            $state.go(pathTo);
          });

          $state.go(pathTo);

          if(document.domain == 'localhost') {
            // window.location.href = "http://" + document.domain + ':8080/index.html#/' + pathTo;                
          }else {
            // window.location.href = "http://" + document.domain + '/index.html#/' + pathTo;
          }
        }

        // 控制未登录只能访问登录和无权访问页面

        var publicRoutes = ['auth.login', 'auth.noAuth'];

        if(localStorage.login == undefined || localStorage.login == 'false') {

          for (var i = 0; i < publicRoutes.length; i++) {
            var route = publicRoutes[i];

            if(next.name.indexOf(route) == -1) {
              alertInfo('无权访问，请登录', 'auth.login');
              break;
            }

          };

          return false;

        }

        // 控制登录后禁止访问的页面
        var accessDeniedPageAfterLogin = ['auth.login'];

        // 其中登录页面允许在没有权限时访问
        if(localStorage.login == 'true') {
          for (var i = 0; i < accessDeniedPageAfterLogin.length; i++) {
            var route = accessDeniedPageAfterLogin[i];
            if(next.name.indexOf(route) != -1 && localStorage.isRoot == 'true') {
              alertInfo('您已登录过', 'app.welcome');
              break;
            }
          };
        }

        // 检测用户组非root之后指向noAuth页面
        // if(localStorage.isRoot == 'false') {
        //   if(next.name != 'auth.noAuth') {
        //     if(next.name != 'auth.login') {
        //       $state.go('auth.noAuth');
        //     }
        //   }
        //   return false;
        // }

      });

    }

})();