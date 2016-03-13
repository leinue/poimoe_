 
(function() {
    'use strict';

    angular
        .module('app.dashboard')
        .service('DashBoardService', DashBoardService);

    DashBoardService.$inject = ['$http', '$rootScope'];

    function DashBoardService($http, $rootScope) {

      return {

        dashboardInfo: function() {
          return $http.get($rootScope.app.baseUrl + 'dashboard/info');
        },

        usersCount: function() {
          return $http.get($rootScope.app.baseUrl + 'user/select/all/');
        },

        tagsCount: function() {
          return $http.get($rootScope.app.baseUrl + 'user/select/blocked/');
        },

        themesCount: function() {
          return $http.get($rootScope.app.baseUrl + 'user/select/blocked/');
        },

        userAddedToday: function() {
          return $http.get($rootScope.app.baseUrl + 'user/select/blocked/');          
        },

        usersBlockedCount: function() {
          return $http.get($rootScope.app.baseUrl + 'user/select/blocked/');          
        },

        usersBlockedCount: function() {
          return $http.get($rootScope.app.baseUrl + 'user/select/blocked/');          
        },

        usersDeletedCount: function() {
          return $http.get($rootScope.app.baseUrl + 'user/select/blocked/');          
        },

        themesAddedToday: function() {
          return $http.get($rootScope.app.baseUrl + 'user/select/blocked/');          
        },

        themesDeletedCount: function() {
          return $http.get($rootScope.app.baseUrl + 'user/select/deleted/');          
        },

        tagsAddedToday: function() {
          return $http.get($rootScope.app.baseUrl + 'user/select/blocked/');          
        },

        tagsDeletedCount: function() {
          return $http.get($rootScope.app.baseUrl + 'user/select/blocked/');          
        },

        getHotTags: function() {
          return $http.get($rootScope.app.baseUrl + 'tags/select/hotTags');          
        },

        getRecommended: function() {
          return $http.get($rootScope.app.baseUrl + 'user/recommended');          
        },

        getHotThemes: function() {
          return $http.get($rootScope.app.baseUrl + 'themes/hot');          
        }

      }

    }

})();
