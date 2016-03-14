

(function() {
    'use strict';

    angular
        .module('app.users')
        .controller('UsersController', UsersController);

    UsersController.$inject = ['$log', '$mdDialog', '$scope', '$resource', 'DTOptionsBuilder', 'DTColumnDefBuilder', '$http', 'UserService', '$mdToast', 'MOptions'];
    function UsersController($log, $mdDialog, $scope, $resource, DTOptionsBuilder, DTColumnDefBuilder, $http, UserService, $mdToast, MOptions) {
        // for controllerAs syntax
        var vm = this;

        activate();

        activateDataTable();

        MOptions.init(vm, ['normalUsers', 'removedUser', 'blockedUser']);

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

            vm.getAll = function() {

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

            vm.getAllDeleted = function() {

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

            }

            vm.getAllBlocked = function() {

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

            }

            vm.getAll();
            vm.getAllDeleted();
            vm.getAllBlocked();
        }

        function activate() {

            vm.selectCtrl = {
                name: '',
                names: [{
                    val: '锁定',
                    onClicked: function(ev, ur, index) {
                        var confirm = $mdDialog.confirm()
                            .title('锁定确认')
                            .content('你确定要锁定此用户？')
                            .ariaLabel('Lucky day')
                            .ok('确定')
                            .cancel('取消')
                            .targetEvent(ev);

                        if(index != undefined) {
                            vm.selecteThisById(ur._id, vm.normalUsers);
                        }

                        $mdDialog.show(confirm).then(function() {
                            //确定
                            var normalUsersLength = vm.normalUsers.selectedList.length;

                            if(normalUsersLength === 0) {
                                var toast = $mdToast.simple()
                                      .content('您尚未选择任何用户')
                                      .action('确定')
                                      .highlightAction(false)
                                      .position('top right');
                                $mdToast.show(toast)
                                return false;
                            }

                            vm.normalUsers.selectedList.forEach(function(id, key) {
                                UserService.blockUserByUid(id)
                                .success(function(res, status, headers, config) {
                                    var toast = $mdToast.simple()
                                          .content(res.message)
                                          .action('我知道了')
                                          .highlightAction(false)
                                          .position('top right');
                                    $mdToast.show(toast).then(function() {
                                    });

                                    if(key == normalUsersLength -1) {
                                        vm.getAllBlocked();
                                        vm.getAll();
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
                                vm.unSelectThisById(ur._id, vm.normalUsers);
                            }
                        });
                    }
                }, {
                    val: '删除',
                    onClicked: function(ev, ur, index) {
                        var confirm = $mdDialog.confirm()
                            .title('删除确认')
                            .content('你确定要删除此用户？')
                            .ariaLabel('Lucky day')
                            .ok('确定')
                            .cancel('取消')
                            .targetEvent(ev);

                        if(index != undefined) {
                            vm.selecteThisById(ur._id, vm.normalUsers);
                        }

                        $mdDialog.show(confirm).then(function() {
                            //确定
                            var normalUsersLength = vm.normalUsers.selectedList.length;

                            if(normalUsersLength === 0) {
                                var toast = $mdToast.simple()
                                      .content('您尚未选择任何用户')
                                      .action('确定')
                                      .highlightAction(false)
                                      .position('top right');
                                $mdToast.show(toast)
                                return false;
                            }

                            vm.normalUsers.selectedList.forEach(function(id, key) {
                                UserService.removeUserByUid(id)
                                .success(function(res, status, headers, config) {
                                    var toast = $mdToast.simple()
                                          .content(res.message)
                                          .action('我知道了')
                                          .highlightAction(false)
                                          .position('top right');
                                    $mdToast.show(toast).then(function() {
                                    });

                                    if(key == normalUsersLength -1) {
                                        vm.getAllDeleted();
                                        vm.getAll();
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
                                vm.unSelectThisById(ur._id, vm.normalUsers);
                            }
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

                            $scope.followList = [];
                            $scope.folloerList = [];

                            $scope.user = ur;

                            ThemeService.remove(ur._id).success(function(res, status, headers, config) {

                                if(res.code != 200) {
                                    var toast = $mdToast.simple()
                                          .content(res.message)
                                          .action('我知道了')
                                          .highlightAction(false)
                                          .position('top right');
                                    $mdToast.show(toast).then(function() {
                                    });
                                }

                                console.log(res.message);

                                if(res.message.length > 0) {
                                    $scope.followList = res.message[0].follow;
                                    $scope.followerList = res.message[0].follower;
                                }

                            }).error(function(res, status, headers, config) {
                                var toast = $mdToast.simple()
                                      .content('出错了，错误代码：' + status)
                                      .action('我知道了')
                                      .highlightAction(false)
                                      .position('top right');
                                $mdToast.show(toast).then(function() {
                                });
                            });

                            $scope.hide = function() {
                                $mdDialog.hide();
                                $scope.followList = [];
                                $scope.folloerList = [];
                            };

                            $scope.cancel = function() {
                                $mdDialog.cancel();
                                $scope.followList = [];
                                $scope.folloerList = [];
                            };

                            $scope.answer = function(answer) {
                                $mdDialog.hide(answer);
                                $scope.followList = [];
                                $scope.folloerList = [];
                            };
                        }                    
                    }
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

                        DialogController.$inject = ['$scope', '$mdDialog', 'ThemeService'];
                        function DialogController($scope, $mdDialog, ThemeService) {

                            $scope.user = ur;
                            $scope.themesList = [];

                            $scope.viewThisTheme = function(id) {
                                window.open("http://poi.poimoe.com/#!/view/" + id);
                            }

                            $scope.deleteThisTheme = function(id, index) {
                                ThemeService.remove(id)
                                .success(function(res, status, headers, config) {
                                    var toast = $mdToast.simple()
                                          .content(res.message)
                                          .action('我知道了')
                                          .highlightAction(false)
                                          .position('top right');
                                    $mdToast.show(toast).then(function() {
                                    });

                                    if(res.status === 200) {
                                        $scope.themesList.splice(index, 1);
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

                            UserService.getThemes(ur._id, 1, 10).success(function(res, status, headers, config) {

                                if(res.code != 200) {
                                    var toast = $mdToast.simple()
                                          .content(res.message)
                                          .action('我知道了')
                                          .highlightAction(false)
                                          .position('top right');
                                    $mdToast.show(toast).then(function() {
                                    });
                                }

                                $scope.themesList = res.message;

                            }).error(function(res, status, headers, config) {
                                var toast = $mdToast.simple()
                                      .content('出错了，错误代码：' + status)
                                      .action('我知道了')
                                      .highlightAction(false)
                                      .position('top right');
                                $mdToast.show(toast).then(function() {
                                });
                            });

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
                    onClicked: function(ev, ur, index) {

                        var confirm = $mdDialog.confirm()
                            .title('锁定确认')
                            .content('你确定要恢复此用户？')
                            .ariaLabel('Lucky day')
                            .ok('确定')
                            .cancel('取消')
                            .targetEvent(ev);

                        if(index != undefined) {
                            vm.selecteThisById(ur._id, vm.removedUser);
                        }

                        var length = vm.removedUser.selectedList.length;

                        if(length === 0) {
                            var toast = $mdToast.simple()
                                  .content('您尚未选择任何用户')
                                  .action('确定')
                                  .highlightAction(false)
                                  .position('top right');
                            $mdToast.show(toast)
                            return false;
                        }

                        $mdDialog.show(confirm).then(function() {

                            vm.removedUser.selectedList.forEach(function(id, key) {

                                UserService.unRemoveUserByUid(id)
                                .success(function(res, status, headers, config) {
                                    var toast = $mdToast.simple()
                                          .content(res.message)
                                          .action('我知道了')
                                          .highlightAction(false)
                                          .position('top right');
                                    $mdToast.show(toast).then(function() {
                                    });

                                    if(key == length - 1) {
                                        vm.getAllDeleted();
                                        vm.getAll();
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

                        });
                    }
                }]
            }

            vm.userBlockedSelectCtrl = {
                name: '',
                names: [{
                    val: '解锁',
                    onClicked: function(ev, ur, index) {

                        var confirm = $mdDialog.confirm()
                            .title('锁定确认')
                            .content('你确定要恢复此用户？')
                            .ariaLabel('Lucky day')
                            .ok('确定')
                            .cancel('取消')
                            .targetEvent(ev);

                        if(index != undefined) {
                            vm.selecteThisById(ur._id, vm.removedUser);
                        }

                        var length = vm.removedUser.selectedList.length;

                        if(length === 0) {
                            var toast = $mdToast.simple()
                                  .content('您尚未选择任何用户')
                                  .action('确定')
                                  .highlightAction(false)
                                  .position('top right');
                            $mdToast.show(toast)
                            return false;
                        }

                        $mdDialog.show(confirm).then(function() {

                            vm.removedUser.selectedList.forEach(function(id, key) {

                                UserService.unBlockUserByUid(id)
                                .success(function(res, status, headers, config) {
                                    var toast = $mdToast.simple()
                                          .content(res.message)
                                          .action('我知道了')
                                          .highlightAction(false)
                                          .position('top right');
                                    $mdToast.show(toast).then(function() {
                                    });

                                    if(key == length - 1) {
                                        vm.getAllDeleted();
                                        vm.getAll();
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

                        });

                    }
                }]
            }

        }
    }

})();
