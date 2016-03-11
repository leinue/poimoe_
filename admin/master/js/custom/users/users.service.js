 
(function() {
    'use strict';

    angular
        .module('app.users')
        .service('UserService', UserService);

    UserService.$inject = ['$http'];
    function UserService($http) {

      return {
        getAll: function(page, count) {
          return $http('http://api.poimoe.com/user/select/all/1/10');
        }
      }

    }

})();
