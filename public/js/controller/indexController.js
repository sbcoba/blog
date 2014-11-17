/**
 * Created by 동준 on 2014-11-14.
 */
angular.module('johayo.controller')
    .controller('indexController', ['$rootScope', '$scope', '$routeParams', '$location', '$window',
        function($rootScope, $scope, $routeParams, $location, $window){
            $scope.isLogin = true;

            $rootScope.$on("$routeChangeStart", function(){
                $scope.loading = true;
            });

            $rootScope.$on("$routeChangeSuccess", function(){
                $scope.loading = false;
                if($scope.windowSize.w < 768){
                    $scope.hideMenu = !$scope.hideMenu;
                }
            });
        }]);