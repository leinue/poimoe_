(function() {
    'use strict';

    angular
        .module('app.settings')
        .run(settingsRun);

    settingsRun.$inject = ['$rootScope', '$localStorage'];

    function settingsRun($rootScope, $localStorage){

      // Global Settings
      // ----------------------------------- 
      $rootScope.app = {
        name: 'Poimoe',
        description: '管理后台',
        year: ((new Date()).getFullYear()),
        layout: {
          isFixed: true,
          isCollapsed: false,
          isBoxed: false,
          isRTL: false,
          horizontal: false,
          isFloat: false,
          asideHover: false,
          theme: null
        },
        useFullLayout: false,
        hiddenFooter: false,
        offsidebarOpen: false,
        asideToggled: false,
        viewAnimation: 'ng-fadeInUp',
        baseUrl: 'http://api.poimoe.com/'
      };

      if(document.domain != 'localhost') {
        document.domain = 'poimoe.com';
      }

      var getCookie = function(c_name) {
        if (document.cookie.length > 0){  
          c_start = document.cookie.indexOf(c_name + "=");
          if (c_start != -1){
            c_start = c_start + c_name.length+1;  
            c_end = document.cookie.indexOf(";",c_start);  
            if (c_end == -1){
              c_end = document.cookie.length;  
              return unescape(document.cookie.substring(c_start,c_end));            
            }
          }   
        }  
        return "";  
      }

      var userData = getCookie('userData');

      if(userData != '') {
          localStorage.userData = userData;
          userData = JSON.parse(userData);
          localStorage._id = userData._id;
          localStorage.username = userData.username;
          localStorage.accessToken = userData.accessToken;
          localStorage.photo = userData.photo;
          localStorage.login = true;
      }

      // Setup the layout mode
      $rootScope.app.layout.horizontal = ( $rootScope.$stateParams.layout === 'app-h') ;

      // Restore layout settings [*** UNCOMMENT TO ENABLE ***]
      // if( angular.isDefined($localStorage.layout) )
      //   $rootScope.app.layout = $localStorage.layout;
      // else
      //   $localStorage.layout = $rootScope.app.layout;
      //
      // $rootScope.$watch('app.layout', function () {
      //   $localStorage.layout = $rootScope.app.layout;
      // }, true);

      // Close submenu when sidebar change from collapsed to normal
      $rootScope.$watch('app.layout.isCollapsed', function(newValue) {
        if( newValue === false )
          $rootScope.$broadcast('closeSidebarMenu');
      });

    }

})();
