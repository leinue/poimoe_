 
(function() {
    'use strict';

    angular
        .module('app.users')
        .service('UserService', UserService);

    UserService.$inject = ['$http', '$rootScope', '$resource'];

    function UserService($http, $rootScope, $resource) {

      return {

        getAll: function(page, count) {
          return $http.get($rootScope.app.baseUrl + 'user/select/all/' + page + '/' + count);
        },

        getUserDeleted: function(page, count) {
          return $http.get($rootScope.app.baseUrl + 'user/select/deleted/' + page + '/' + count);
        },

        getUserBlocked: function(page, count) {
          return $http.get($rootScope.app.baseUrl + 'user/select/blocked/' + page + '/' + count);
        },

        blockUser: function(postData) {
          return $http.post($rootScope.app.baseUrl + 'user/block', postData, {});
        },

        deleteUser: function(postData) {
          return $http.post($rootScope.app.baseUrl + 'user/delete', postData, {});
        },

        unDeleteUser: function(postData) {
          return $http.post($rootScope.app.baseUrl + 'user/undelete', postData, {});
        },

        unBlockUser: function(postData) {
          return $http.post($rootScope.app.baseUrl + 'user/unblock', postData, {});
        },

        getRelations: function(uid, page, count) {
          return $http.get($rootScope.app.baseUrl + 'relations/select/' + uid + '/' + page + '/' + count);          
        },

        getThemes: function(uid, page, count) {
          return $http.get($rootScope.app.baseUrl + 'themes/get/' + uid + '/' + page + '/' + count);          
        },

        removeUserByUid: function(uid) {
          return $http.get($rootScope.app.baseUrl + 'user/delete/' + uid);          
        },

        unRemoveUserByUid: function(uid) {
          return $http.get($rootScope.app.baseUrl + 'user/unRemove/' + uid);          
        },

        blockUserByUid: function(uid) {
          return $http.get($rootScope.app.baseUrl + 'user/block/' + uid);          
        },

        unBlockUserByUid: function(uid) {
          return $http.get($rootScope.app.baseUrl + 'user/unblock/' + uid);          
        }

      }

    }

})();
