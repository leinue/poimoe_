
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


        }
    }
})();