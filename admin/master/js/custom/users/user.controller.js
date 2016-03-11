

(function() {
    'use strict';

    angular
        .module('app.users')
        .controller('UsersController', UsersController);

    UsersController.$inject = ['$log'];
    function UsersController($log) {
        // for controllerAs syntax
        var vm = this;

        activate();

        ////////////////

        function activate() {

            vm.selectCtrl = {
                name: '',
                names: [{
                    val: '锁定',
                    onClicked: function() {
                        console.log('block');
                    }
                }, {
                    val: '删除',
                    onClicked: function() {
                        console.log('delete');
                    }
                }]
            }

            vm.userSingleSelectCtrl = {
                name: '',
                names: [{
                    val: '详情',
                    onClicked: function() {

                    }
                }, {
                    val: '关系列表',
                    onClicked: function() {

                    }
                }, {
                    val: '投稿列表',
                    onClicked: function() {
                        
                    }
                }]
            }

        }
    }

})();
