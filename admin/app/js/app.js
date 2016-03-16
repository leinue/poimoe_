/*!
 * 
 * Angle - Bootstrap Admin App + AngularJS Material
 * 
 * Version: 3.0.0
 * Author: @themicon_co
 * Website: http://themicon.co
 * License: https://wrapbootstrap.com/help/licenses
 * 
 */

// APP START
// ----------------------------------- 

(function() {
    'use strict';

    angular
        .module('angle', [
            'app.core',
            'app.routes',
            'app.sidebar',
            'app.navsearch',
            'app.preloader',
            'app.loadingbar',
            'app.translate',
            'app.settings',
            'app.maps',
            'app.utils',
            'app.material',
            'app.dashboard',
            'app.users',
            'app.themes',
            'app.tags',
            'auth.login',
            'auth.noAuth'
            // 'datatables'
        ]);
})();


(function() {
    'use strict';

    angular
        .module('app.core', [
            'ngRoute',
            'ngAnimate',
            'ngStorage',
            'ngCookies',
            'pascalprecht.translate',
            'ui.bootstrap',
            'ui.router',
            'oc.lazyLoad',
            'cfp.loadingBar',
            'ngSanitize',
            'ngResource',
            'ui.utils',
            'ngAria',
            'ngMessages'
        ]);
})();
(function() {
    'use strict';

    angular
        .module('app.colors', []);
})();
(function() {
    'use strict';

    angular
        .module('app.dashboard', []);
})();
(function() {
    'use strict';

    angular
        .module('app.lazyload', []);
})();
(function() {
    'use strict';

    angular
        .module('app.loadingbar', []);
})();
(function() {
    'use strict';

    angular
        .module('app.maps', []);
})();

(function() {
    'use strict';

    angular
        .module('app.material', [
            'ngMaterial'
          ]);
})();

(function() {
    'use strict';

    angular
        .module('app.navsearch', []);
})();
(function() {
    'use strict';

    angular
        .module('app.preloader', []);
})();


(function() {
    'use strict';

    angular
        .module('app.routes', [
            'app.lazyload'
        ]);
})();
(function() {
    'use strict';

    angular
        .module('app.settings', []);
})();
(function() {
    'use strict';

    angular
        .module('app.sidebar', []);
})();
(function() {
    'use strict';

    angular
        .module('app.translate', []);
})();
(function() {
    'use strict';

    angular
        .module('app.utils', [
          'app.colors'
          ]);
})();

(function() {
    'use strict';

    angular
        .module('app.core')
        .config(coreConfig);

    coreConfig.$inject = ['$controllerProvider', '$compileProvider', '$filterProvider', '$provide'];
    function coreConfig($controllerProvider, $compileProvider, $filterProvider, $provide){
      
      var core = angular.module('app.core');
      // registering components after bootstrap
      core.controller = $controllerProvider.register;
      core.directive  = $compileProvider.directive;
      core.filter     = $filterProvider.register;
      core.factory    = $provide.factory;
      core.service    = $provide.service;
      core.constant   = $provide.constant;
      core.value      = $provide.value;

    }

})();
/**=========================================================
 * Module: constants.js
 * Define constants to inject across the application
 =========================================================*/

(function() {
    'use strict';

    angular
        .module('app.core')
        .constant('APP_MEDIAQUERY', {
          'desktopLG':             1200,
          'desktop':                992,
          'tablet':                 768,
          'mobile':                 480
        })
      ;

})();
(function() {

    'use strict';

    angular
        .module('app.core')
        .run(appRun);

    appRun.$inject = ['$rootScope', '$state', '$stateParams',  '$window', '$templateCache', 'Colors'];
    
    function appRun($rootScope, $state, $stateParams, $window, $templateCache, Colors, $mdDialog, $mdToast) {
      
      // Set reference to access them from any scope
      $rootScope.$state = $state;
      $rootScope.$stateParams = $stateParams;
      $rootScope.$storage = $window.localStorage;

      // Uncomment this to disable template cache
      /*$rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {
          if (typeof(toState) !== 'undefined'){
            $templateCache.remove(toState.templateUrl);
          }
      });*/

      // Allows to use branding color with interpolation
      // {{ colorByName('primary') }}
      $rootScope.colorByName = Colors.byName;

      // cancel click event easily
      $rootScope.cancel = function($event) {
        $event.stopPropagation();
      };

      // Hooks Example
      // ----------------------------------- 

      // Hook not found
      $rootScope.$on('$stateNotFound',
        function(event, unfoundState/*, fromState, fromParams*/) {
            console.log(unfoundState.to); // "lazy.state"
            console.log(unfoundState.toParams); // {a:1, b:2}
            console.log(unfoundState.options); // {inherit:false} + default options
        });
      // Hook error
      $rootScope.$on('$stateChangeError',
        function(event, toState, toParams, fromState, fromParams, error){
          console.log(error);
        });
      // Hook success
      $rootScope.$on('$stateChangeSuccess',
        function(/*event, toState, toParams, fromState, fromParams*/) {
          // display new view from top
          $window.scrollTo(0, 0);
          // Save the route title
          $rootScope.currTitle = $state.current.title;
        });

      // Load a title dynamically
      $rootScope.currTitle = $state.current.title;
      $rootScope.pageTitle = function() {
        var title = $rootScope.app.name + ' - ' + ($rootScope.currTitle || $rootScope.app.description);
        document.title = title;
        return title;
      };

    }

})();


 
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
            if(MO.selectedList.indexOf(id) == -1) {
              MO.isElementSelected[id] = true;
              MO.selectedList.push(id);
            }
          }

          vm.unSelectThisById = function(id, MO) {
            MO.selectedList.splice(MO.selectedList.indexOf(id), 1);
            MO.isElementSelected[id] = false;
          }

        }

      }

    }

})();

(function() {
    'use strict';

    angular
        .module('app.colors')
        .constant('APP_COLORS', {
          'primary':                '#3F51B5',
          'success':                '#4CAF50',
          'info':                   '#2196F3',
          'warning':                '#FF9800',
          'danger':                 '#F44336',
          'inverse':                '#607D8B',
          'green':                  '#009688',
          'pink':                   '#E91E63',
          'purple':                 '#673AB7',
          'dark':                   '#263238',
          'yellow':                 '#FFEB3B',
          'gray-darker':            '#232735',
          'gray-dark':              '#3a3f51',
          'gray':                   '#dde6e9',
          'gray-light':             '#e4eaec',
          'gray-lighter':           '#edf1f2'
        })
        ;
})();
/**=========================================================
 * Module: colors.js
 * Services to retrieve global colors
 =========================================================*/

(function() {
    'use strict';

    angular
        .module('app.colors')
        .service('Colors', Colors);

    Colors.$inject = ['APP_COLORS'];
    function Colors(APP_COLORS) {
        this.byName = byName;

        ////////////////

        function byName(name) {
          return (APP_COLORS[name] || '#fff');
        }
    }

})();


(function() {
    'use strict';

    angular
        .module('app.dashboard')
        .config(['$controllerProvider', function($controllerProvider) {
          // this option might be handy for migrating old apps, but please don't use it
          // in new ones!
          $controllerProvider.allowGlobals();
        }])
        .controller('DashboardController', DashboardController);

    DashboardController.$inject = ['$scope', '$timeout', 'DashBoardService', '$mdToast'];
    function DashboardController($scope, $timeout, DashBoardService, $mdToast) {
        var vm = this;

        activate();

        //////////////

        function activate() {

          // SPLINE
          // ----------------------------------- 
          // vm.splineData = ChartData.load('server/chart/spline.json');
          vm.splineOptions = {
              series: {
                  lines: {
                      show: false
                  },
                  points: {
                      show: true,
                      radius: 4
                  },
                  splines: {
                      show: true,
                      tension: 0.4,
                      lineWidth: 1,
                      fill: 0.5
                  }
              },
              grid: {
                  borderColor: '#eee',
                  borderWidth: 1,
                  hoverable: true,
                  backgroundColor: '#fcfcfc'
              },
              tooltip: true,
              tooltipOpts: {
                  content: function (label, x, y) { return x + ' : ' + y; }
              },
              xaxis: {
                  tickColor: '#fcfcfc',
                  mode: 'categories'
              },
              yaxis: {
                  min: 0,
                  max: 150, // optional: use it for a clear represetation
                  tickColor: '#eee',
                  position: ($scope.app.layout.isRTL ? 'right' : 'left'),
                  tickFormatter: function (v) {
                      return v/* + ' visitors'*/;
                  }
              },
              shadowSize: 0
          };


          // PANEL REFRESH EVENTS
          // ----------------------------------- 

          $scope.$on('panel-refresh', function(event, id) {
            
            console.log('Simulating chart refresh during 3s on #'+id);

            // Instead of timeout you can request a chart data
            $timeout(function(){
              
              // directive listen for to remove the spinner 
              // after we end up to perform own operations
              $scope.$broadcast('removeSpinner', id);
              
              console.log('Refreshed #' + id);

            }, 3000);

          });


          // PANEL DISMISS EVENTS
          // ----------------------------------- 

          // Before remove panel
          $scope.$on('panel-remove', function(event, id, deferred){
            
            console.log('Panel #' + id + ' removing');
            
            // Here is obligatory to call the resolve() if we pretend to remove the panel finally
            // Not calling resolve() will NOT remove the panel
            // It's up to your app to decide if panel should be removed or not
            deferred.resolve();
          
          });

          // Panel removed ( only if above was resolved() )
          $scope.$on('panel-removed', function(event, id){

            console.log('Panel #' + id + ' removed');

          });

          vm.dashboardInfo = {};

          DashBoardService.dashboardInfo()
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
            vm.dashboardInfo = res.message;

          }).error(function(res, status, headers, config) {
              var toast = $mdToast.simple()
                    .content('出错了，错误代码：' + status)
                    .action('我知道了')
                    .highlightAction(false)
                    .position('top right');
              $mdToast.show(toast).then(function() {
              });
          });

          DashBoardService.getHotTags()
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
            vm.hotTags = res.message;

          }).error(function(res, status, headers, config) {
              var toast = $mdToast.simple()
                    .content('出错了，错误代码：' + status)
                    .action('我知道了')
                    .highlightAction(false)
                    .position('top right');
              $mdToast.show(toast).then(function() {
              });
          });

          DashBoardService.getRecommended()
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

            vm.recommended = res.message;

          }).error(function(res, status, headers, config) {
              var toast = $mdToast.simple()
                    .content('出错了，错误代码：' + status)
                    .action('我知道了')
                    .highlightAction(false)
                    .position('top right');
              $mdToast.show(toast).then(function() {
              });
          });

          DashBoardService.getHotThemes()
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
            vm.hotThemes = res.message;

          }).error(function(res, status, headers, config) {
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
})();
 
(function() {
    'use strict';

    angular
        .module('app.dashboard')
        .service('DashBoardService', DashBoardService);

    DashBoardService.$inject = ['$http', '$rootScope'];

    function DashBoardService($http, $rootScope) {

      return {

        dashboardInfo: function() {
          return $http.get($rootScope.app.baseUrl + 'dashboard/info');
        },

        usersCount: function() {
          return $http.get($rootScope.app.baseUrl + 'user/select/all/');
        },

        tagsCount: function() {
          return $http.get($rootScope.app.baseUrl + 'user/select/blocked/');
        },

        themesCount: function() {
          return $http.get($rootScope.app.baseUrl + 'user/select/blocked/');
        },

        userAddedToday: function() {
          return $http.get($rootScope.app.baseUrl + 'user/select/blocked/');          
        },

        usersBlockedCount: function() {
          return $http.get($rootScope.app.baseUrl + 'user/select/blocked/');          
        },

        usersBlockedCount: function() {
          return $http.get($rootScope.app.baseUrl + 'user/select/blocked/');          
        },

        usersDeletedCount: function() {
          return $http.get($rootScope.app.baseUrl + 'user/select/blocked/');          
        },

        themesAddedToday: function() {
          return $http.get($rootScope.app.baseUrl + 'user/select/blocked/');          
        },

        themesDeletedCount: function() {
          return $http.get($rootScope.app.baseUrl + 'user/select/deleted/');          
        },

        tagsAddedToday: function() {
          return $http.get($rootScope.app.baseUrl + 'user/select/blocked/');          
        },

        tagsDeletedCount: function() {
          return $http.get($rootScope.app.baseUrl + 'user/select/blocked/');          
        },

        getHotTags: function() {
          return $http.get($rootScope.app.baseUrl + 'tags/select/hotTags');          
        },

        getRecommended: function() {
          return $http.get($rootScope.app.baseUrl + 'user/recommended');          
        },

        getHotThemes: function() {
          return $http.get($rootScope.app.baseUrl + 'themes/hot');          
        }

      }

    }

})();

