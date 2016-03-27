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
          .state('app.roomsmgr', {
            url: '/rooms',
            title: '房间管理',
            templateUrl: helper.basepath( 'data/rooms.html' ),
            resolve: helper.resolveFor('datatables')
          })          //
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
          //
          // 权限管理 
          // -----------------------------------
          .state('app.authority', {
              url: '/authority',
              title: '登录',
              templateUrl: helper.basepath( 'authority/authority.html' )
          })
          .state('app.group', {
              url: '/group',
              title: '登录',
              templateUrl: helper.basepath( 'authority/group.html' )
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

