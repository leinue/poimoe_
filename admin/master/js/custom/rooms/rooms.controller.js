

(function() {
    'use strict';

    angular
        .module('app.rooms')
        .controller('RoomsController', RoomsController);

    RoomsController.$inject = ['$log', '$mdDialog', '$mdToast', 'RoomService', 'DTOptionsBuilder', 'DTColumnDefBuilder'];
    function RoomsController($log, $mdDialog, $mdToast, RoomService, DTOptionsBuilder, DTColumnDefBuilder) {
        // for controllerAs syntax
        var vm = this;

        vm.roomsList = [];
        vm.roomsDeletedList = [];

        activate();
        activateTable();

        function activateTable() {

            vm.isSelectAll = false;
            vm.isDeletedSelectAll = false;

            vm.roomsSelectedList =[]; 
            vm.roomsSelected = {};

            vm.roomsDeletedSelectedList = [];
            vm.roomsDeletedSelected = {};

            vm.dtOptions = DTOptionsBuilder.newOptions().withPaginationType('full_numbers');
            vm.dtColumnDefs = [
                DTColumnDefBuilder.newColumnDef(0),
                DTColumnDefBuilder.newColumnDef(1),
                DTColumnDefBuilder.newColumnDef(2),
                DTColumnDefBuilder.newColumnDef(3).notSortable()
            ];

            vm.getAll = function() {
                RoomService.getAll(1, 1000)
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
                    vm.roomsList = res.message;
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
                RoomService.getDeleted(1, 1000)
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
                    vm.roomsDeletedList = res.message;
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

            vm.toggleSelectAll = function() {

                if(!vm.isSelectAll) {
                    //取消全选
                    for (var i = 0; i < vm.roomsList.length; i++) {
                        var tag = vm.roomsList[i];
                        vm.roomsSelected[tag._id] = false;
                        vm.isSelectAll = false;
                    };
                    vm.roomsSelectedList = [];
                }else {
                    //选择全部
                    vm.roomsSelectedList = [];
                    for (var i = 0; i < vm.roomsList.length; i++) {
                        var tag = vm.roomsList[i];
                        vm.roomsSelected[tag._id] = true;
                        vm.roomsSelectedList.push(tag._id);
                        vm.isSelectAll = true;
                    };
                }

            };

            vm.selectThisRoom = function(id) {

                if(vm.roomsSelected[id] == undefined) {
                    vm.roomsSelected[id] = false;
                }

                if(vm.roomsSelected[id]) {
                    vm.roomsSelected[id] = true;
                    vm.roomsSelectedList.push(id);
                }else {
                    vm.roomsSelected[id] = false;
                    vm.roomsSelectedList.splice(vm.roomsSelectedList.indexOf(id), 1);
                }
            }

            vm.toggleSelectAllDeleted = function() {

                if(!vm.isDeletedSelectAll) {
                    //取消全选
                    for (var i = 0; i < vm.roomsDeletedList.length; i++) {
                        var tag = vm.roomsDeletedList[i];
                        vm.roomsDeletedSelected[tag._id] = false;
                        vm.isDeletedSelectAll = false;
                    };
                    vm.roomsDeletedSelectedList = [];
                }else {
                    //选择全部
                    vm.roomsDeletedSelectedList = [];
                    for (var i = 0; i < vm.roomsDeletedList.length; i++) {
                        var tag = vm.roomsDeletedList[i];
                        vm.roomsDeletedSelected[tag._id] = true;
                        vm.roomsDeletedSelectedList.push(tag._id);
                        vm.isDeletedSelectAll = true;
                    };
                }

            };

            vm.selectThisDeletedRoom = function(id) {

                if(vm.roomsDeletedSelected[id] == undefined) {
                    vm.roomsDeletedSelected[id] = false;
                }

                if(vm.roomsDeletedSelected[id]) {
                    vm.roomsDeletedSelected[id] = true;
                    vm.roomsDeletedSelectedList.push(id);
                }else {
                    vm.roomsDeletedSelected[id] = false;
                    vm.roomsDeletedSelectedList.splice(vm.roomsDeletedSelectedList.indexOf(id), 1);
                }

                console.log(vm.roomsDeletedSelectedList);
            }

        }

        function activate() {
            vm.selectCtrl = {

                names: [{
                    val: '编辑',
                    onClicked: function(ev, tm, index) {
                        $mdDialog.show({
                            controller: DialogController,
                            templateUrl: 'rooms_detail.tmpl.html',
                            targetEvent: ev,
                        })
                        .then(function(answer) {
                        }, function() {
                        });

                        DialogController.$inject = ['$scope', '$mdDialog'];
                        function DialogController($scope, $mdDialog) {

                            $scope.tag = tm;

                            $scope.hide = function() {
                                $mdDialog.hide();
                            };

                            $scope.cancel = function() {
                                $mdDialog.cancel();
                            };

                            $scope.answer = function(answer) {
                                $mdDialog.hide(answer);
                            };

                            $scope.confirmToModifyThisRoom = function() {
                                RoomService.update($scope.tag._id, $scope.tag.name, $scope.tag.description)
                                .success(function(res) {

                                    var msg = res.message;

                                    if(res.code === 200) {
                                        msg = '修改成功';
                                    }

                                    var toast = $mdToast.simple()
                                          .content(msg)
                                          .action('我知道了')
                                          .highlightAction(false)
                                          .position('top right');
                                    $mdToast.show(toast).then(function() {
                                    });

                                    if(res.code == 200) {
                                        $scope.cancel();
                                    }
                                }).error(function(res) {
                                    var toast = $mdToast.simple()
                                          .content('出错了，错误代码：' + status)
                                          .action('我知道了')
                                          .highlightAction(false)
                                          .position('top right');
                                    $mdToast.show(toast).then(function() {
                                    });
                                });
                            };
                        }
                    }
                }, {
                    val: '删除',
                    onClicked: function(ev, tm, index) {

                        var confirm = $mdDialog.confirm()
                            .title('删除确认')
                            .content('你确定要删除此主题？')
                            .ariaLabel('Lucky day')
                            .ok('确定')
                            .cancel('取消')
                            .targetEvent(ev);

                        if(index != undefined) {
                            vm.roomsSelected[tm._id] = true;
                            vm.roomsSelectedList.push(tm._id);
                        }

                        $mdDialog.show(confirm).then(function() {
                            //确定
                            var roomsSelectedLength = vm.roomsSelectedList.length;
                            vm.roomsSelectedList.forEach(function(id, key) {

                                RoomService.remove(id)
                                .success(function(res, status, headers, config) {
                                    var toast = $mdToast.simple()
                                          .content(res.message)
                                          .action('我知道了')
                                          .highlightAction(false)
                                          .position('top right');
                                    $mdToast.show(toast).then(function() {
                                    });

                                    if(key == roomsSelectedLength - 1) {
                                        vm.getAll();
                                        vm.getAllDeleted();
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
                        });
                    }
                }]

            };

            vm.selectDeletedCtrl = {
                names: [{
                    val: '恢复',
                    onClicked: function(ev, tm, index) {

                        if(index != undefined) {
                            vm.roomsDeletedSelected[tm._id] = true;
                            vm.roomsDeletedSelectedList.push(tm._id);
                        }

                        var roomsDeletedSelectedLength = vm.roomsDeletedSelectedList.length;

                        vm.roomsDeletedSelectedList.forEach(function(id, key) {
                            RoomService.unRemove(id)
                            .success(function(res, status, headers, config) {
                                var toast = $mdToast.simple()
                                      .content(res.message)
                                      .action('我知道了')
                                      .highlightAction(false)
                                      .position('top right');
                                $mdToast.show(toast).then(function() {
                                });

                                if(key == roomsDeletedSelectedLength - 1) {
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

                    }
                }]
            };
        }
    }

})();
