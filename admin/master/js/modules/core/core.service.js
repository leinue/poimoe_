 
(function() {
    'use strict';

    angular
        .module('app.core')
        .service('MOptions', MOptions);

    MOptions.$inject = ['$http', '$rootScope'];

    function MOptions($http, $rootScope) {

      return {

        init: function(vm, eles) {

          var init = function() {

              return {
                  isSelectAll: false,
                  isElementSelected: {},
                  selectedList: []
              };

          };

          for (var i = 0; i < eles.length; i++) {
              var ele = eles[i];
              vm[ele] = init();
          };

          vm.toggleSelectAll = function(list, MO) {

              console.log(MO, MO.isSelectAll);

              if(!MO.isSelectAll) {
                  //取消全选
                  for (var i = 0; i < list.length; i++) {
                      var ele = list[i];
                      MO.isElementSelected[ele._id] = false;
                      MO.isSelectAll = false;
                  };
                  MO.selectedList = [];
              }else {
                  //选择全部
                  MO.selectedList = [];
                  for (var i = 0; i < list.length; i++) {
                      var ele = list[i];
                      MO.isElementSelected[ele._id] = true;
                      MO.selectedList.push(ele._id);
                      MO.isSelectAll = true;
                  };
              }
          };

          vm.selectThis = function(id, MO) {
              if(MO.isElementSelected[id] == undefined) {
                  MO.isElementSelected[id] = false;
              }

              if(MO.isElementSelected[id]) {
                  MO.isElementSelected[id] = true;
                  MO.selectedList.push(id);
              }else {
                  MO.isElementSelected[id] = false;
                  MO.selectedList.splice(MO.selectedList.indexOf(id), 1);
              }

          };

          vm.selecteThisById = function(id, MO) {
            MO.isElementSelected[id] = true;
            MO.selectedList.push(id);
          }

        }

      }

    }

})();
