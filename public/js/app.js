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
    "ngDialog",
    "mgcrea.ngStrap"
])
    .config(['$httpProvider', function($httpProvider) {
        $httpProvider.responseInterceptors.push('securityInterceptor');
    }]).config(['$routeProvider', '$locationProvider', function($routeProvider,$locationProvider) {
        $routeProvider
            .when('/', {
                templateUrl: '/html/main.html',
                controller: 'mainController'
            })
            .when('/:division', {
                templateUrl: '/html/main.html',
                controller: 'mainController'
            })
            .when('/:firstDivision/:division', {
                templateUrl: '/html/main.html',
                controller: 'mainController'
            });
    }]);

angular.module('johayo.controller', []);

angular.module('johayo.service', []);

angular.module('johayo.directive', []);