/**
 * Created by 동준 on 2014-11-25.
 */
angular.module('johayo.controller')
    .controller('boardController', ['$scope', 'boardService',
        function($scope, boardService){

            $scope.boardList = [
                {
                    "title": "Collapsible Group Item #1",
                    "regDt": "2011-01-01"
                },
                {
                    "title": "Collapsible Group Item #2",
                    "regDt": "2011-01-01"
                },
                {
                    "title": "Collapsible Group Item #3",
                    "regDt": "2011-01-01"
                },
                {
                    "title": "Collapsible Group Item #3",
                    "regDt": "2011-01-01"
                }
            ];
            $scope.activePanel = 0;

            $scope.getColor = function(index){
                return {
                    'list-group-item-success' : index % 4 == 0,
                    'list-group-item-warning' : index % 4 == 1,
                    'list-group-item-info' : index % 4 == 2,
                    'list-group-item-danger' : index % 4 == 3
                }
            }
        }])
    .controller('boardDetailController', ['$scope', 'boardService',
        function($scope, boardService){

        }])
    .controller('boardAddController', ['$scope', 'boardService',
        function($scope, boardService){

        }]);