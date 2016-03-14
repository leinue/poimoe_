 
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
        }

      }

    }

})();
