/**
 * Created by 동준 on 2014-11-14.
 */
angular.module('johayo.controller')
    .controller('indexController', ['$rootScope', '$scope', '$routeParams', '$location',
        function($rootScope, $scope, $routeParams, $location){
            $scope.hideMenu = false;

            $scope.isLogin = true;

            $scope.checkActiveMenu = function(){
                $scope.activeMenu = '';
                $scope.activeSuvMenu = '';
                if($routeParams.firstDivision){
                    $scope.activeMenu = $routeParams.firstDivision;
                    $scope.activeSuvMenu = $routeParams.division;
                }else if ($scope.activeSuvMenu = $routeParams.division) {
                    $scope.activeMenu = $routeParams.division;
                }else {
                    $scope.activeMenu = $location.path().replace('/', '');
                }
            };

            $rootScope.$on("$routeChangeStart", function(){
                $scope.loading = true;
            });

            $rootScope.$on("$routeChangeSuccess", function(){
                $scope.loading = false;
                $scope.checkActiveMenu();
            });
        }]);