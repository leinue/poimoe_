

(function() {
    'use strict';

    angular
        .module('app.users')
        .controller('UsersController', UsersController);

    UsersController.$inject = ['$log', '$mdDialog', '$scope', '$resource', 'DTOptionsBuilder', 'DTColumnDefBuilder', '$http', 'UserService', '$mdToast'];
    function UsersController($log, $mdDialog, $scope, $resource, DTOptionsBuilder, DTColumnDefBuilder, $http, UserService, $mdToast) {
        // for controllerAs syntax
        var vm = this;

        activate();

        activateDataTable();

        ////////////////

        function activateDataTable() {
            vm.dtOptions = DTOptionsBuilder.newOptions().withPaginationType('full_numbers');
            vm.dtColumnDefs = [
                DTColumnDefBuilder.newColumnDef(0),
                DTColumnDefBuilder.newColumnDef(1),
                DTColumnDefBuilder.newColumnDef(2),
                DTColumnDefBuilder.newColumnDef(3).notSortable()
            ];

            vm.usersList = [];
            vm.usersDeletedList = [];
            vm.usersBlockedList = [];

            vm.uids = {
              uids: []
            };

            vm.isSelectAll = false;

            vm.userIsSelected = {};

            UserService.getAll(1, 10)
            .success(function(res, status, headers, config) {
                if(res.code != 200) {
                    var toast = $mdToast.simple()
                          .content(res.message)
                          .action('我知道了')
                          .highlightAction(false)
                          .position('top right');
                    $mdToast.show(toast).then(function() {
                    });
                }
                vm.usersList = res.message;
                for (var i = vm.usersList.length - 1; i >= 0; i--) {
                    var currentUser = vm.usersList[i];
                    var uid = currentUser._id;
                    vm.userIsSelected[uid] = false;
                };
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

            UserService.getUserDeleted(1, 10)
            .success(function(res, status, headers, config) {
                if(res.code != 200) {
                    var toast = $mdToast.simple()
                          .content(res.message)
                          .action('我知道了')
                          .highlightAction(false)
                          .position('top right');
                    $mdToast.show(toast).then(function() {
                    });
                }
                vm.usersDeletedList = res.message;
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

            UserService.getUserBlocked(1, 10)
            .success(function(res, status, headers, config) {
                if(res.code != 200) {
                    var toast = $mdToast.simple()
                          .content(res.message)
                          .action('我知道了')
                          .highlightAction(false)
                          .position('top right');
                    $mdToast.show(toast).then(function() {
                    });
                }
                vm.usersBlockedList = res.message;
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

            vm.selectThisUser = function(uid) {
                if(!vm.userIsSelected[uid]) {
                    var key = vm.uids.uids.indexOf(uid);
                    vm.uids.uids.splice(key, 1);
                }else {
                    vm.uids.uids.push(uid);                 
                }
            }

            vm.toggleSelectAll = function() {

                if(vm.isSelectAll) {
                    vm.uids.uids = [];
                    for(var uid in vm.userIsSelected) {
                        vm.userIsSelected[uid] = true;
                        vm.uids.uids.push(uid);
                    }
                    vm.isSelectAll = true;
                }else {
                    vm.uids.uids = [];
                    for(var uid in vm.userIsSelected) {
                        vm.userIsSelected[uid] = false;
                    }
                    vm.isSelectAll = false;
                }

            }

        }

        function activate() {

            vm.selectCtrl = {
                name: '',
                names: [{
                    val: '锁定',
                    onClicked: function(ev, ur) {
                        var confirm = $mdDialog.confirm()
                            .title('锁定确认')
                            .content('你确定要锁定此用户？')
                            .ariaLabel('Lucky day')
                            .ok('确定')
                            .cancel('取消')
                            .targetEvent(ev);

                        if(ur != undefined) {
                            vm.uids.uids = [ur._id];
                        }

                        $mdDialog.show(confirm).then(function() {
                            //确定
                            UserService.blockUser(vm.uids).save()
                            .success(function(res, status, headers, config) {
                                var toast = $mdToast.simple()
                                      .content(res.message)
                                      .action('我知道了')
                                      .highlightAction(false)
                                      .position('top right');
                                $mdToast.show(toast).then(function() {
                                });
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

                            vm.uids.uids = [];

                        }, function() {
                            //取消
                            
                        });
                    }
                }, {
                    val: '删除',
                    onClicked: function(ev, ur) {
                        var confirm = $mdDialog.confirm()
                            .title('删除确认')
                            .content('你确定要删除此用户？')
                            .ariaLabel('Lucky day')
                            .ok('确定')
                            .cancel('取消')
                            .targetEvent(ev);

                        if(ur != undefined) {
                            vm.uids.uids = [ur._id];
                        }

                        $mdDialog.show(confirm).then(function() {
                            //确定
                            console.log(vm.uids);
                            UserService.deleteUser(vm.uids).save()
                            .success(function(res, status, headers, config) {
                                var toast = $mdToast.simple()
                                      .content(res.message)
                                      .action('我知道了')
                                      .highlightAction(false)
                                      .position('top right');
                                $mdToast.show(toast).then(function() {
                                });
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

                            vm.uids.uids = [];

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
                    onClicked: function(ev, ur) {
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

                            $scope.user = ur;

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
                    onClicked: function(ev, ur) {
                        $mdDialog.show({
                            controller: DialogController,
                            templateUrl: 'user_relations.tmpl.html',
                            targetEvent: ev,
                        })
                        .then(function(answer) {
                            $scope.alert = 'You said the information was \'' + answer + '\'.';
                        }, function() {
                            $scope.alert = 'You cancelled the dialog.';
                        });

                        DialogController.$inject = ['$scope', '$mdDialog'];
                        function DialogController($scope, $mdDialog) {

                            $scope.user = ur;

                            $scope.hide = function() {
                                $mdDialog.hide();
                            };

                            $scope.cancel = function() {
                                $mdDialog.cancel();
                            };

                            $scope.answer = function(answer) {
                                $mdDialog.hide(answer);
                            };
                        }                    }
                }, {
                    val: '投稿列表',
                    onClicked: function(ev, ur) {
                        $mdDialog.show({
                            controller: DialogController,
                            templateUrl: 'user_themes.tmpl.html',
                            targetEvent: ev,
                        })
                        .then(function(answer) {
                            $scope.alert = 'You said the information was \'' + answer + '\'.';
                        }, function() {
                            $scope.alert = 'You cancelled the dialog.';
                        });

                        DialogController.$inject = ['$scope', '$mdDialog'];
                        function DialogController($scope, $mdDialog) {

                            $scope.user = ur;

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
                }]                
            }

            vm.userDeletedSelectCtrl = {
                name: '',
                names: [{
                    val: '恢复',
                    onClicked: function(ev, ur) {
                        UserService.unDeleteUser(vm.uids).save()
                        .success(function(res, status, headers, config) {
                            var toast = $mdToast.simple()
                                  .content(res.message)
                                  .action('我知道了')
                                  .highlightAction(false)
                                  .position('top right');
                            $mdToast.show(toast).then(function() {
                            });
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
                }]
            }

            vm.userBlockedSelectCtrl = {
                name: '',
                names: [{
                    val: '解锁',
                    onClicked: function(ev, ur) {
                        UserService.unBlockUser(vm.uids).save()
                        .success(function(res, status, headers, config) {
                            var toast = $mdToast.simple()
                                  .content(res.message)
                                  .action('我知道了')
                                  .highlightAction(false)
                                  .position('top right');
                            $mdToast.show(toast).then(function() {
                            });
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
                }]
            }

        }
    }

})();
