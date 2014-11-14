/**
 * Created by 동준 on 2014-11-14.
 */
angular.module('johayo.directive')
    .directive('johayoMenu', function($window){
        return {
            restrict: 'A',
            templateUrl : '/html/tpls/sideMenu.html',
            scope : {
                hideMenu : '@',
                activeMenu : '@',
                activeSuvMenu : '@'
            },
            controller : 'menuController'
        }
    });