/**
 * Created by 동준 on 2014-11-14.
 */
angular.module('johayo.controller')
    .controller('mainController', ['$scope', "boardList",
        function($scope, boardList){
            $scope.boardList = boardList;
        }]);