
(function() {
    'use strict';

    angular
        .module('app.group')
        .controller('GroupController', GroupController);

    GroupController.$inject = ['$log', '$mdDialog', '$mdToast', 'AuthorityService', '$state', 'MOptions'];
    
    function GroupController($log, $mdDialog, $mdToast, AuthorityService, $state, MOptions) {

    	var vm = this;

    	vm.groupsList = [];

        MOptions.init(vm, ['allGroupsList']);

    	vm.getGroups = function() {
    		AuthorityService.get()
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

                console.log(res);

				vm.groupsList = res.message;

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
    	}

        vm.getGroups();

    	vm.submitThisGroup = function() {

    		AuthorityService.new(vm.group)
    		.success(function(res) {

                var msg = res.code === 200 ? '添加成功' : res.message;

				var toast = $mdToast.simple()
                      .content(msg)
                      .action('我知道了')
                      .highlightAction(false)
                      .position('top right');
                $mdToast.show(toast).then(function() {
                    $state.go('app.group');
                });

				if(res.code == 200) {
					vm.group = {};
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

    	}

        vm.groupsAction = {
            name: '',
            names: [{
                val: '编辑',
                onClicked: function(ev, group, index) {

                    $mdDialog.show({
                        controller: DialogController,
                        templateUrl: 'group_detail.tmpl.html',
                        targetEvent: ev,
                    })
                    .then(function(answer) {
                        $scope.alert = 'You said the information was \'' + answer + '\'.';
                    }, function() {
                        $scope.alert = 'You cancelled the dialog.';
                    });

                    DialogController.$inject = ['$scope', '$mdDialog', 'ThemeService'];
                    function DialogController($scope, $mdDialog, ThemeService) {

                        $scope.group = group;

                        if(!isNaN($scope.code)) {
                            $scope.group = parseInt($scope.group);
                            console.log($scope.group);
                        }

                        $scope.hide = function() {
                            $mdDialog.hide();
                        };

                        $scope.cancel = function() {
                            $mdDialog.cancel();
                        };

                        $scope.answer = function(answer) {
                            $mdDialog.hide(answer);
                        };

                        $scope.updateThisGroup = function() {
                            AuthorityService.edit(group)
                            .success(function(res, status, headers, config) {
                                var toast = $mdToast.simple()
                                      .content(res.message)
                                      .action('我知道了')
                                      .highlightAction(false)
                                      .position('top right');
                                $mdToast.show(toast).then(function() {
                                });

                                if(res.code == 200) {
                                    vm.getGroups();
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
            },{
                val: '分配权限',
                onClicked: function(ev, group, index) {

                    $mdDialog.show({
                        controller: DialogController,
                        templateUrl: 'auth_distribute.tmpl.html',
                        targetEvent: ev,
                    })
                    .then(function(answer) {
                        $scope.alert = 'You said the information was \'' + answer + '\'.';
                    }, function() {
                        $scope.alert = 'You cancelled the dialog.';
                    });

                    DialogController.$inject = ['$scope', '$mdDialog', 'ThemeService'];
                    function DialogController($scope, $mdDialog, ThemeService) {

                        $scope.group = group;

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
            },{
                val: '删除',
                onClicked: function(ev, group, index) {

                    var confirm = $mdDialog.confirm()
                        .title('删除确认')
                        .content('你确定要删除此用户组？')
                        .ariaLabel('Lucky day')
                        .ok('确定')
                        .cancel('取消')
                        .targetEvent(ev);

                    if(index != undefined) {
                        vm.selecteThisById(group._id, vm.allGroupsList);
                    }

                    $mdDialog.show(confirm).then(function() {
                        //确定
                        var groupSelectedLength = vm.allGroupsList.selectedList.length;

                        console.log(vm.allGroupsList);

                        if(groupSelectedLength === 0) {
                            var toast = $mdToast.simple()
                                  .content('您尚未选择任何用户组')
                                  .action('确定')
                                  .highlightAction(false)
                                  .position('top right');
                            $mdToast.show(toast)
                            return false;
                        }

                        vm.allGroupsList.selectedList.forEach(function(id, key) {
                            AuthorityService.remove(id)
                            .success(function(res, status, headers, config) {
                                var toast = $mdToast.simple()
                                      .content(res.message)
                                      .action('我知道了')
                                      .highlightAction(false)
                                      .position('top right');
                                $mdToast.show(toast).then(function() {
                                });

                                if(key == groupSelectedLength - 1) {
                                    vm.getGroups();
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
                            vm.unSelectThisById(group._id, vm.allGroupsList);
                        }
                    });
                }
            }]
        };

        vm.footerAction = {
            name: '',
            names: [{
                val: '删除',
                onClicked: function(evt) {
                    vm.groupsAction.names[2].onClicked(evt);
                } 
            }]
        }

    }

})();