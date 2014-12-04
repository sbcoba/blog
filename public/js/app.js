/**
 * Created by 동준 on 2014-11-14.
 */
angular.module('johayo', [
    "ngRoute",
    'ngResource',
    'ngAnimate',
    "errorHandler",
    "interceptor",
    "johayo.controller",
    "johayo.service",
    "johayo.directive",
    "johayo.filter",
    "ngDialog",
    'textAngular',
    "mgcrea.ngStrap"
])
    .config(['$httpProvider', function($httpProvider) {
        $httpProvider.responseInterceptors.push('securityInterceptor');
    }]).config(['$routeProvider', '$locationProvider', function($routeProvider,$locationProvider) {
        $routeProvider
            .when('/', {
                templateUrl: '/html/main/main.html',
                controller: 'mainController'
            })
            .when('/profile', {
                templateUrl: '/html/board/boardDetail.html',
                controller: 'boardController'
            })
            .when('/adminMenu', {
                templateUrl: '/html/menu/adminMenu.html',
                controller: 'adminMenuController',
                resolve : {
                    menuList : function(menuService, loginService){
                        return  loginService.getCheckLogin().then(function(){
                            return menuService.getMenuList()
                                .then(function(menu){
                                    return menu;
                                });
                        });
                    }
                }
            })
            .when('/board/:division', {
                templateUrl: '/html/board/board.html',
                controller: 'boardController',
                resolve : {
                    boardList : function(boardService, $route){
                        boardService.list($route.current.params.division).then(function(data){
                            return data;
                        });
                    }
                }
            })
            .when('/board/:firstDivision/:division', {
                templateUrl: '/html/board/board.html',
                controller: 'boardController',
                resolve : {
                    boardList : function(boardService, $route){
                        boardService.list($route.current.params.division).then(function(data){
                            return data;
                        });
                    }
                }
            })
            .when('/board/:firstDivision/:division/:seq', {
                templateUrl: '/html/boardDetail.html',
                controller: 'boardDetailController',
                resolve : {
                    boardDetail : function(boardService, $route){
                        boardService.detail($route.current.params.seq).then(function(data){
                            return data;
                        });
                    }
                }
            })
        ;
    }]);

angular.module('johayo.controller', []);

angular.module('johayo.service', []);

angular.module('johayo.directive', []);