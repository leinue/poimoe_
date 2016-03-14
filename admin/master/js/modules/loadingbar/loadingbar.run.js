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
              window.location.href = "http://" + document.domain + ':8888/index.html#/auth/login';
              $state.go('auth.login');
              break;
            }

          };

          return false;

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