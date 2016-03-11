

(function() {
    'use strict';

    angular
        .module('app.users')
        .controller('UsersController', UsersController);

    UsersController.$inject = ['$log', '$mdDialog', '$scope'];
    function UsersController($log, $mdDialog, $scope) {
        // for controllerAs syntax
        var vm = this;

        activate();

        ////////////////

        function activate() {

            vm.selectCtrl = {
                name: '',
                names: [{
                    val: '锁定',
                    onClicked: function(ev) {
                        var confirm = $mdDialog.confirm()
                            .title('锁定确认')
                            .content('你确定要锁定此用户？')
                            .ariaLabel('Lucky day')
                            .ok('确定')
                            .cancel('取消')
                            .targetEvent(ev);

                        $mdDialog.show(confirm).then(function() {
                            //确定

                        }, function() {
                            //取消
                            
                        });
                    }
                }, {
                    val: '删除',
                    onClicked: function(ev) {
                        var confirm = $mdDialog.confirm()
                            .title('删除确认')
                            .content('你确定要删除此用户？')
                            .ariaLabel('Lucky day')
                            .ok('确定')
                            .cancel('取消')
                            .targetEvent(ev);

                        $mdDialog.show(confirm).then(function() {
                            //确定

                        }, function() {
                            //取消

                        });
                    }
                }]
            }

            vm.userSingleSelectCtrl = {
                name: '',
                names: [{
                    val: '详情',
                    onClicked: function(ev) {
                        $mdDialog.show({
                            controller: DialogController,
                            templateUrl: 'user_detail.tmpl.html',
                            targetEvent: ev,
                        })
                        .then(function(answer) {
                            $scope.alert = 'You said the information was \'' + answer + '\'.';
                        }, function() {
                            $scope.alert = 'You cancelled the dialog.';
                        });

                        DialogController.$inject = ['$scope', '$mdDialog'];
                        function DialogController($scope, $mdDialog) {
                            $scope.hide = function() {
                                $mdDialog.hide();
                            };

                            $scope.cancel = function() {
                                $mdDialog.cancel();
                            };

                            $scope.answer = function(answer) {
                                $mdDialog.hide(answer);
                            };
                        }
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
