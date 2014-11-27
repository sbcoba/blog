/**
 * Created by 동준 on 2014-11-24.
 */
angular.module('johayo.directive')
    .directive('weatherBox', function($timeout){
        return {
            restrict: 'AE',
            replace: true,
            templateURL: '<div style="color: #ffffff;">' +
            '<div class="hero-circle">' +
            '<div class="hero-face">' +
            '<div id="hour" class="hero-hour" ng-style="moveHour"></div>' +
            '<div id="minute" class="hero-minute" ng-style="moveMinute"></div>' +
            '<div id="second" class="hero-second" ng-style="moveSecond"></div>' +
            '</div>' +
            '</div>' +
            '<div style="text-align: center;margin-top: 10px;font-size: 17px;font-weight: bolder;">{{nowDate}}</div>' +
            '<div style="text-align: center;font-size: 17px;font-weight: bolder;">{{nowTime}}</div>' +
            '</div>',
            scope : {
                location : "@"
            },
            controller: ["$scope", "$http", function ($scope, $http) {
                $http.get("http://weather.service.msn.com/data.aspx?weadegreetype=C&culture=ko-KR&weasearchstr=%EC%84%9C%EC%9A%B8").success(function(data){
                    console.log(data)
                });
            }]
        }
    });