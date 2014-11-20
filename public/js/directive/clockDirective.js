/**
 * Created by 동준 on 2014-11-20.
 */
angular.module('johayo.directive')
    .directive('analogClock', function($timeout){
        return {
            restrict: 'AE',
            replace: true,
            template: '<div style="color: #ffffff">' +
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
            link: function (scope, element, attrs) {
                var updateTime = function(){
                    var now = moment();
                    var second = now.seconds() * 6;
                    var minute = now.minutes() * 6 + second / 60;
                    var hour = ((now.hours() % 12) / 12) * 360 + 90 + minute / 12;
                    scope.moveHour = {'transform' : 'rotate('+hour+'deg)'};
                    scope.moveMinute = {'transform' : 'rotate('+minute+'deg)'};
                    scope.moveSecond = {'transform' : 'rotate('+second+'deg)'};
                    scope.nowDate = now.format('dddd, DD MMMM YYYY');
                    scope.nowTime = now.format('h:mm:ss a');
                    $timeout(updateTime, 1000);
                };

                updateTime();
            }
        }
    });