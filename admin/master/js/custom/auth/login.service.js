 
(function() {
    'use strict';

    angular
        .module('auth.login')
        .service('AuthService', AuthService);

    AuthService.$inject = ['$http', '$rootScope', '$resource'];

    function AuthService($http, $rootScope, $resource) {

      return {

        login: function(email, password) {
          return $http.get($rootScope.app.baseUrl + 'user/login/' + email + '/' + password);
        },

        clearAfterLogout: function() {
          localStorage._id = undefined;
          if(localStorage.rememberMe != 'true') {
            localStorage.email = undefined;
            localStorage.password = undefined;
          }
          localStorage.accessToken = undefined;
          localStorage.photo = undefined;
          localStorage.group = undefined;
          localStorage.login = false;
          localStorage.auth = false;
          localStorage.isRoot = false;
          localStorage.userData = undefined;
          localStorage.username = undefined;
        },

        logout: function() {
          return $http.get($rootScope.app.baseUrl + 'user/logout');
        },

        parseUserInfo: function(userData) {

          var isValid = false;

          if(typeof userData == 'string') {
            if(userData != '') {
              localStorage.userData = userData;
              userData = JSON.parse(userData);              
              isValid = true;
            }
          }else {
            localStorage.userData = JSON.stringify(userData);
            isValid = true;
          }

          if(!isValid) {
            return false;
          }

          localStorage._id = userData._id;
          localStorage.username = userData.username;
          localStorage.password = userData.password;
          localStorage.accessToken = userData.accessToken;
          localStorage.photo = userData.photo;
          localStorage.group = JSON.stringify(userData.group);
          localStorage.login = true;

          var group = localStorage.group;
           
          if(group == 'undefined' || group == undefined) {
            localStorage.auth = false;
            localStorage.isRoot = false;
          }else {
            group = JSON.parse(group);

            var isRoot = false;

            for (var i = 0; i < group.length; i++) {
              var g = group[i];
              if(g.name === 'root' && g.code === '100') {
                isRoot = true;
                break;
              }
            };

            if(isRoot) {
              localStorage.auth = true;
              localStorage.isRoot = true;
            }

          }

        }

      }

    }

})();
