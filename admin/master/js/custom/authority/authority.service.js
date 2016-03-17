 
(function() {
    'use strict';

    angular
        .module('app.authority')
        .service('AuthorityService', AuthorityService)
        .service('AuthorityListService', AuthorityListService);

    AuthorityService.$inject = ['$http', '$rootScope', '$resource'];
    AuthorityListService.$inject = ['$http', '$rootScope', '$resource'];

    function AuthorityService($http, $rootScope, $resource) {

      return {

          get: function() {
            return $http.get($rootScope.app.baseUrl + 'groups/select/all');
          },

          new: function(data) {
            return $http.post($rootScope.app.baseUrl + 'groups/add', data);
          },

          remove: function(id) {
            return $http.get($rootScope.app.baseUrl + 'groups/remove/' + id);
          },

          edit: function(data) {
            return $http.post($rootScope.app.baseUrl + 'groups/update', data);
          },

          applyAuthority: function(data) {
            return $http.post($rootScope.app.baseUrl + 'groups/authority/applyment', data);
          },

          applyToUser: function(data) {
            return $http.post($rootScope.app.baseUrl + 'groups/to/user', data);
          }

      }

    }

    function AuthorityListService($http, $rootScope, $resource) {

      return {

        get: function() {
            return $http.get($rootScope.app.baseUrl + 'auth/list/select/all');
        },

        new: function(data) {
            return $http.post($rootScope.app.baseUrl + 'auth/list/add', data);
        },

        remove: function(id) {
            return $http.get($rootScope.app.baseUrl + 'auth/list/remove/' + id);
        },

        edit: function(data) {
            return $http.post($rootScope.app.baseUrl + 'auth/list/update', data);
        }

      };

    }

})();
