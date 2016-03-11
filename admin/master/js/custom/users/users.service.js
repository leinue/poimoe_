 
(function() {
    'use strict';

    angular
        .module('app.users')
        .service('UserService', UserService);

    UserService.$inject = ['$http', '$rootScope'];

    function UserService($http, $rootScope) {

      return {

        getAll: function(page, count) {
          return $http($rootScope.baseUrl + 'user/select/all/' + page + '/' + count);
        },

        getUserDeleted: function(page, count) {
          return $http($rootScope.baseUrl + '');
        },

        getUserBlocked: function(page, couny) {
          return $http($rootScope.baseUrl + '');
        }

      }

    }

})();
