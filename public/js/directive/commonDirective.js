/**
 * Created by 동준 on 2014-11-17.
 */
angular.module('johayo.directive')
    .directive('headerMenuScrolly', function($window){
        return {
            restrict: 'A',
            scope : {
                scrollSize : "="
            },
            link: function (scope, element, attrs) {
                angular.element($window).bind("scroll", function() {
                    scope.scrollSize = this.pageXOffset;
                    scope.$apply();
                });
            }
        }
    })
    /*.directive('windowWidthCheck', function($window){
        return {
            restrict: 'A',
            scope : {
                windowSize : "="
            },
            link: function (scope, element, attrs) {
                var w = angular.element($window);
                scope.getWindowDimensions = function () {
                    return {
                        'h': w.height(),
                        'w': w.width()
                    };
                };

                scope.$watch(scope.getWindowDimensions, function(data){
                    scope.windowSize = data;
                }, true);

                w.bind('resize', function () {
                    scope.$apply();
                });
            }
        }
    })*/
;