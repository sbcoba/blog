/**
 * Created by 동준 on 2014-11-14.
 */
angular.module('johayo.controller')
    .controller('menuController', ['$rootScope', '$scope', 'menuService', '$location',
        function($rootScope, $scope, menuService, $location){
            menuService.getMenuList().then(function(data){
                $scope.menuList = data;
                console.log(data);
            });

            /* 라우터가 바뀔때마다 체크 */
            $rootScope.$on("$routeChangeSuccess", function(){
                var divisionList = $location.path().split('/');

            });

            /* 메뉴를 클릭스 active를 옮겨준다. */
            $scope.moveActive = function(name) {
                $scope.activeMenu = name;
            };

            /* active 해야되는 메뉴를 바꺼준다.. */
            $scope.isActive = function(name){
                return {
                    'active': $scope.checkActive(name)
                }
            };

            /* 선택된 메뉴와 현재 메뉴를 비교해서 알려준다. */
            $scope.checkActive = function(name){
                return $scope.activeMenu == name;
            };

            /* step2의 메뉴를 체크하여 보여준다. */
            $scope.isSubActive = function(name){
                return {
                    'active' : $scope.activeSubMenu == name
                }
            };
        }]);