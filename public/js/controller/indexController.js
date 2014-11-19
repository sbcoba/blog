/**
 * Created by 동준 on 2014-11-14.
 */
angular.module('johayo.controller')
    .controller('indexController', ['$rootScope', '$scope', 'loginService', 'errorService',
        function($rootScope, $scope, loginService, errorService){
            $scope.loginInfo = loginService.loginInfo;
            /* 윈도우 창의 크기를 체크 */
            $scope.windowSize = {};

            $scope.openLogin = function(){
                loginService.openLogin();
            };

            $scope.logout = function(){
                loginService.logout();
            };

            /**
             * 사이드 메뉴를 보일지 말지 체크한다.
             * 사이즈가 작았을때는 메뉴가 아닌 본문을 클릭스 보이지 않게 한다.
             */
            $scope.checkHideMenu = function(){
                windowSizeHideMenu();
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
                /* 윈도우 창에 따른 메뉴 보이기 안보이기 체크 */
                windowSizeHideMenu();
            });

            function windowSizeHideMenu(){
                /* 윈도우 창에 따른 메뉴 보이기 안보이기 체크 */
                if($scope.windowSize.w < 1000){
                    $scope.hideMenu = false;
                }
            }
        }]);