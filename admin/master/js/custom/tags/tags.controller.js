

(function() {
    'use strict';

    angular
        .module('app.tags')
        .controller('TagsController', TagsController);

    TagsController.$inject = ['$log', '$mdDialog', '$mdToast', 'TagService', 'DTOptionsBuilder', 'DTColumnDefBuilder'];
    function TagsController($log, $mdDialog, $mdToast, TagService, DTOptionsBuilder, DTColumnDefBuilder) {
        // for controllerAs syntax
        var vm = this;

        vm.tagsList = [];
        vm.tagsDeletedList = [];

        activate();
        activateTable();

        function activateTable() {

            vm.isSelectAll = false;

            vm.tagsSelectedList =[]; 
            vm.tagsSelected = {};

            vm.dtOptions = DTOptionsBuilder.newOptions().withPaginationType('full_numbers');
            vm.dtColumnDefs = [
                DTColumnDefBuilder.newColumnDef(0),
                DTColumnDefBuilder.newColumnDef(1),
                DTColumnDefBuilder.newColumnDef(2),
                DTColumnDefBuilder.newColumnDef(3).notSortable()
            ];

            TagService.getAll(1, 100)
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
                vm.tagsList = res.message;
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

            TagService.getDeleted(1, 10)
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
                vm.tagsDeletedList = res.message;
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

            vm.toggleSelectAll = function() {

                if(!vm.isSelectAll) {
                    //取消全选
                    for (var i = 0; i < vm.tagsList.length; i++) {
                        var tag = vm.tagsList[i];
                        vm.tagsSelected[tag._id] = false;
                        vm.isSelectAll = false;
                    };
                    vm.tagsSelectedList = [];
                }else {
                    //选择全部
                    vm.tagsSelectedList = [];
                    for (var i = 0; i < vm.tagsList.length; i++) {
                        var tag = vm.tagsList[i];
                        vm.tagsSelected[tag._id] = true;
                        vm.tagsSelectedList.push(tag._id);
                        vm.isSelectAll = true;
                    };
                }

            };

            vm.selectThisTag = function(id) {

                if(vm.tagsSelected[id] == undefined) {
                    vm.tagsSelected[id] = false;
                }

                if(!vm.tagsSelected[id]) {
                    vm.tagsSelected[id] = true;
                    vm.tagsSelectedList.push(id);
                }else {
                    vm.tagsSelected[id] = false;
                    vm.tagsSelectedList.splice(vm.tagsSelectedList.indexOf(id), 1);
                }
            }

        }

        function activate() {
            vm.selectCtrl = {

                names: [{
                    val: '编辑',
                    onClicked: function(ev, tm, index) {
                        $mdDialog.show({
                            controller: DialogController,
                            templateUrl: 'tags_detail.tmpl.html',
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

                            $scope.confirmToModifyThisTag = function() {
                                TagService.update($scope.tag._id, $scope.tag.name, $scope.tag.description)
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
                            vm.tagsSelected[tm._id] = true;
                            vm.tagsSelectedList.push(tm._id);
                        }

                        $mdDialog.show(confirm).then(function() {
                            //确定
                            vm.tagsSelectedList.forEach(function(id, key) {

                                TagService.remove(id)
                                .success(function(res, status, headers, config) {
                                    var toast = $mdToast.simple()
                                          .content(res.message)
                                          .action('我知道了')
                                          .highlightAction(false)
                                          .position('top right');
                                    $mdToast.show(toast).then(function() {
                                    });

                                    if(res.code === 200) {
                                        vm.tagsList.splice(index, 1);
                                        vm.tagsDeletedList.push(tm);
                                        vm.tagsSelectedList.splice(key, 1);
                                        vm.tagsSelected[id] = false;
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
                        TagService.unRemove(tm._id)
                        .success(function(res, status, headers, config) {
                            var toast = $mdToast.simple()
                                  .content(res.message)
                                  .action('我知道了')
                                  .highlightAction(false)
                                  .position('top right');
                            $mdToast.show(toast).then(function() {
                            });

                            if(res.code === 200) {
                                vm.tagsDeletedList.splice(index, 1);
                                vm.tagsList.push(tm);
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
                }]
            };
        }
    }

})();
