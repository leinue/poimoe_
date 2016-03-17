
(function() {
    'use strict';

    angular
        .module('app.authority')
        .controller('AuthorityController', AuthorityController);

    AuthorityController.$inject = ['$log', '$mdDialog', '$mdToast', 'AuthorityListService', '$state', 'MOptions'];
    
    function AuthorityController($log, $mdDialog, $mdToast, AuthorityListService, $state, MOptions) {

    	var vm = this;

        MOptions.init(vm, ['allAuthList']);

        vm.submitThisAuth = function() {
            AuthorityListService.new(vm.newAuth)
            .success(function(res) {

                var msg = res.code === 200 ? '添加成功' : res.message;

                var toast = $mdToast.simple()
                      .content(msg)
                      .action('我知道了')
                      .highlightAction(false)
                      .position('top right');
                $mdToast.show(toast).then(function() {
                    $state.go('app.authority');
                });

                if(res.code == 200) {
                    vm.newAuth = {};
                    vm.getGroups();
                }

            })
            .error(function(res, status) {
                var toast = $mdToast.simple()
                    .content('出错了，错误代码：' + status)
                    .action('我知道了')
                    .highlightAction(false)
                    .position('top right');
                $mdToast.show(toast).then(function() {
                });
            });
        };

        vm.getAuthList = function() {
            AuthorityListService.get()
            .success(function(res) {

                if(res.code != 200) {
                    var toast = $mdToast.simple()
                          .content(res.message)
                          .action('我知道了')
                          .highlightAction(false)
                          .position('top right');
                    $mdToast.show(toast).then(function() {
                    });
                    return false;
                }

                vm.authList = res.message;

            })
            .error(function(res, status) {
                var toast = $mdToast.simple()
                    .content('出错了，错误代码：' + status)
                    .action('我知道了')
                    .highlightAction(false)
                    .position('top right');
                $mdToast.show(toast).then(function() {
                });
            });
        };

        vm.getAuthList();

        vm.authAction = {
            name: '',
            names: [{
                val: '编辑',
                onClicked: function(ev, auth, index) {
                    $mdDialog.show({
                        controller: DialogController,
                        templateUrl: 'auth_detail.tmpl.html',
                        targetEvent: ev,
                    })
                    .then(function(answer) {
                        $scope.alert = 'You said the information was \'' + answer + '\'.';
                    }, function() {
                        $scope.alert = 'You cancelled the dialog.';
                    });

                    DialogController.$inject = ['$scope', '$mdDialog', 'ThemeService'];
                    function DialogController($scope, $mdDialog, ThemeService) {

                        $scope.auth = auth;

                        $scope.hide = function() {
                            $mdDialog.hide();
                        };

                        $scope.cancel = function() {
                            $mdDialog.cancel();
                        };

                        $scope.answer = function(answer) {
                            $mdDialog.hide(answer);
                        };

                        $scope.editThisAuth = function() {
                            AuthorityListService.edit(auth)
                            .success(function(res, status, headers, config) {
                                var toast = $mdToast.simple()
                                      .content(res.message)
                                      .action('我知道了')
                                      .highlightAction(false)
                                      .position('top right');
                                $mdToast.show(toast).then(function() {
                                });

                                if(res.code == 200) {
                                    vm.getAuthList();
                                    $mdDialog.cancel();
                                }

                            })
                            .error(function(res, status, headers, config) {
                                var toast = $mdToast.simple()
                                      .content('出错了，错误代码：' + status)
                                      .action('我知道了')
                                      .highlightAction(false)
                                      .position('top right');
                                $mdToast.show(toast).then(function() {
                                });
                            });
                        }
                    }

                }
            }, {
                val: '删除',
                onClicked: function(ev, auth, index) {
                    var confirm = $mdDialog.confirm()
                        .title('删除确认')
                        .content('你确定要删除此用户组？')
                        .ariaLabel('Lucky day')
                        .ok('确定')
                        .cancel('取消')
                        .targetEvent(ev);

                    if(index != undefined) {
                        vm.selecteThisById(auth._id, vm.allAuthList);
                    }

                    $mdDialog.show(confirm).then(function() {
                        //确定
                        var groupSelectedLength = vm.allAuthList.selectedList.length;

                        console.log(vm.allAuthList);

                        if(groupSelectedLength === 0) {
                            var toast = $mdToast.simple()
                                  .content('您尚未选择任何用户组')
                                  .action('确定')
                                  .highlightAction(false)
                                  .position('top right');
                            $mdToast.show(toast)
                            return false;
                        }

                        vm.allAuthList.selectedList.forEach(function(id, key) {
                            AuthorityListService.remove(id)
                            .success(function(res, status, headers, config) {
                                var toast = $mdToast.simple()
                                      .content(res.message)
                                      .action('我知道了')
                                      .highlightAction(false)
                                      .position('top right');
                                $mdToast.show(toast).then(function() {
                                });

                                if(key == groupSelectedLength - 1) {
                                    vm.getAuthList();
                                }                                        
                            })
                            .error(function(res, status, headers, config) {
                                var toast = $mdToast.simple()
                                      .content('出错了，错误代码：' + status)
                                      .action('我知道了')
                                      .highlightAction(false)
                                      .position('top right');
                                $mdToast.show(toast).then(function() {
                                });
                            });
                        });

                    }, function() {
                        //取消
                        if(index != undefined) {
                            vm.unSelectThisById(auth._id, vm.allAuthList);
                        }
                    });
                }
            }]
        }

        vm.footerAction = {
            name: '',
            names: [{
                val: '删除',
                onClicked: function(ev) {
                    vm.authAction.names[1].onClicked(ev);
                }
            }]
        }
    }

})();