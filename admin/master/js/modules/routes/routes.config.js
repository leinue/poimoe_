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
        $urlRouterProvider.otherwise('/app/welcome');

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
            templateUrl: helper.basepath( 'data/users.html' )
          })
          .state('app.themesmgr', {
            url: '/themes',
            title: '投稿管理',
            templateUrl: helper.basepath( 'data/themes.html' )
          })
          .state('app.tagsmgr', {
            url: '/tags',
            title: '标签管理',
            templateUrl: helper.basepath( 'data/tags.html' )
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

