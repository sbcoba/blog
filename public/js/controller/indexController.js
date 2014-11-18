/**
 * Created by 동준 on 2014-11-14.
 */
angular.module('johayo.controller')
    .controller('indexController', ['$rootScope', '$scope', 'loginService', 'errorService',
        function($rootScope, $scope, loginService, errorService){
            $scope.loginInfo = loginService.loginInfo;

            $scope.openLogin = function(){
                loginService.openLogin();
            };

            $scope.logout = function(){
                loginService.logout();
            };

            $rootScope.$on('getLoginInfo', function(){
                loginService.getLoginInfo().then(function(loginInfo){
                    $scope.loginInfo = loginInfo;
                    $scope.isLogin = loginService.isLogin();
                });
            });

            $rootScope.$on("$routeChangeStart", function(){
                $scope.loading = true;
            });

            $rootScope.$on("$routeChangeSuccess", function(){
                $scope.loading = false;
            });
        }]);