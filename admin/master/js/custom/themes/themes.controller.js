

(function() {
    'use strict';

    angular
        .module('app.themes')
        .controller('ThemesController', ThemesController);

    ThemesController.$inject = ['$log', '$mdDialog', '$mdToast', 'ThemeService', 'DTOptionsBuilder', 'DTColumnDefBuilder'];
    function ThemesController($log, $mdDialog, $mdToast, ThemeService, DTOptionsBuilder, DTColumnDefBuilder) {
        // for controllerAs syntax
        var vm = this;

        activate();

        activateTable();

        vm.themesList = [];
        vm.themesDeletedList = [];

        function activateTable() {

            vm.dtOptions = DTOptionsBuilder.newOptions().withPaginationType('full_numbers');
            vm.dtColumnDefs = [
                DTColumnDefBuilder.newColumnDef(0),
                DTColumnDefBuilder.newColumnDef(1),
                DTColumnDefBuilder.newColumnDef(2),
                DTColumnDefBuilder.newColumnDef(3).notSortable()
            ];

            ThemeService.getAll(1, 100)
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
                vm.themesList = res.message;
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

            ThemeService.getDeleted(1, 10)
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
                vm.themesDeletedList = res.message;
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

        ////////////////

        function activate() {
            
            vm.selectCtrl = {

                names: [{
                    val: '查看投稿',
                    onClicked: function(ev, tm, index) {
                        window.open("http://poi.poimoe.com/#!/view/" + tm._id);
                    }
                }, {
                    val: '作者信息',
                    onClicked: function(ev, tm, index) {
                        $mdDialog.show({
                            controller: DialogController,
                            templateUrl: 'user_theme_detail.tmpl.html',
                            targetEvent: ev,
                        })
                        .then(function(answer) {
                            $scope.alert = 'You said the information was \'' + answer + '\'.';
                        }, function() {
                            $scope.alert = 'You cancelled the dialog.';
                        });

                        DialogController.$inject = ['$scope', '$mdDialog'];
                        function DialogController($scope, $mdDialog) {

                            $scope.user = tm.user_id;

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
                    val: '删除',
                    onClicked: function(ev, tm, index) {

                        var confirm = $mdDialog.confirm()
                            .title('删除确认')
                            .content('你确定要删除此主题？')
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
                            ThemeService.remove(vm.uids)
                            .success(function(res, status, headers, config) {
                                var toast = $mdToast.simple()
                                      .content(res.message)
                                      .action('我知道了')
                                      .highlightAction(false)
                                      .position('top right');
                                $mdToast.show(toast).then(function() {
                                });

                                if(res.status === 200) {
                                    vm.usersList.splice(index, 1);
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

                            vm.uids.uids = [];

                        }, function() {
                            //取消
                        });
                    }
                }]

            };

            vm.selectDeletedCtrl = {
                names: [{
                    val: '作者信息',
                    onClicked: function(ev, tm, index) {
                        vm.selectCtrl.names[1].onClicked(ev, tm, index);
                    }
                }, {
                    val: '恢复',
                    onClicked: function(ev, tm, index) {
                        ThemeService.unRemove(vm.uids)
                        .success(function(res, status, headers, config) {
                            var toast = $mdToast.simple()
                                  .content(res.message)
                                  .action('我知道了')
                                  .highlightAction(false)
                                  .position('top right');
                            $mdToast.show(toast).then(function() {
                            });

                            if(res.status === 200) {
                                vm.usersList.splice(index, 1);
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
