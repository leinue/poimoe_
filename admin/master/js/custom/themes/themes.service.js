 
(function() {
    'use strict';

    angular
        .module('app.themes')
        .service('ThemeService', ThemeService);

    ThemeService.$inject = ['$http', '$rootScope', '$resource'];

    function ThemeService($http, $rootScope, $resource) {

      return {

        getAll: function(page, count) {
          return $http.get($rootScope.app.baseUrl + 'themes/select/all/' + page + '/' + count);
        },

        getDeleted: function(page, count) {
          return $http.get($rootScope.app.baseUrl + 'themes/select/removed/' + page + '/' + count);
        },

        remove: function(id) {
          return $http.get($rootScope.app.baseUrl + 'themes/remove/' + id);
        },

        unRemove: function(id) {
          return $http.get($rootScope.app.baseUrl + 'themes/unremove/' + id, {});
        }

      }

    }

})();