(function() {
    'use strict';

    angular
        .module('app.lazyload')
        .config(lazyloadConfig);

    lazyloadConfig.$inject = ['$ocLazyLoadProvider', 'APP_REQUIRES'];
    function lazyloadConfig($ocLazyLoadProvider, APP_REQUIRES){

      // Lazy Load modules configuration
      $ocLazyLoadProvider.config({
        debug: false,
        events: true,
        modules: APP_REQUIRES.modules
      });

    }
})();
(function() {
    'use strict';

    angular
        .module('app.lazyload')
        .constant('APP_REQUIRES', {
          // jQuery based and standalone scripts
          scripts: {
            'modernizr':          ['vendor/modernizr/modernizr.js'],
            'icons':              ['vendor/fontawesome/css/font-awesome.min.css',
                                   'vendor/simple-line-icons/css/simple-line-icons.css'],
            'weather-icons':      ['vendor/weather-icons/css/weather-icons.min.css'],
            'loadGoogleMapsJS':   ['app/vendor/gmap/load-google-maps.js'],

          },
          // Angular based script (use the right module name)
          modules: [
            // {name: 'toaster', files: ['vendor/angularjs-toaster/toaster.js', 'vendor/angularjs-toaster/toaster.css']}
            {name: 'ui.map',                    files: ['vendor/angular-ui-map/ui-map.js']},
            
            {name: 'datatables',                files: ['vendor/datatables/media/css/jquery.dataTables.css',
                                                        'vendor/datatables/media/js/jquery.dataTables.js',
                                                        'vendor/angular-datatables/dist/angular-datatables.js'], serie: true},

          ]
        })
        ;

})();

(function() {
    'use strict';

    angular
        .module('app.loadingbar')
        .config(loadingbarConfig)
        ;
    loadingbarConfig.$inject = ['cfpLoadingBarProvider'];
    function loadingbarConfig(cfpLoadingBarProvider){
      cfpLoadingBarProvider.includeBar = true;
      cfpLoadingBarProvider.includeSpinner = false;
      cfpLoadingBarProvider.latencyThreshold = 500;
      cfpLoadingBarProvider.parentSelector = '.wrapper > section';
    }
})();
(function() {
    'use strict';

    angular
        .module('app.loadingbar')
        .run(loadingbarRun)
        ;
    loadingbarRun.$inject = ['$rootScope', '$timeout', 'cfpLoadingBar', '$mdDialog', '$mdToast', '$state'];
    function loadingbarRun($rootScope, $timeout, cfpLoadingBar, $mdDialog, $mdToast, $state){

      // Loading bar transition
      // ----------------------------------- 
      var thBar;
      $rootScope.$on('$stateChangeStart', function(evt, next, curr) {

        if(localStorage.isFromLoginPage == 'true' && localStorage.isFromLoginPage != undefined) {
          localStorage.isFromLoginPage = 'false';
          return false;
        }

        if($('.wrapper > section').length) // check if bar container exists
          thBar = $timeout(function() {
            cfpLoadingBar.start();
          }, 0); // sets a latency Threshold
      });

      $rootScope.$on('$stateChangeSuccess', function(event, next, curr) {

        event.targetScope.$watch('$viewContentLoaded', function () {
          $timeout.cancel(thBar);
          cfpLoadingBar.complete();
        });

        var alertInfo = function(content, pathTo) {
          var toast = $mdToast.simple()
            .content(content)
            .action('确定')
            .highlightAction(false)
            .position('top right');
          $mdToast.show(toast).then(function() {
            $state.go(pathTo);
          });

          $state.go(pathTo);

          if(document.domain == 'localhost') {
            // window.location.href = "http://" + document.domain + ':8080/index.html#/' + pathTo;                
          }else {
            // window.location.href = "http://" + document.domain + '/index.html#/' + pathTo;
          }
        }

        // 控制未登录只能访问登录和无权访问页面

        var publicRoutes = ['auth.login', 'auth.noAuth'];

        if(localStorage.login == undefined || localStorage.login == 'false') {

          for (var i = 0; i < publicRoutes.length; i++) {
            var route = publicRoutes[i];

            if(next.name.indexOf(route) == -1) {
              alertInfo('无权访问，请登录', 'auth.login');
              break;
            }

          };

          return false;

        }

        // 控制登录后禁止访问的页面
        var accessDeniedPageAfterLogin = ['auth.login'];

        // 其中登录页面允许在没有权限时访问
        if(localStorage.login == 'true') {
          for (var i = 0; i < accessDeniedPageAfterLogin.length; i++) {
            var route = accessDeniedPageAfterLogin[i];
            if(next.name.indexOf(route) != -1 && localStorage.isRoot == 'true') {
              alertInfo('您已登录过', 'app.welcome');
              break;
            }
          };
        }

        // 检测用户组非root之后指向noAuth页面
        if(localStorage.isRoot == 'false') {
          if(next.name != 'auth.noAuth') {
            if(next.name != 'auth.login') {
              $state.go('auth.noAuth');
            }
          }
          return false;
        }

      });

    }

})();
/**=========================================================
 * Module: modals.js
 * Provides a simple way to implement bootstrap modals from templates
 =========================================================*/

(function() {
    'use strict';

    angular
        .module('app.maps')
        .controller('ModalGmapController', ModalGmapController);

    ModalGmapController.$inject = ['$modal'];
    function ModalGmapController($modal) {
        var vm = this;

        activate();

        ////////////////

        function activate() {

          vm.open = function (size) {

            //var modalInstance = 
            $modal.open({
              templateUrl: '/myModalContent.html',
              controller: ModalInstanceCtrl,
              size: size
            });
          };

          // Please note that $modalInstance represents a modal window (instance) dependency.
          // It is not the same as the $modal service used above.
          
          ModalInstanceCtrl.$inject = ['$scope', '$modalInstance', '$timeout'];
          function ModalInstanceCtrl($scope, $modalInstance, $timeout) {

            $modalInstance.opened.then(function () {
              var position = new google.maps.LatLng(33.790807, -117.835734);

              $scope.mapOptionsModal = {
                zoom: 14,
                center: position,
                mapTypeId: google.maps.MapTypeId.ROADMAP
              };

              // we use timeout to wait maps to be ready before add a markers
              $timeout(function(){
                // 1. Add a marker at the position it was initialized
                new google.maps.Marker({
                  map: $scope.myMapModal,
                  position: position
                });
                // 2. Trigger a resize so the map is redrawed 
                google.maps.event.trigger($scope.myMapModal, 'resize');
                // 3. Move to the center if it is misaligned
                $scope.myMapModal.panTo(position);
              });

            });

            $scope.ok = function () {
              $modalInstance.close('closed');
            };

            $scope.cancel = function () {
              $modalInstance.dismiss('cancel');
            };

          }
          
        }
    }

})();


(function() {
    'use strict';

    angular
        .module('app.maps')
        .controller('GMapController', GMapController);

    GMapController.$inject = ['$timeout'];
    function GMapController($timeout) {
        var vm = this;

        activate();

        ////////////////

        function activate() {
          var position = [
              new google.maps.LatLng(33.790807, -117.835734),
              new google.maps.LatLng(33.790807, -117.835734),
              new google.maps.LatLng(33.790807, -117.835734),
              new google.maps.LatLng(33.790807, -117.835734),
              new google.maps.LatLng(33.787453, -117.835858)
            ];
          
          vm.addMarker = addMarker;
          // we use timeout to wait maps to be ready before add a markers
          $timeout(function(){
            addMarker(vm.myMap1, position[0]);
            addMarker(vm.myMap2, position[1]);
            addMarker(vm.myMap3, position[2]);
            addMarker(vm.myMap5, position[3]);
          });

          vm.mapOptions1 = {
            zoom: 14,
            center: position[0],
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            scrollwheel: false
          };

          vm.mapOptions2 = {
            zoom: 19,
            center: position[1],
            mapTypeId: google.maps.MapTypeId.ROADMAP
          };

          vm.mapOptions3 = {
            zoom: 14,
            center: position[2],
            mapTypeId: google.maps.MapTypeId.SATELLITE
          };

          vm.mapOptions4 = {
            zoom: 14,
            center: position[3],
            mapTypeId: google.maps.MapTypeId.ROADMAP
          };

          // for multiple markers
          $timeout(function(){
            addMarker(vm.myMap4, position[3]);
            addMarker(vm.myMap4, position[4]);
          });

          // custom map style
          var MapStyles = [{'featureType':'water','stylers':[{'visibility':'on'},{'color':'#bdd1f9'}]},{'featureType':'all','elementType':'labels.text.fill','stylers':[{'color':'#334165'}]},{featureType:'landscape',stylers:[{color:'#e9ebf1'}]},{featureType:'road.highway',elementType:'geometry',stylers:[{color:'#c5c6c6'}]},{featureType:'road.arterial',elementType:'geometry',stylers:[{color:'#fff'}]},{featureType:'road.local',elementType:'geometry',stylers:[{color:'#fff'}]},{featureType:'transit',elementType:'geometry',stylers:[{color:'#d8dbe0'}]},{featureType:'poi',elementType:'geometry',stylers:[{color:'#cfd5e0'}]},{featureType:'administrative',stylers:[{visibility:'on'},{lightness:33}]},{featureType:'poi.park',elementType:'labels',stylers:[{visibility:'on'},{lightness:20}]},{featureType:'road',stylers:[{color:'#d8dbe0',lightness:20}]}];
          vm.mapOptions5 = {
            zoom: 14,
            center: position[3],
            styles: MapStyles,
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            scrollwheel: false
          };

          ///////////////
          
          function addMarker(map, position) {
            return new google.maps.Marker({
              map: map,
              position: position
            });
          }

        }
    }
})();


(function() {
    'use strict';
    // Used only for the BottomSheetExample
    angular
        .module('app.material')
        .config(materialConfig)
        .config(httpConfig);

    materialConfig.$inject = ['$mdIconProvider'];
    function materialConfig($mdIconProvider){
      $mdIconProvider
        .icon('share-arrow', 'app/img/icons/share-arrow.svg', 24)
        .icon('upload', 'app/img/icons/upload.svg', 24)
        .icon('copy', 'app/img/icons/copy.svg', 24)
        .icon('print', 'app/img/icons/print.svg', 24)
        .icon('hangout', 'app/img/icons/hangout.svg', 24)
        .icon('mail', 'app/img/icons/mail.svg', 24)
        .icon('message', 'app/img/icons/message.svg', 24)
        .icon('copy2', 'app/img/icons/copy2.svg', 24)
        .icon('facebook', 'app/img/icons/facebook.svg', 24)
        .icon('twitter', 'app/img/icons/twitter.svg', 24);
    }

    httpConfig.$inject = ['$httpProvider'];
    function httpConfig($httpProvider) {

        if(typeof localStorage.login != 'undefined') {
            if(localStorage.login == 'true') {
                $httpProvider.defaults.headers.common['Authorization'] = 'Basic ' + localStorage.accessToken;                
            }
        }

    }


})();


