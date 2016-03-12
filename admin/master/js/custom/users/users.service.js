 
(function() {
    'use strict';

    angular
        .module('app.users')
        .service('UserService', UserService);

    UserService.$inject = ['$http', '$rootScope'];

    function UserService($http, $rootScope) {

      return {

        getAll: function(page, count) {
          return $http.get($rootScope.app.baseUrl + 'user/select/all/' + page + '/' + count);
        },

        getUserDeleted: function(page, count) {
          return $http.get($rootScope.app.baseUrl + 'user/select/blocked/' + page + '/' + count);
        },

        getUserBlocked: function(page, count) {
          return $http.get($rootScope.app.baseUrl + 'user/select/blocked/' + page + '/' + count);
        },

        blockUser: function(uid) {
          var postData = {uids: uid};
          return $http.post($rootScope.app.baseUrl + 'user/select/blocked/', postData, {});
        },

        deleteUser: function(uid) {
          var postData = {uids: uid};
          return $http.post($rootScope.app.baseUrl + 'user/select/blocked/', postData, {});
        }

      }

    }

})();