(function() {
    'use strict';

    angular
        .module('app.material')
        .controller('MDAutocompleteCtrl', MDAutocompleteCtrl)
        .controller('MDBottomSheetCtrl', MDBottomSheetCtrl)
        .controller('MDListBottomSheetCtrl', MDListBottomSheetCtrl)
        .controller('MDGridBottomSheetCtrl', MDGridBottomSheetCtrl)
        .controller('MDCheckboxCtrl', MDCheckboxCtrl)
        .controller('MDRadioCtrl', MDRadioCtrl)
        .controller('MDSwitchCtrl', MDSwitchCtrl)
        .controller('MDDialogCtrl', MDDialogCtrl)
        .controller('MDSliderCtrl', MDSliderCtrl)
        .controller('MDSelectCtrl', MDSelectCtrl)
        .controller('MDInputCtrl', MDInputCtrl)
        .controller('MDProgressCtrl', MDProgressCtrl)
        .controller('MDSidenavCtrl', MDSidenavCtrl)
        .controller('MDSubheaderCtrl', MDSubheaderCtrl)
        .controller('MDToastCtrl', MDToastCtrl)
          .controller('ToastCtrl', ToastCtrl)
        .controller('MDTooltipCtrl', MDTooltipCtrl)
        .controller('BottomSheetExample', BottomSheetExample)
          .controller('ListBottomSheetCtrl', ListBottomSheetCtrl)
          .controller('GridBottomSheetCtrl', GridBottomSheetCtrl)
        ;

    /*
      MDAutocompleteCtrl
     */
    MDAutocompleteCtrl.$inject = ['$scope', '$timeout', '$q'];
    function MDAutocompleteCtrl($scope, $timeout, $q) {
      var self = this;

      self.states        = loadAll();
      self.selectedItem  = null;
      self.searchText    = null;
      self.querySearch   = querySearch;
      self.simulateQuery = false;
      self.isDisabled    = false;

      // use $timeout to simulate remote dataservice call
      function querySearch (query) {
        var results = query ? self.states.filter( createFilterFor(query) ) : [],
            deferred;
        if (self.simulateQuery) {
          deferred = $q.defer();
          $timeout(function () { deferred.resolve( results ); }, Math.random() * 1000, false);
          return deferred.promise;
        } else {
          return results;
        }
      }

      function loadAll() {
        var allStates = 'Alabama, Alaska, Arizona, Arkansas, California, Colorado, Connecticut, Delaware, Florida, Georgia, Hawaii, Idaho, Illinois, Indiana, Iowa, Kansas, Kentucky, Louisiana, Maine, Maryland, Massachusetts, Michigan, Minnesota, Mississippi, Missouri, Montana, Nebraska, Nevada, New Hampshire, New Jersey, New Mexico, New York, North Carolina, North Dakota, Ohio, Oklahoma, Oregon, Pennsylvania, Rhode Island, South Carolina, South Dakota, Tennessee, Texas, Utah, Vermont, Virginia, Washington, West Virginia, Wisconsin, Wyoming';

        return allStates.split(/, +/g).map( function (state) {
          return {
            value: state.toLowerCase(),
            display: state
          };
        });
      }

          /**
           * Create filter function for a query string
           */
          function createFilterFor(query) {
            var lowercaseQuery = angular.lowercase(query);

            return function filterFn(state) {
              return (state.value.indexOf(lowercaseQuery) === 0);
            };

          }
        }

    /*
    MDBottomSheetCtrl
     */
    MDBottomSheetCtrl.$inject = ['$scope', '$timeout', '$mdBottomSheet'];
    function MDBottomSheetCtrl($scope, $timeout, $mdBottomSheet) {
      $scope.alert = '';

      $scope.showListBottomSheet = function($event) {
        $scope.alert = '';
        $mdBottomSheet.show({
          templateUrl: 'bottom-sheet-list-template.html',
          controller: 'ListBottomSheetCtrl',
          targetEvent: $event
        }).then(function(clickedItem) {
          $scope.alert = clickedItem.name + ' clicked!';
        });
      };

      $scope.showGridBottomSheet = function($event) {
        $scope.alert = '';
        $mdBottomSheet.show({
          templateUrl: 'bottom-sheet-grid-template.html',
          controller: 'GridBottomSheetCtrl',
          targetEvent: $event
        }).then(function(clickedItem) {
          $scope.alert = clickedItem.name + ' clicked!';
        });
      };
    }
    /*
    MDListBottomSheetCtrl
     */
    MDListBottomSheetCtrl.$inject = ['$scope', '$mdBottomSheet'];
    function MDListBottomSheetCtrl($scope, $mdBottomSheet) {

      $scope.items = [
        { name: 'Share', icon: 'share' },
        { name: 'Upload', icon: 'upload' },
        { name: 'Copy', icon: 'copy' },
        { name: 'Print this page', icon: 'print' },
      ];

      $scope.listItemClick = function($index) {
        var clickedItem = $scope.items[$index];
        $mdBottomSheet.hide(clickedItem);
      };
    }
    /*
    MDGridBottomSheetCtrl
     */
    MDGridBottomSheetCtrl.$inject = ['$scope', '$mdBottomSheet'];
    function MDGridBottomSheetCtrl($scope, $mdBottomSheet) {

      $scope.items = [
        { name: 'Hangout', icon: 'hangout' },
        { name: 'Mail', icon: 'mail' },
        { name: 'Message', icon: 'message' },
        { name: 'Copy', icon: 'copy' },
        { name: 'Facebook', icon: 'facebook' },
        { name: 'Twitter', icon: 'twitter' },
      ];

      $scope.listItemClick = function($index) {
        var clickedItem = $scope.items[$index];
        $mdBottomSheet.hide(clickedItem);
      };
    }
    /*
    MDCheckboxCtrl
     */
    MDCheckboxCtrl.$inject = ['$scope'];
    function MDCheckboxCtrl($scope) {

      $scope.data = {};
      $scope.data.cb1 = true;
      $scope.data.cb2 = false;
      $scope.data.cb3 = false;
      $scope.data.cb4 = false;
      $scope.data.cb5 = false;
    }
    /*
    MDRadioCtrl
     */
    MDRadioCtrl.$inject = ['$scope'];
    function MDRadioCtrl($scope) {

        $scope.data = {
          group1 : 'Banana',
          group2 : '2',
          group3 : 'avatar-1'
        };

        $scope.avatarData = [{
            id: 'svg-1',
            title: 'avatar 1',
            value: 'avatar-1'
          },{
            id: 'svg-2',
            title: 'avatar 2',
            value: 'avatar-2'
          },{
            id: 'svg-3',
            title: 'avatar 3',
            value: 'avatar-3'
        }];

        $scope.radioData = [
          { label: 'Apple', value: 1 },
          { label: 'Banana', value: 2 },
          { label: 'Mango', value: '3', isDisabled: true }
        ];


        $scope.submit = function() {
          alert('submit');
        };

        var vals = ['Apple', 'Banana', 'Mango', 'Grape', 'Melon', 'Strawberry', 'Kiwi'];
        $scope.addItem = function() {
          var rval = vals[Math.floor(Math.random() * vals.length)];
          $scope.radioData.push({ label: rval, value: rval });
        };

        $scope.removeItem = function() {
          $scope.radioData.pop();
        };
    }
    /*
    MDSwitchCtrl
     */
    MDSwitchCtrl.$inject = ['$scope'];
    function MDSwitchCtrl($scope) {
      $scope.data = {
        cb1: true,
        cb4: true
      };
      
      $scope.onChange = function(cbState){
         $scope.message = 'The switch is now: ' + cbState;
      };
    }
    /*
    MDDialogCtrl
     */
    MDDialogCtrl.$inject = ['$scope', '$mdDialog'];
    function MDDialogCtrl($scope, $mdDialog) {
      $scope.alert = '';

      $scope.showAlert = function(ev) {
        $mdDialog.show(
          $mdDialog.alert()
            .title('This is an alert title')
            .content('You can specify some description text in here.')
            .ariaLabel('Password notification')
            .ok('Got it!')
            .targetEvent(ev)
        );
      };

      $scope.showConfirm = function(ev) {
        var confirm = $mdDialog.confirm()
          .title('Would you like to delete your debt?')
          .content('All of the banks have agreed to forgive you your debts.')
          .ariaLabel('Lucky day')
          .ok('Please do it!')
          .cancel('Sounds like a scam')
          .targetEvent(ev);

        $mdDialog.show(confirm).then(function() {
          $scope.alert = 'You decided to get rid of your debt.';
        }, function() {
          $scope.alert = 'You decided to keep your debt.';
        });
      };

      $scope.showAdvanced = function(ev) {
        $mdDialog.show({
          controller: DialogController,
          templateUrl: 'dialog1.tmpl.html',
          targetEvent: ev,
        })
        .then(function(answer) {
          $scope.alert = 'You said the information was \'' + answer + '\'.';
        }, function() {
          $scope.alert = 'You cancelled the dialog.';
        });
      };
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
    /*
    MDSliderCtrl
     */
    MDSliderCtrl.$inject = ['$scope'];
    function MDSliderCtrl($scope) {

      $scope.color = {
        red: Math.floor(Math.random() * 255),
        green: Math.floor(Math.random() * 255),
        blue: Math.floor(Math.random() * 255)
      };

      $scope.rating1 = 3;
      $scope.rating2 = 2;
      $scope.rating3 = 4;

      $scope.disabled1 = 0;
      $scope.disabled2 = 70;
    }
    /*
    MDSelectCtrl
     */
    function MDSelectCtrl() {
      
      var vm = this;
      
      vm.userState = '';
      vm.states = ('AL AK AZ AR CA CO CT DE FL GA HI ID IL IN IA KS KY LA ME MD MA MI MN MS ' +
          'MO MT NE NV NH NJ NM NY NC ND OH OK OR PA RI SC SD TN TX UT VT VA WA WV WI ' +
          'WY').split(' ').map(function (state) { return { abbrev: state }; });

      vm.sizes = [
          'small (12-inch)',
          'medium (14-inch)',
          'large (16-inch)',
          'insane (42-inch)'
      ];
      vm.toppings = [
        { category: 'meat', name: 'Pepperoni' },
        { category: 'meat', name: 'Sausage' },
        { category: 'meat', name: 'Ground Beef' },
        { category: 'meat', name: 'Bacon' },
        { category: 'veg', name: 'Mushrooms' },
        { category: 'veg', name: 'Onion' },
        { category: 'veg', name: 'Green Pepper' },
        { category: 'veg', name: 'Green Olives' }
      ];
    }
    /*
    MDInputCtrl
     */
    MDInputCtrl.$inject = ['$scope'];
    function MDInputCtrl($scope) {
      $scope.user = {
        title: 'Developer',
        email: 'ipsum@lorem.com',
        firstName: '',
        lastName: '' ,
        company: 'Google' ,
        address: '1600 Amphitheatre Pkwy' ,
        city: 'Mountain View' ,
        state: 'CA' ,
        biography: 'Loves kittens, snowboarding, and can type at 130 WPM.\n\nAnd rumor has it she bouldered up Castle Craig!',
        postalCode : '94043'
      };
      $scope.project = {
        description: 'Nuclear Missile Defense System',
        clientName: 'Bill Clinton',
        rate: 500
      };
    }
    /*
    MDProgressCtrl
     */
    MDProgressCtrl.$inject = ['$scope', '$interval'];
    function MDProgressCtrl($scope, $interval) {
        $scope.mode = 'query';
        $scope.determinateValue = 30;
        $scope.determinateValue2 = 30;

        $interval(function() {
          $scope.determinateValue += 1;
          $scope.determinateValue2 += 1.5;
          if ($scope.determinateValue > 100) {
            $scope.determinateValue = 30;
            $scope.determinateValue2 = 30;
          }
        }, 100, 0, true);

        $interval(function() {
          $scope.mode = ($scope.mode === 'query' ? 'determinate' : 'query');
        }, 7200, 0, true);
    }
    /*
    MDSidenavCtrl
     */
    MDSidenavCtrl.$inject = ['$scope', '$timeout', '$mdSidenav', '$log'];
    function MDSidenavCtrl($scope, $timeout, $mdSidenav, $log) {
      $scope.toggleLeft = function() {
        $mdSidenav('left').toggle()
                          .then(function(){
                              $log.debug('toggle left is done');
                          });
      };
      $scope.toggleRight = function() {
        $mdSidenav('right').toggle()
                            .then(function(){
                              $log.debug('toggle RIGHT is done');
                            });
      };
      $scope.closeLeft = function() {
        $mdSidenav('left').close()
                          .then(function(){
                            $log.debug('close LEFT is done');
                          });

      };
      $scope.closeRight = function() {
        $mdSidenav('right').close()
                            .then(function(){
                              $log.debug('close RIGHT is done');
                            });
      };
    }
    /*
    MDSubheaderCtrl
     */
    MDSubheaderCtrl.$inject = ['$scope'];
    function MDSubheaderCtrl($scope) {
        $scope.messages = [
          {
            face : 'app/img/user/10.jpg',
            what: 'Brunch this weekend?',
            who: 'Min Li Chan',
            when: '3:08PM',
            notes: 'I\'ll be in your neighborhood doing errands'
          },
          {
            face : 'app/img/user/01.jpg',
            what: 'Brunch this weekend?',
            who: 'Min Li Chan',
            when: '3:08PM',
            notes: 'I\'ll be in your neighborhood doing errands'
          },
          {
            face : 'app/img/user/02.jpg',
            what: 'Brunch this weekend?',
            who: 'Min Li Chan',
            when: '3:08PM',
            notes: 'I\'ll be in your neighborhood doing errands'
          },
          {
            face : 'app/img/user/03.jpg',
            what: 'Brunch this weekend?',
            who: 'Min Li Chan',
            when: '3:08PM',
            notes: 'I\'ll be in your neighborhood doing errands'
          },
          {
            face : 'app/img/user/04.jpg',
            what: 'Brunch this weekend?',
            who: 'Min Li Chan',
            when: '3:08PM',
            notes: 'I\'ll be in your neighborhood doing errands'
          },
          {
            face : 'app/img/user/05.jpg',
            what: 'Brunch this weekend?',
            who: 'Min Li Chan',
            when: '3:08PM',
            notes: 'I\'ll be in your neighborhood doing errands'
          },
          {
            face : 'app/img/user/06.jpg',
            what: 'Brunch this weekend?',
            who: 'Min Li Chan',
            when: '3:08PM',
            notes: 'I\'ll be in your neighborhood doing errands'
          },
          {
            face : 'app/img/user/07.jpg',
            what: 'Brunch this weekend?',
            who: 'Min Li Chan',
            when: '3:08PM',
            notes: 'I\'ll be in your neighborhood doing errands'
          },
          {
            face : 'app/img/user/08.jpg',
            what: 'Brunch this weekend?',
            who: 'Min Li Chan',
            when: '3:08PM',
            notes: 'I\'ll be in your neighborhood doing errands'
          },
          {
            face : 'app/img/user/09.jpg',
            what: 'Brunch this weekend?',
            who: 'Min Li Chan',
            when: '3:08PM',
            notes: 'I\'ll be in your neighborhood doing errands'
          },
          {
            face : 'app/img/user/11.jpg',
            what: 'Brunch this weekend?',
            who: 'Min Li Chan',
            when: '3:08PM',
            notes: 'I\'ll be in your neighborhood doing errands'
          },
        ];
    }
    /*
    MDToastCtrl
     */
    MDToastCtrl.$inject = ['$scope', '$mdToast'];
    function MDToastCtrl($scope, $mdToast) {

      $scope.toastPosition = {
        bottom: false,
        top: true,
        left: false,
        right: true
      };

      $scope.getToastPosition = function() {
        return Object.keys($scope.toastPosition)
          .filter(function(pos) { return $scope.toastPosition[pos]; })
          .join(' ');
      };

      $scope.showCustomToast = function() {
        $mdToast.show({
          controller: 'ToastCtrl',
          templateUrl: 'toast-template.html',
          hideDelay: 60000,
          parent:'#toastcontainer',
          position: $scope.getToastPosition()
        });
      };

      $scope.showSimpleToast = function() {
        $mdToast.show(
          $mdToast.simple()
            .content('Simple Toast!')
            .position($scope.getToastPosition())
            .hideDelay(30000)
        );
      };

      $scope.showActionToast = function() {
        var toast = $mdToast.simple()
              .content('Action Toast!')
              .action('OK')
              .highlightAction(false)
              .position($scope.getToastPosition());

        $mdToast.show(toast).then(function() {
          alert('You clicked \'OK\'.');
        });
      };
    }
    /*
    ToastCtrl
     */
    ToastCtrl.$inject = ['$scope', '$mdToast'];
    function ToastCtrl($scope, $mdToast) {
      $scope.closeToast = function() {
        $mdToast.hide();
      };
    }
    /*
    MDTooltipCtrl
     */
    MDTooltipCtrl.$inject = ['$scope'];
    function MDTooltipCtrl($scope) {
      $scope.demo = {};
    }
    /*
    BottomSheetExample
     */
    BottomSheetExample.$inject = ['$scope', '$timeout', '$mdBottomSheet'];
    function BottomSheetExample($scope, $timeout, $mdBottomSheet) {
      $scope.alert = '';

      $scope.showListBottomSheet = function($event) {
        $scope.alert = '';
        $mdBottomSheet.show({
          templateUrl: 'bottom-sheet-list-template.html',
          controller: 'ListBottomSheetCtrl',
          targetEvent: $event,
          parent: '#bottomsheetcontainer'
        }).then(function(clickedItem) {
          $scope.alert = clickedItem.name + ' clicked!';
        });
      };

      $scope.showGridBottomSheet = function($event) {
        $scope.alert = '';
        $mdBottomSheet.show({
          templateUrl: 'bottom-sheet-grid-template.html',
          controller: 'GridBottomSheetCtrl',
          targetEvent: $event,
          parent: '#bottomsheetcontainer'
        }).then(function(clickedItem) {
          $scope.alert = clickedItem.name + ' clicked!';
        });
      };
    }
    /*
    ListBottomSheetCtrl
     */
    ListBottomSheetCtrl.$inject = ['$scope', '$mdBottomSheet'];
    function ListBottomSheetCtrl($scope, $mdBottomSheet) {

      $scope.items = [
        { name: 'Share', icon: 'share-arrow' },
        { name: 'Upload', icon: 'upload' },
        { name: 'Copy', icon: 'copy' },
        { name: 'Print this page', icon: 'print' },
      ];

      $scope.listItemClick = function($index) {
        var clickedItem = $scope.items[$index];
        $mdBottomSheet.hide(clickedItem);
      };
    }
    /*
    GridBottomSheetCtrl
     */
    GridBottomSheetCtrl.$inject = ['$scope', '$mdBottomSheet'];
    function GridBottomSheetCtrl($scope, $mdBottomSheet) {
      $scope.items = [
        { name: 'Hangout', icon: 'hangout' },
        { name: 'Mail', icon: 'mail' },
        { name: 'Message', icon: 'message' },
        { name: 'Copy', icon: 'copy2' },
        { name: 'Facebook', icon: 'facebook' },
        { name: 'Twitter', icon: 'twitter' },
      ];

      $scope.listItemClick = function($index) {
        var clickedItem = $scope.items[$index];
        $mdBottomSheet.hide(clickedItem);
      };
    }


})();

(function() {
    'use strict';
    // Used only for the BottomSheetExample
    angular
        .module('app.material')
        .run(materialRun)
        ;
    materialRun.$inject = ['$http', '$templateCache'];
    function materialRun($http, $templateCache){
      var urls = [
        'app/img/icons/share-arrow.svg',
        'app/img/icons/upload.svg',
        'app/img/icons/copy.svg',
        'app/img/icons/print.svg',
        'app/img/icons/hangout.svg',
        'app/img/icons/mail.svg',
        'app/img/icons/message.svg',
        'app/img/icons/copy2.svg',
        'app/img/icons/facebook.svg',
        'app/img/icons/twitter.svg'
      ];

      angular.forEach(urls, function(url) {
        $http.get(url, {cache: $templateCache});
      });

    }

})();

(function() {
    'use strict';

    angular
        .module('app.material')
        .controller('MaterialWidgetsController', MaterialWidgetsController);

    MaterialWidgetsController.$inject = ['Colors'];
    function MaterialWidgetsController(Colors) {
        var vm = this;

        activate();

        ////////////////

        function activate() {

          vm.sparkOption1 = {
            type : 'line',
            width : '100%',
            height : '140px',
            tooltipOffsetX : -20,
            tooltipOffsetY : 20,
            lineColor : Colors.byName('success'),
            fillColor : Colors.byName('success'),
            spotColor : 'rgba(0,0,0,.26)',
            minSpotColor : 'rgba(0,0,0,.26)',
            maxSpotColor : 'rgba(0,0,0,.26)',
            highlightSpotColor : 'rgba(0,0,0,.26)',
            highlightLineColor : 'rgba(0,0,0,.26)',
            spotRadius : 2,
            tooltipPrefix : '',
            tooltipSuffix : ' Visits',
            tooltipFormat : '{{prefix}}{{y}}{{suffix}}',
            chartRangeMin: 0,
            resize: true
          };

          vm.sparkOptionPie = {
            type: 'pie',
            width : '2em',
            height : '2em',
            sliceColors: [ Colors.byName('success'), Colors.byName('gray-light')]
          };
        
        }
    }
})();
/**=========================================================
 * Module: navbar-search.js
 * Navbar search toggler * Auto dismiss on ESC key
 =========================================================*/

(function() {
    'use strict';

    angular
        .module('app.navsearch')
        .directive('searchOpen', searchOpen)
        .directive('searchDismiss', searchDismiss);

    //
    // directives definition
    // 
    
    function searchOpen () {
        var directive = {
            controller: searchOpenController,
            restrict: 'A'
        };
        return directive;

    }

    function searchDismiss () {
        var directive = {
            controller: searchDismissController,
            restrict: 'A'
        };
        return directive;
        
    }

    //
    // Contrller definition
    // 
    
    searchOpenController.$inject = ['$scope', '$element', 'NavSearch'];
    function searchOpenController ($scope, $element, NavSearch) {
      $element
        .on('click', function (e) { e.stopPropagation(); })
        .on('click', NavSearch.toggle);
    }

    searchDismissController.$inject = ['$scope', '$element', 'NavSearch'];
    function searchDismissController ($scope, $element, NavSearch) {
      
      var inputSelector = '.navbar-form input[type="text"]';

      $(inputSelector)
        .on('click', function (e) { e.stopPropagation(); })
        .on('keyup', function(e) {
          if (e.keyCode === 27) // ESC
            NavSearch.dismiss();
        });
        
      // click anywhere closes the search
      $(document).on('click', NavSearch.dismiss);
      // dismissable options
      $element
        .on('click', function (e) { e.stopPropagation(); })
        .on('click', NavSearch.dismiss);
    }

})();


/**=========================================================
 * Module: nav-search.js
 * Services to share navbar search functions
 =========================================================*/
 
(function() {
    'use strict';

    angular
        .module('app.navsearch')
        .service('NavSearch', NavSearch);

    function NavSearch() {
        this.toggle = toggle;
        this.dismiss = dismiss;

        ////////////////

        var navbarFormSelector = 'form.navbar-form';

        function toggle() {
          var navbarForm = $(navbarFormSelector);

          navbarForm.toggleClass('open');
          
          var isOpen = navbarForm.hasClass('open');
          
          navbarForm.find('input')[isOpen ? 'focus' : 'blur']();
        }

        function dismiss() {
          $(navbarFormSelector)
            .removeClass('open') // Close control
            .find('input[type="text"]').blur() // remove focus
            .val('') // Empty input
            ;
        }        
    }
})();

(function() {
    'use strict';

    angular
        .module('app.preloader')
        .directive('preloader', preloader);

    preloader.$inject = ['$animate', '$timeout', '$q'];
    function preloader ($animate, $timeout, $q) {

        var directive = {
            restrict: 'EAC',
            template: 
              '<div class="preloader-progress">' +
                  '<div class="preloader-progress-bar" ' +
                       'ng-style="{width: loadCounter + \'%\'}"></div>' +
              '</div>'
            ,
            link: link
        };
        return directive;

        ///////

        function link(scope, el) {

          scope.loadCounter = 0;

          var counter  = 0,
              timeout;

          // disables scrollbar
          angular.element('body').css('overflow', 'hidden');
          // ensure class is present for styling
          el.addClass('preloader');

          appReady().then(endCounter);

          timeout = $timeout(startCounter);

          ///////

          function startCounter() {

            var remaining = 100 - counter;
            counter = counter + (0.015 * Math.pow(1 - Math.sqrt(remaining), 2));

            scope.loadCounter = parseInt(counter, 10);

            timeout = $timeout(startCounter, 20);
          }

          function endCounter() {

            $timeout.cancel(timeout);

            scope.loadCounter = 100;

            $timeout(function(){
              // animate preloader hiding
              $animate.addClass(el, 'preloader-hidden');
              // retore scrollbar
              angular.element('body').css('overflow', '');
            }, 300);
          }

          function appReady() {
            var deferred = $q.defer();
            var viewsLoaded = 0;
            // if this doesn't sync with the real app ready
            // a custom event must be used instead
            var off = scope.$on('$viewContentLoaded', function () {
              viewsLoaded ++;
              // we know there are at least two views to be loaded 
              // before the app is ready (1-index.html 2-app*.html)
              if ( viewsLoaded === 2) {
                // with resolve this fires only once
                $timeout(function(){
                  deferred.resolve();
                }, 1);

                off();
              }

            });

            return deferred.promise;
          }

        } //link
    }

})();
/**=========================================================
 * Module: helpers.js
 * Provides helper functions for routes definition
 =========================================================*/

(function() {
    'use strict';

    angular
        .module('app.routes')
        .provider('RouteHelpers', RouteHelpersProvider)
        ;

    RouteHelpersProvider.$inject = ['APP_REQUIRES'];
    function RouteHelpersProvider(APP_REQUIRES) {

      /* jshint validthis:true */
      return {
        // provider access level
        basepath: basepath,
        resolveFor: resolveFor,
        // controller access level
        $get: function() {
          return {
            basepath: basepath,
            resolveFor: resolveFor
          };
        }
      };

      // Set here the base of the relative path
      // for all app views
      function basepath(uri) {
        return 'app/views/' + uri;
      }

      // Generates a resolve object by passing script names
      // previously configured in constant.APP_REQUIRES
      function resolveFor() {
        var _args = arguments;
        return {
          deps: ['$ocLazyLoad','$q', function ($ocLL, $q) {
            // Creates a promise chain for each argument
            var promise = $q.when(1); // empty promise
            for(var i=0, len=_args.length; i < len; i ++){
              promise = andThen(_args[i]);
            }
            return promise;

            // creates promise to chain dynamically
            function andThen(_arg) {
              // also support a function that returns a promise
              if(typeof _arg === 'function')
                  return promise.then(_arg);
              else
                  return promise.then(function() {
                    // if is a module, pass the name. If not, pass the array
                    var whatToLoad = getRequired(_arg);
                    // simple error check
                    if(!whatToLoad) return $.error('Route resolve: Bad resource name [' + _arg + ']');
                    // finally, return a promise
                    return $ocLL.load( whatToLoad );
                  });
            }
            // check and returns required data
            // analyze module items with the form [name: '', files: []]
            // and also simple array of script files (for not angular js)
            function getRequired(name) {
              if (APP_REQUIRES.modules)
                  for(var m in APP_REQUIRES.modules)
                      if(APP_REQUIRES.modules[m].name && APP_REQUIRES.modules[m].name === name)
                          return APP_REQUIRES.modules[m];
              return APP_REQUIRES.scripts && APP_REQUIRES.scripts[name];
            }

          }]};
      } // resolveFor

    }


})();


/**=========================================================
 * Module: config.js
 * App routes and resources configuration
 =========================================================*/


(function() {
    'use strict';

    angular
        .module('app.routes')
        .config(routesConfig);

    routesConfig.$inject = ['$stateProvider', '$locationProvider', '$urlRouterProvider', 'RouteHelpersProvider'];
    function routesConfig($stateProvider, $locationProvider, $urlRouterProvider, helper){
        
        // Set the following to true to enable the HTML5 Mode
        // You may have to set <base> tag in index and a routing configuration in your server
        $locationProvider.html5Mode(false);

        // defaults to welcome

        if(localStorage.login == undefined || localStorage.login == 'false') {
          localStorage.login = 'false';
          $urlRouterProvider.otherwise('/auth/login');
        }else {
          $urlRouterProvider.otherwise('/app/welcome');
        }

          // {
          //   "text": "元素",
          //   "sref": "#",
          //   "icon": "fa fa-sitemap",
          //   "submenu": [
          //     {"text": "Widgets",     "sref": "app.matwidgets"},
          //     {"text": "Cards",       "sref": "app.cards"},
          //     {"text": "Forms",       "sref": "app.forms"},
          //     {"text": "Inputs",      "sref": "app.inputs"},
          //     {"text": "Lists",       "sref": "app.lists"},
          //     {"text": "Whiteframe",  "sref": "app.whiteframe"},
          //     {"text": "Colors",      "sref": "app.matcolors"},
          //     {"text": "ngMaterial",  "sref": "app.ngmaterial"}
          //   ]
          // },

        // 
        // 应用程序欢迎目录
        // -----------------------------------
        $stateProvider
          .state('app', {
              url: '/app',
              abstract: true,
              templateUrl: helper.basepath('app.html'),
              resolve: helper.resolveFor('modernizr', 'icons')
          })
          .state('app.welcome', {
              url: '/welcome',
              title: 'Welcome',
              templateUrl: helper.basepath('welcome.html')
          })
          .state('app.dashboard', {
              url: '/dashboard',
              title: '控制面板',
              templateUrl: helper.basepath('dashboard.html')
          })
          //
          // Material 
          // ----------------------------------- 
          .state('app.cards', {
            url: '/cards',
            title: 'Material Cards',
            templateUrl: helper.basepath( 'material.cards.html' )
          })
          .state('app.forms', {
            url: '/forms',
            title: 'Material Forms',
            templateUrl: helper.basepath( 'material.forms.html' )
          })
          .state('app.whiteframe', {
            url: '/whiteframe',
            title: 'Material Whiteframe',
            templateUrl: helper.basepath( 'material.whiteframe.html' )
          })
          .state('app.matcolors', {
            url: '/matcolors',
            title: 'Material Colors',
            templateUrl: helper.basepath( 'material.colors.html' )
          })
          .state('app.lists', {
            url: '/lists',
            title: 'Material Lists',
            templateUrl: helper.basepath( 'material.lists.html' )
          })
          .state('app.inputs', {
            url: '/inputs',
            title: 'Material Inputs',
            templateUrl: helper.basepath( 'material.inputs.html' )
          })
          .state('app.matwidgets', {
            url: '/matwidgets',
            title: 'Material Widgets',
            templateUrl: helper.basepath( 'material.widgets.html' ),
            resolve: helper.resolveFor('weather-icons', 'loadGoogleMapsJS', function() { return loadGoogleMaps(); }, 'ui.map')
          })
          .state('app.ngmaterial', {
            url: '/ngmaterial',
            title: 'ngMaterial',
            templateUrl: helper.basepath( 'material.ngmaterial.html' )
          })
          //
          // 数据管理 
          // -----------------------------------
          .state('app.usersmgr', {
            url: '/users',
            title: '用户数据管理',
            templateUrl: helper.basepath( 'data/users.html' ),
            resolve: helper.resolveFor('datatables')
          })
          .state('app.themesmgr', {
            url: '/themes',
            title: '投稿管理',
            templateUrl: helper.basepath( 'data/themes.html' ),
            resolve: helper.resolveFor('datatables')
          })
          .state('app.tagsmgr', {
            url: '/tags',
            title: '标签管理',
            templateUrl: helper.basepath( 'data/tags.html' ),
            resolve: helper.resolveFor('datatables')
          })
          //
          // 官网管理 
          // -----------------------------------
          .state('app.website', {
            url: '/website/manager',
            title: '官网管理',
            templateUrl: helper.basepath( 'website/website.html' )
          })
          //
          // 用户登录 
          // -----------------------------------
          .state('auth', {
              url: '/auth',
              templateUrl: helper.basepath( 'auth/page.html' ),
              resolve: helper.resolveFor('modernizr', 'icons'),
              controller: ['$rootScope', function($rootScope) {
                  $rootScope.app.layout.isBoxed = false;
              }]
          })
          .state('auth.login', {
              url: '/login',
              title: '登录',
              templateUrl: helper.basepath( 'auth/login.html' )
          })
          .state('auth.noAuth', {
              url: '/noauth',
              title: '登录',
              templateUrl: helper.basepath( 'auth/noauth.html' )
          })

          // CUSTOM RESOLVES
          //   Add your own resolves properties
          //   following this object extend
          //   method
          // ----------------------------------- 
          // .state('app.someroute', {
          //   url: '/some_url',
          //   templateUrl: 'path_to_template.html',
          //   controller: 'someController',
          //   resolve: angular.extend(
          //     helper.resolveFor(), {
          //     // YOUR RESOLVES GO HERE
          //     }
          //   )
          // })
          ;

    } // routesConfig

})();


(function() {
    'use strict';

    angular
        .module('app.settings')
        .run(settingsRun);

    settingsRun.$inject = ['$rootScope', '$localStorage', 'AuthService'];

    function settingsRun($rootScope, $localStorage, AuthService){

      // Global Settings
      // ----------------------------------- 
      $rootScope.app = {
        name: 'Poimoe',
        description: '管理后台',
        year: ((new Date()).getFullYear()),
        layout: {
          isFixed: true,
          isCollapsed: false,
          isBoxed: false,
          isRTL: false,
          horizontal: false,
          isFloat: false,
          asideHover: false,
          theme: null
        },
        useFullLayout: false,
        hiddenFooter: false,
        offsidebarOpen: false,
        asideToggled: false,
        viewAnimation: 'ng-fadeInUp',
        baseUrl: 'http://api.poimoe.com/'
      };

      if(document.domain != 'localhost') {
        document.domain = 'poimoe.com';
      }

      var getCookie = function(c_name) {
        if (document.cookie.length > 0){  
          c_start = document.cookie.indexOf(c_name + "=");
          if (c_start != -1){
            c_start = c_start + c_name.length+1;  
            c_end = document.cookie.indexOf(";",c_start);  
            if (c_end == -1){
              c_end = document.cookie.length;  
              return unescape(document.cookie.substring(c_start,c_end));            
            }
          }   
        }  
        return "";  
      }

      var userData = getCookie('userData');
      AuthService.parseUserInfo(userData);

      // Setup the layout mode
      $rootScope.app.layout.horizontal = ( $rootScope.$stateParams.layout === 'app-h') ;

      // Restore layout settings [*** UNCOMMENT TO ENABLE ***]
      // if( angular.isDefined($localStorage.layout) )
      //   $rootScope.app.layout = $localStorage.layout;
      // else
      //   $localStorage.layout = $rootScope.app.layout;
      //
      // $rootScope.$watch('app.layout', function () {
      //   $localStorage.layout = $rootScope.app.layout;
      // }, true);

      // Close submenu when sidebar change from collapsed to normal
      $rootScope.$watch('app.layout.isCollapsed', function(newValue) {
        if( newValue === false )
          $rootScope.$broadcast('closeSidebarMenu');
      });

    }

})();

/**=========================================================
 * Module: sidebar-menu.js
 * Handle sidebar collapsible elements
 =========================================================*/

(function() {
    'use strict';

    angular
        .module('app.sidebar')
        .controller('SidebarController', SidebarController);

    SidebarController.$inject = ['$rootScope', '$scope', '$state', 'SidebarLoader', 'Utils'];
    function SidebarController($rootScope, $scope, $state, SidebarLoader,  Utils) {

        activate();

        ////////////////

        function activate() {
          var collapseList = [];

          // demo: when switch from collapse to hover, close all items
          $rootScope.$watch('app.layout.asideHover', function(oldVal, newVal){
            if ( newVal === false && oldVal === true) {
              closeAllBut(-1);
            }
          });


          // Load menu from json file
          // ----------------------------------- 

          SidebarLoader.getMenu(sidebarReady);
          
          function sidebarReady(items) {
            $scope.menuItems = items;
          }

          // Handle sidebar and collapse items
          // ----------------------------------
          
          $scope.getMenuItemPropClasses = function(item) {
            return (item.heading ? 'nav-heading' : '') +
                   (isActive(item) ? ' active' : '') ;
          };

          $scope.addCollapse = function($index, item) {
            collapseList[$index] = $rootScope.app.layout.asideHover ? true : !isActive(item);
          };

          $scope.isCollapse = function($index) {
            return (collapseList[$index]);
          };

          $scope.toggleCollapse = function($index, isParentItem) {

            // collapsed sidebar doesn't toggle drodopwn
            if( Utils.isSidebarCollapsed() || $rootScope.app.layout.asideHover ) return true;

            // make sure the item index exists
            if( angular.isDefined( collapseList[$index] ) ) {
              if ( ! $scope.lastEventFromChild ) {
                collapseList[$index] = !collapseList[$index];
                closeAllBut($index);
              }
            }
            else if ( isParentItem ) {
              closeAllBut(-1);
            }
            
            $scope.lastEventFromChild = isChild($index);

            return true;
          
          };

          // Controller helpers
          // ----------------------------------- 

            // Check item and children active state
            function isActive(item) {

              if(!item) return;

              if( !item.sref || item.sref === '#') {
                var foundActive = false;
                angular.forEach(item.submenu, function(value) {
                  if(isActive(value)) foundActive = true;
                });
                return foundActive;
              }
              else
                return $state.is(item.sref) || $state.includes(item.sref);
            }

            function closeAllBut(index) {
              index += '';
              for(var i in collapseList) {
                if(index < 0 || index.indexOf(i) < 0)
                  collapseList[i] = true;
              }
            }

            function isChild($index) {
              /*jshint -W018*/
              return (typeof $index === 'string') && !($index.indexOf('-') < 0);
            }
        
        } // activate
    }

})();

/**=========================================================
 * Module: sidebar.js
 * Wraps the sidebar and handles collapsed state
 =========================================================*/

(function() {
    'use strict';

    angular
        .module('app.sidebar')
        .directive('sidebar', sidebar);

    sidebar.$inject = ['$rootScope', '$timeout', '$window', 'Utils'];
    function sidebar ($rootScope, $timeout, $window, Utils) {
        var $win = angular.element($window);
        var directive = {
            // bindToController: true,
            // controller: Controller,
            // controllerAs: 'vm',
            link: link,
            restrict: 'EA',
            template: '<nav class="sidebar" ng-transclude></nav>',
            transclude: true,
            replace: true
            // scope: {}
        };
        return directive;

        function link(scope, element, attrs) {

          var currentState = $rootScope.$state.current.name;
          var $sidebar = element;

          var eventName = Utils.isTouch() ? 'click' : 'mouseenter' ;
          var subNav = $();

          $sidebar.on( eventName, '.nav > li', function() {

            if( Utils.isSidebarCollapsed() || $rootScope.app.layout.asideHover ) {

              subNav.trigger('mouseleave');
              subNav = toggleMenuItem( $(this), $sidebar);

              // Used to detect click and touch events outside the sidebar          
              sidebarAddBackdrop();

            }

          });

          scope.$on('closeSidebarMenu', function() {
            removeFloatingNav();
          });

          // Normalize state when resize to mobile
          $win.on('resize', function() {
            if( ! Utils.isMobile() )
          	asideToggleOff();
          });

          // Adjustment on route changes
          $rootScope.$on('$stateChangeStart', function(event, toState) {
            currentState = toState.name;
            // Hide sidebar automatically on mobile
            asideToggleOff();

            $rootScope.$broadcast('closeSidebarMenu');
          });

      	  // Autoclose when click outside the sidebar
          if ( angular.isDefined(attrs.sidebarAnyclickClose) ) {
            
            var wrapper = $('.wrapper');
            var sbclickEvent = 'click.sidebar';
            
            $rootScope.$watch('app.asideToggled', watchExternalClicks);

          }

          //////

          function watchExternalClicks(newVal) {
            // if sidebar becomes visible
            if ( newVal === true ) {
              $timeout(function(){ // render after current digest cycle
                wrapper.on(sbclickEvent, function(e){
                  // if not child of sidebar
                  if( ! $(e.target).parents('.aside').length ) {
                    asideToggleOff();
                  }
                });
              });
            }
            else {
              // dettach event
              wrapper.off(sbclickEvent);
            }
          }

          function asideToggleOff() {
            $rootScope.app.asideToggled = false;
            if(!scope.$$phase) scope.$apply(); // anti-pattern but sometimes necessary
      	  }
        }
        
        ///////

        function sidebarAddBackdrop() {
          var $backdrop = $('<div/>', { 'class': 'dropdown-backdrop'} );
          $backdrop.insertAfter('.aside-inner').on('click mouseenter', function () {
            removeFloatingNav();
          });
        }

        // Open the collapse sidebar submenu items when on touch devices 
        // - desktop only opens on hover
        function toggleTouchItem($element){
          $element
            .siblings('li')
            .removeClass('open')
            .end()
            .toggleClass('open');
        }

        // Handles hover to open items under collapsed menu
        // ----------------------------------- 
        function toggleMenuItem($listItem, $sidebar) {

          removeFloatingNav();

          var ul = $listItem.children('ul');
          
          if( !ul.length ) return $();
          if( $listItem.hasClass('open') ) {
            toggleTouchItem($listItem);
            return $();
          }

          var $aside = $('.aside');
          var $asideInner = $('.aside-inner'); // for top offset calculation
          // float aside uses extra padding on aside
          var mar = parseInt( $asideInner.css('padding-top'), 0) + parseInt( $aside.css('padding-top'), 0);
          var subNav = ul.clone().appendTo( $aside );
          
          toggleTouchItem($listItem);

          var itemTop = ($listItem.position().top + mar) - $sidebar.scrollTop();
          var vwHeight = $win.height();

          subNav
            .addClass('nav-floating')
            .css({
              position: $rootScope.app.layout.isFixed ? 'fixed' : 'absolute',
              top:      itemTop,
              bottom:   (subNav.outerHeight(true) + itemTop > vwHeight) ? 0 : 'auto'
            });

          subNav.on('mouseleave', function() {
            toggleTouchItem($listItem);
            subNav.remove();
          });

          return subNav;
        }

        function removeFloatingNav() {
          $('.dropdown-backdrop').remove();
          $('.sidebar-subnav.nav-floating').remove();
          $('.sidebar li.open').removeClass('open');
        }
    }


})();


(function() {
    'use strict';

    angular
        .module('app.sidebar')
        .service('SidebarLoader', SidebarLoader);

    SidebarLoader.$inject = ['$http'];
    function SidebarLoader($http) {
        this.getMenu = getMenu;

        ////////////////

        function getMenu(onReady, onError) {
          var menuJson = 'server/sidebar-menu.json',
              menuURL  = menuJson + '?v=' + (new Date().getTime()); // jumps cache
            
          onError = onError || function() { alert('Failure loading menu'); };

          $http
            .get(menuURL)
            .success(onReady)
            .error(onError);
        }
    }
})();
(function() {
    'use strict';

    angular
        .module('app.sidebar')
        .controller('UserBlockController', UserBlockController);

    UserBlockController.$inject = ['$rootScope'];
    function UserBlockController($rootScope) {

        activate();

        ////////////////

        function activate() {
          $rootScope.user = {
            name:     localStorage.username,
            job:      localStorage.introduction,
            picture:  localStorage.photo
          };

          // Hides/show user avatar on sidebar
          $rootScope.toggleUserBlock = function(){
            $rootScope.$broadcast('toggleUserBlock');
          };

          $rootScope.userBlockVisible = false;
          
          $rootScope.$on('toggleUserBlock', function(/*event, args*/) {

            $rootScope.userBlockVisible = ! $rootScope.userBlockVisible;
            
          });
        }
    }
})();

(function() {
    'use strict';

    angular
        .module('app.translate')
        .config(translateConfig)
        ;
    translateConfig.$inject = ['$translateProvider'];
    function translateConfig($translateProvider){
  
      $translateProvider.useStaticFilesLoader({
          prefix : 'app/i18n/',
          suffix : '.json'
      });
      $translateProvider.preferredLanguage('en');
      $translateProvider.useLocalStorage();
      $translateProvider.usePostCompiling(true);

    }
})();
(function() {
    'use strict';

    angular
        .module('app.translate')
        .run(translateRun)
        ;
    translateRun.$inject = ['$rootScope', '$translate'];
    
    function translateRun($rootScope, $translate){

      // Internationalization
      // ----------------------

      $rootScope.language = {
        // Handles language dropdown
        listIsOpen: false,
        // list of available languages
        available: {
          'en':       '中文'
          // 'es_AR':    '英文'
        },
        // display always the current ui language
        init: function () {
          var proposedLanguage = $translate.proposedLanguage() || $translate.use();
          var preferredLanguage = $translate.preferredLanguage(); // we know we have set a preferred one in app.config
          $rootScope.language.selected = $rootScope.language.available[ (proposedLanguage || preferredLanguage) ];
        },
        set: function (localeId) {
          // Set the new idiom
          $translate.use(localeId);
          // save a reference for the current language
          $rootScope.language.selected = $rootScope.language.available[localeId];
          // finally toggle dropdown
          $rootScope.language.listIsOpen = ! $rootScope.language.listIsOpen;
        }
      };

      $rootScope.language.init();

    }
})();
/**=========================================================
 * Module: animate-enabled.js
 * Enable or disables ngAnimate for element with directive
 =========================================================*/

(function() {
    'use strict';

    angular
        .module('app.utils')
        .directive('animateEnabled', animateEnabled);

    animateEnabled.$inject = ['$animate'];
    function animateEnabled ($animate) {
        var directive = {
            link: link,
            restrict: 'A'
        };
        return directive;

        function link(scope, element, attrs) {
          scope.$watch(function () {
            return scope.$eval(attrs.animateEnabled, scope);
          }, function (newValue) {
            $animate.enabled(!!newValue, element);
          });
        }
    }

})();

/**=========================================================
 * Module: browser.js
 * Browser detection
 =========================================================*/

(function() {
    'use strict';

    angular
        .module('app.utils')
        .service('Browser', Browser);

    Browser.$inject = ['$window'];
    function Browser($window) {
      return $window.jQBrowser;
    }

})();

/**=========================================================
 * Module: clear-storage.js
 * Removes a key from the browser storage via element click
 =========================================================*/

(function() {
    'use strict';

    angular
        .module('app.utils')
        .directive('resetKey', resetKey);

    resetKey.$inject = ['$state', '$localStorage'];
    function resetKey ($state, $localStorage) {
        var directive = {
            link: link,
            restrict: 'A',
            scope: {
              resetKey: '@'
            }
        };
        return directive;

        function link(scope, element) {
          element.on('click', function (e) {
              e.preventDefault();

              if(scope.resetKey) {
                delete $localStorage[scope.resetKey];
                $state.go($state.current, {}, {reload: true});
              }
              else {
                $.error('No storage key specified for reset.');
              }
          });
        }
    }

})();

/**=========================================================
 * Module: fullscreen.js
 * Toggle the fullscreen mode on/off
 =========================================================*/

(function() {
    'use strict';

    angular
        .module('app.utils')
        .directive('toggleFullscreen', toggleFullscreen);

    toggleFullscreen.$inject = ['Browser'];
    function toggleFullscreen (Browser) {
        var directive = {
            link: link,
            restrict: 'A'
        };
        return directive;

        function link(scope, element) {
          // Not supported under IE
          if( Browser.msie ) {
            element.addClass('hide');
          }
          else {
            element.on('click', function (e) {
                e.preventDefault();

                if (screenfull.enabled) {
                  
                  screenfull.toggle();
                  
                  // Switch icon indicator
                  if(screenfull.isFullscreen)
                    $(this).children('em').removeClass('fa-expand').addClass('fa-compress');
                  else
                    $(this).children('em').removeClass('fa-compress').addClass('fa-expand');

                } else {
                  $.error('Fullscreen not enabled');
                }

            });
          }
        }
    }


})();

/**=========================================================
 * Module: load-css.js
 * Request and load into the current page a css file
 =========================================================*/

(function() {
    'use strict';

    angular
        .module('app.utils')
        .directive('loadCss', loadCss);

    function loadCss () {
        var directive = {
            link: link,
            restrict: 'A'
        };
        return directive;

        function link(scope, element, attrs) {
          element.on('click', function (e) {
              if(element.is('a')) e.preventDefault();
              var uri = attrs.loadCss,
                  link;

              if(uri) {
                link = createLink(uri);
                if ( !link ) {
                  $.error('Error creating stylesheet link element.');
                }
              }
              else {
                $.error('No stylesheet location defined.');
              }

          });
        }
        
        function createLink(uri) {
          var linkId = 'autoloaded-stylesheet',
              oldLink = $('#'+linkId).attr('id', linkId + '-old');

          $('head').append($('<link/>').attr({
            'id':   linkId,
            'rel':  'stylesheet',
            'href': uri
          }));

          if( oldLink.length ) {
            oldLink.remove();
          }

          return $('#'+linkId);
        }
    }

})();

/**=========================================================
 * Module: now.js
 * Provides a simple way to display the current time formatted
 =========================================================*/

(function() {
    'use strict';

    angular
        .module('app.utils')
        .directive('now', now);

    now.$inject = ['dateFilter', '$interval'];
    function now (dateFilter, $interval) {
        var directive = {
            link: link,
            restrict: 'EA'
        };
        return directive;

        function link(scope, element, attrs) {
          var format = attrs.format;

          function updateTime() {
            var dt = dateFilter(new Date(), format);
            element.text(dt);
          }

          updateTime();
          var intervalPromise = $interval(updateTime, 1000);

          scope.$on('$destroy', function(){
            $interval.cancel(intervalPromise);
          });

        }
    }

})();

/**=========================================================
 * Module: table-checkall.js
 * Tables check all checkbox
 =========================================================*/
(function() {
    'use strict';

    angular
        .module('app.utils')
        .directive('checkAll', checkAll);

    function checkAll () {
        var directive = {
            link: link,
            restrict: 'A'
        };
        return directive;

        function link(scope, element) {
          element.on('change', function() {
            var $this = $(this),
                index= $this.index() + 1,
                checkbox = $this.find('input[type="checkbox"]'),
                table = $this.parents('table');
            // Make sure to affect only the correct checkbox column
            table.find('tbody > tr > td:nth-child('+index+') input[type="checkbox"]')
              .prop('checked', checkbox[0].checked);

          });
        }
    }

})();

/**=========================================================
 * Module: trigger-resize.js
 * Triggers a window resize event from any element
 =========================================================*/
(function() {
    'use strict';

    angular
        .module('app.utils')
        .directive('triggerResize', triggerResize);

    triggerResize.$inject = ['$window', '$timeout'];
    function triggerResize ($window, $timeout) {
        var directive = {
            link: link,
            restrict: 'A'
        };
        return directive;

        function link(scope, element) {
          element.on('click', function(){
            $timeout(function(){
              $window.dispatchEvent(new Event('resize'));
            });
          });
        }
    }

})();

/**=========================================================
 * Module: utils.js
 * Utility library to use across the theme
 =========================================================*/

(function() {
    'use strict';

    angular
        .module('app.utils')
        .service('Utils', Utils);

    Utils.$inject = ['$window', 'APP_MEDIAQUERY'];
    function Utils($window, APP_MEDIAQUERY) {

        var $html = angular.element('html'),
            $win  = angular.element($window),
            $body = angular.element('body');

        return {
          // DETECTION
          support: {
            transition: (function() {
                    var transitionEnd = (function() {

                        var element = document.body || document.documentElement,
                            transEndEventNames = {
                                WebkitTransition: 'webkitTransitionEnd',
                                MozTransition: 'transitionend',
                                OTransition: 'oTransitionEnd otransitionend',
                                transition: 'transitionend'
                            }, name;

                        for (name in transEndEventNames) {
                            if (element.style[name] !== undefined) return transEndEventNames[name];
                        }
                    }());

                    return transitionEnd && { end: transitionEnd };
                })(),
            animation: (function() {

                var animationEnd = (function() {

                    var element = document.body || document.documentElement,
                        animEndEventNames = {
                            WebkitAnimation: 'webkitAnimationEnd',
                            MozAnimation: 'animationend',
                            OAnimation: 'oAnimationEnd oanimationend',
                            animation: 'animationend'
                        }, name;

                    for (name in animEndEventNames) {
                        if (element.style[name] !== undefined) return animEndEventNames[name];
                    }
                }());

                return animationEnd && { end: animationEnd };
            })(),
            requestAnimationFrame: window.requestAnimationFrame ||
                                   window.webkitRequestAnimationFrame ||
                                   window.mozRequestAnimationFrame ||
                                   window.msRequestAnimationFrame ||
                                   window.oRequestAnimationFrame ||
                                   function(callback){ window.setTimeout(callback, 1000/60); },
            /*jshint -W069*/
            touch: (
                ('ontouchstart' in window && navigator.userAgent.toLowerCase().match(/mobile|tablet/)) ||
                (window.DocumentTouch && document instanceof window.DocumentTouch)  ||
                (window.navigator['msPointerEnabled'] && window.navigator['msMaxTouchPoints'] > 0) || //IE 10
                (window.navigator['pointerEnabled'] && window.navigator['maxTouchPoints'] > 0) || //IE >=11
                false
            ),
            mutationobserver: (window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver || null)
          },
          // UTILITIES
          isInView: function(element, options) {
              /*jshint -W106*/
              var $element = $(element);

              if (!$element.is(':visible')) {
                  return false;
              }

              var window_left = $win.scrollLeft(),
                  window_top  = $win.scrollTop(),
                  offset      = $element.offset(),
                  left        = offset.left,
                  top         = offset.top;

              options = $.extend({topoffset:0, leftoffset:0}, options);

              if (top + $element.height() >= window_top && top - options.topoffset <= window_top + $win.height() &&
                  left + $element.width() >= window_left && left - options.leftoffset <= window_left + $win.width()) {
                return true;
              } else {
                return false;
              }
          },
          
          langdirection: $html.attr('dir') === 'rtl' ? 'right' : 'left',

          isTouch: function () {
            return $html.hasClass('touch');
          },

          isSidebarCollapsed: function () {
            return $body.hasClass('aside-collapsed');
          },

          isSidebarToggled: function () {
            return $body.hasClass('aside-toggled');
          },

          isMobile: function () {
            return $win.width() < APP_MEDIAQUERY.tablet;
          }

        };
    }
})();

(function() {
    'use strict';

    angular
        .module('custom', [
            // request the the entire framework
            'angle',
            // or just modules
            'app.core',
            'app.sidebar'
            /*...*/
        ]);
})();

(function() {
    'use strict';

    angular
        .module('auth.login', [
            'angle'
        ]);
})();


(function() {
    'use strict';

    angular
        .module('auth.noAuth', [
            'angle'
        ]);
})();

(function() {
    'use strict';

    angular
        .module('app.tags', [
            'angle'
        ]);
})();
(function() {
    'use strict';

    angular
        .module('app.users', [
            'angle'
        ]);
})();
(function() {
    'use strict';

    angular
        .module('app.themes', [
            'angle'
        ]);
})();

// To run this code, edit file index.html or index.jade and change
// html data-ng-app attribute from angle to myAppName
// ----------------------------------------------------------------------

(function() {
    'use strict';

    angular
        .module('custom')
        .controller('Controller', Controller);

    Controller.$inject = ['$log'];
    function Controller($log) {
        // for controllerAs syntax
        // var vm = this;

        activate();

        ////////////////

        function activate() {
          $log.log('I\'m a line from custom.js');
        }
    }
})();


(function() {
    'use strict';

    angular
        .module('auth.login')
        .controller('LoginController', LoginController);

    LoginController.$inject = ['$log', '$mdDialog', '$mdToast', 'AuthService', '$state', '$httpProvider'];
    
    function LoginController($log, $mdDialog, $mdToast, AuthService, $state, $httpProvider) {
	
		var vm = this;

        vm.account = {
            username: '',
            password: ''
        };

        localStorage.rememberMe = typeof localStorage.rememberMe == 'undefined' || localStorage.rememberMe == 'false' ? false : localStorage.rememberMe;

        vm.rememberMe = localStorage.rememberMe == 'true' ? true : false;

        if(localStorage.rememberMe === 'true') {
            vm.account.username = localStorage.email;
            vm.account.password = localStorage.password;
        }

        vm.logout = function() {
            AuthService.logout()
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

                AuthService.clearAfterLogout();
                delete $httpProvider.defaults.headers.common['Authorization'];
                $state.go('app.login');
            })
            .error(function(res) {
                var toast = $mdToast.simple()
                    .content('出错了，错误代码：' + status)
                    .action('我知道了')
                    .highlightAction(false)
                    .position('top right');
                $mdToast.show(toast).then(function() {
                });
            });;
        };

		vm.loginIn = function() {

            if(vm.account.username == '') {
                var toast = $mdToast.simple()
                    .content('请填写用户名')
                    .action('确定')
                    .highlightAction(false)
                    .position('top right');
                $mdToast.show(toast).then(function() {
                    // $state.go(pathTo);
                });
                return false;
            }

            if(vm.account.password == '') {
                var toast = $mdToast.simple()
                    .content('请填写密码')
                    .action('确定')
                    .highlightAction(false)
                    .position('top right');
                $mdToast.show(toast).then(function() {
                    // $state.go(pathTo);
                });
                return false;
            }

            AuthService.login(vm.account.username, vm.account.password)
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

                var userData = res.data;

                sessionStorage.isFromLoginPage = true;

                AuthService.parseUserInfo(userData);

                if(vm.rememberMe) {
                    localStorage.rememberMe = true;
                    localStorage.email = vm.account.username;
                    localStorage.password = vm.account.password;
                }

                $httpProvider.defaults.headers.common['Authorization'] = 'Basic ' + localStorage.accessToken;

                if(localStorage.isRoot == 'false') {
                    $state.go('auth.noAuth');
                }else {
                    $state.go('app.welcome');
                }

            })
            .error(function(res) {
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

})();

 
(function() {
    'use strict';

    angular
        .module('auth.login')
        .service('AuthService', AuthService);

    AuthService.$inject = ['$http', '$rootScope', '$resource'];

    function AuthService($http, $rootScope, $resource) {

      return {

        login: function(email, password) {
          return $http.get($rootScope.app.baseUrl + 'user/login/' + email + '/' + password);
        },

        clearAfterLogout: function() {
          localStorage._id = undefined;
          if(localStorage.rememberMe != 'true') {
            localStorage.email = undefined;
            localStorage.password = undefined;
          }
          localStorage.accessToken = undefined;
          localStorage.photo = undefined;
          localStorage.group = undefined;
          localStorage.login = false;
          localStorage.auth = false;
          localStorage.isRoot = false;
          localStorage.userData = undefined;
          localStorage.username = undefined;
        },

        logout: function() {
          return $http.get($rootScope.app.baseUrl + 'user/logout');
        },

        parseUserInfo: function(userData) {

          var isValid = false;

          if(typeof userData == 'string') {
            if(userData != '') {
              localStorage.userData = userData;
              userData = JSON.parse(userData);              
              isValid = true;
            }
          }else {
            localStorage.userData = JSON.stringify(userData);
            isValid = true;
          }

          if(!isValid) {
            return false;
          }

          localStorage._id = userData._id;
          localStorage.username = userData.username;
          localStorage.password = userData.password;
          localStorage.accessToken = userData.accessToken;
          localStorage.photo = userData.photo;
          localStorage.group = JSON.stringify(userData.group);
          localStorage.login = true;

          var group = localStorage.group;
           
          if(group == 'undefined' || group == undefined) {
            localStorage.auth = false;
            localStorage.isRoot = false;
          }else {
            group = JSON.parse(group);

            var isRoot = false;

            for (var i = 0; i < group.length; i++) {
              var g = group[i];
              if(g.name === 'root' && g.code === '100') {
                isRoot = true;
                break;
              }
            };

            if(isRoot) {
              localStorage.auth = true;
              localStorage.isRoot = true;
            }

          }

        }

      }

    }

})();


(function() {
    'use strict';

    angular
        .module('auth.noAuth')
        .controller('NoAuthController', NoAuthController);

    NoAuthController.$inject = ['$log', '$mdDialog', '$mdToast', 'AuthService', '$state'];
    
    function NoAuthController($log, $mdDialog, $mdToast, AuthService, $state) {

    	var vm = this;

    	vm.isLogin = typeof localStorage.login == 'undefined' || localStorage.login == 'false' ? false : true;

    	vm.logout = function() {

    		AuthService.logout()
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

                AuthService.clearAfterLogout();

                $state.go('app.login');
            })
            .error(function(res) {
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

})();


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
            vm.isDeletedSelectAll = false;

            vm.tagsSelectedList =[]; 
            vm.tagsSelected = {};

            vm.tagsDeletedSelectedList = [];
            vm.tagsDeletedSelected = {};

            vm.dtOptions = DTOptionsBuilder.newOptions().withPaginationType('full_numbers');
            vm.dtColumnDefs = [
                DTColumnDefBuilder.newColumnDef(0),
                DTColumnDefBuilder.newColumnDef(1),
                DTColumnDefBuilder.newColumnDef(2),
                DTColumnDefBuilder.newColumnDef(3).notSortable()
            ];

            vm.getAll = function() {
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
            }

            vm.getAllDeleted = function() {
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
            }

            vm.getAll();
            vm.getAllDeleted();

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

                if(vm.tagsSelected[id]) {
                    vm.tagsSelected[id] = true;
                    vm.tagsSelectedList.push(id);
                }else {
                    vm.tagsSelected[id] = false;
                    vm.tagsSelectedList.splice(vm.tagsSelectedList.indexOf(id), 1);
                }
            }

            vm.toggleSelectAllDeleted = function() {

                if(!vm.isDeletedSelectAll) {
                    //取消全选
                    for (var i = 0; i < vm.tagsDeletedList.length; i++) {
                        var tag = vm.tagsDeletedList[i];
                        vm.tagsDeletedSelected[tag._id] = false;
                        vm.isDeletedSelectAll = false;
                    };
                    vm.tagsDeletedSelectedList = [];
                }else {
                    //选择全部
                    vm.tagsDeletedSelectedList = [];
                    for (var i = 0; i < vm.tagsDeletedList.length; i++) {
                        var tag = vm.tagsDeletedList[i];
                        vm.tagsDeletedSelected[tag._id] = true;
                        vm.tagsDeletedSelectedList.push(tag._id);
                        vm.isDeletedSelectAll = true;
                    };
                }

            };

            vm.selectThisDeletedTag = function(id) {

                if(vm.tagsDeletedSelected[id] == undefined) {
                    vm.tagsDeletedSelected[id] = false;
                }

                if(vm.tagsDeletedSelected[id]) {
                    vm.tagsDeletedSelected[id] = true;
                    vm.tagsDeletedSelectedList.push(id);
                }else {
                    vm.tagsDeletedSelected[id] = false;
                    vm.tagsDeletedSelectedList.splice(vm.tagsDeletedSelectedList.indexOf(id), 1);
                }

                console.log(vm.tagsDeletedSelectedList);
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
                            var tagsSelectedLength = vm.tagsSelectedList.length;
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

                                    if(key == tagsSelectedLength - 1) {
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
                            vm.tagsDeletedSelected[tm._id] = true;
                            vm.tagsDeletedSelectedList.push(tm._id);
                        }

                        var tagsDeletedSelectedLength = vm.tagsDeletedSelectedList.length;

                        vm.tagsDeletedSelectedList.forEach(function(id, key) {
                            TagService.unRemove(id)
                            .success(function(res, status, headers, config) {
                                var toast = $mdToast.simple()
                                      .content(res.message)
                                      .action('我知道了')
                                      .highlightAction(false)
                                      .position('top right');
                                $mdToast.show(toast).then(function() {
                                });

                                if(key == tagsDeletedSelectedLength - 1) {
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

 
(function() {
    'use strict';

    angular
        .module('app.tags')
        .service('TagService', TagService);

    TagService.$inject = ['$http', '$rootScope', '$resource'];

    function TagService($http, $rootScope, $resource) {

      return {

        getAll: function(page, count) {
          return $http.get($rootScope.app.baseUrl + 'tags/select/all');
        },

        getDeleted: function(page, count) {
          return $http.get($rootScope.app.baseUrl + 'tags/select/removed');
        },

        remove: function(id) {
          return $http.get($rootScope.app.baseUrl + 'tags/remove/' + id);
        },

        update: function(id, name, description) {
          return $http.get($rootScope.app.baseUrl + 'tags/update/' + id + '/' + name + '/' + description);          
        },

        unRemove: function(id) {
          return $http.get($rootScope.app.baseUrl + 'tags/unremove/' + id);
        }

      }

    }

})();



(function() {
    'use strict';

    angular
        .module('app.users')
        .controller('UsersController', UsersController);

    UsersController.$inject = ['$log', '$mdDialog', '$scope', '$resource', 'DTOptionsBuilder', 'DTColumnDefBuilder', '$http', 'UserService', '$mdToast', 'MOptions', 'ThemeService'];
    function UsersController($log, $mdDialog, $scope, $resource, DTOptionsBuilder, DTColumnDefBuilder, $http, UserService, $mdToast, MOptions, ThemeService) {
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

                        }, function() {
                            //取消
                            if(index != undefined) {
                                vm.unSelectThisById(ur._id, vm.removedUser);
                            }
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
                            vm.selecteThisById(ur._id, vm.blockedUser);
                        }

                        var length = vm.blockedUser.selectedList.length;

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

                            vm.blockedUser.selectedList.forEach(function(id, key) {

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
                                vm.unSelectThisById(ur._id, vm.blockedUser);
                            }
                        });

                    }
                }]
            }

        }
    }

})();

 
(function() {
    'use strict';

    angular
        .module('app.users')
        .service('UserService', UserService);

    UserService.$inject = ['$http', '$rootScope', '$resource'];

    function UserService($http, $rootScope, $resource) {

      return {

        getAll: function(page, count) {
          return $http.get($rootScope.app.baseUrl + 'user/select/all/' + page + '/' + count);
        },

        getUserDeleted: function(page, count) {
          return $http.get($rootScope.app.baseUrl + 'user/select/deleted/' + page + '/' + count);
        },

        getUserBlocked: function(page, count) {
          return $http.get($rootScope.app.baseUrl + 'user/select/blocked/' + page + '/' + count);
        },

        blockUser: function(postData) {
          return $http.post($rootScope.app.baseUrl + 'user/block', postData, {});
        },

        deleteUser: function(postData) {
          return $http.post($rootScope.app.baseUrl + 'user/delete', postData, {});
        },

        unDeleteUser: function(postData) {
          return $http.post($rootScope.app.baseUrl + 'user/undelete', postData, {});
        },

        unBlockUser: function(postData) {
          return $http.post($rootScope.app.baseUrl + 'user/unblock', postData, {});
        },

        getRelations: function(uid, page, count) {
          return $http.get($rootScope.app.baseUrl + 'relations/select/' + uid + '/' + page + '/' + count);          
        },

        getThemes: function(uid, page, count) {
          return $http.get($rootScope.app.baseUrl + 'themes/get/' + uid + '/' + page + '/' + count);          
        },

        removeUserByUid: function(uid) {
          return $http.get($rootScope.app.baseUrl + 'user/delete/' + uid);          
        },

        unRemoveUserByUid: function(uid) {
          return $http.get($rootScope.app.baseUrl + 'user/unRemove/' + uid);          
        },

        blockUserByUid: function(uid) {
          return $http.get($rootScope.app.baseUrl + 'user/block/' + uid);          
        },

        unBlockUserByUid: function(uid) {
          return $http.get($rootScope.app.baseUrl + 'user/unblock/' + uid);          
        }

      }

    }

})();



(function() {
    'use strict';

    angular
        .module('app.themes')
        .controller('ThemesController', ThemesController);

    ThemesController.$inject = ['$log', '$mdDialog', '$mdToast', 'ThemeService', 'DTOptionsBuilder', 'DTColumnDefBuilder', 'MOptions'];
    function ThemesController($log, $mdDialog, $mdToast, ThemeService, DTOptionsBuilder, DTColumnDefBuilder, MOptions) {
        // for controllerAs syntax
        var vm = this;

        activate();

        activateTable();

        MOptions.init(vm, ['element', 'elementDeleted']);

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

            vm.getAll = function() {

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
            }

            vm.getDeleted = function() {

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

            vm.getAll();
            vm.getDeleted();

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
                        }, function() {
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

                        if(index != undefined) {
                            vm.selecteThisById(tm._id, vm.element);
                        }

                        $mdDialog.show(confirm).then(function() {
                            //确定

                            var selectedListLength = vm.element.selectedList.length;

                            vm.element.selectedList.forEach(function(id, key) {

                                ThemeService.remove(id)
                                .success(function(res, status, headers, config) {
                                    var toast = $mdToast.simple()
                                          .content(res.message)
                                          .action('我知道了')
                                          .highlightAction(false)
                                          .position('top right');
                                    $mdToast.show(toast).then(function() {
                                    });

                                    if(key == selectedListLength - 1) {
                                        vm.getAll();
                                        vm.getDeleted();
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
                                vm.unSelectThisById(tm._id, vm.element);
                            }
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

                        if(index != undefined) {
                            vm.selecteThisById(tm._id, vm.elementDeleted);
                        }

                        var selectedListLength = vm.elementDeleted.selectedList.length;


                        vm.elementDeleted.selectedList.forEach(function(id, key) {

                            ThemeService.unRemove(id)
                            .success(function(res, status, headers, config) {
                                var toast = $mdToast.simple()
                                      .content(res.message)
                                      .action('我知道了')
                                      .highlightAction(false)
                                      .position('top right');
                                $mdToast.show(toast).then(function() {
                                });

                                if(key == selectedListLength - 1) {
                                    vm.getAll();
                                    vm.getDeleted();
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

 
(function() {
    'use strict';

    angular
        .module('app.themes')
        .service('ThemeService', ThemeService);

    ThemeService.$inject = ['$http', '$rootScope', '$resource'];

    function ThemeService($http, $rootScope, $resource) {

      return {

        getAll: function(page, count) {
          return $http.get($rootScope.app.baseUrl + 'themes/select/all/' + page + '/' + count);
        },

        getDeleted: function(page, count) {
          return $http.get($rootScope.app.baseUrl + 'themes/select/removed/' + page + '/' + count);
        },

        remove: function(id) {
          return $http.get($rootScope.app.baseUrl + 'themes/remove/' + id);
        },

        unRemove: function(id) {
          return $http.get($rootScope.app.baseUrl + 'themes/unremove/' + id, {});
        }

      }

    }

})();
