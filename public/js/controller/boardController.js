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
    .controller('boardAddController', ['$scope', 'boardService', 'menuList', 'fileService',
        function($scope, boardService, menuList, fileService){
            $scope.menuList = menuList;
            $scope.uploadFileList = new Array();
            $scope.selectedFiles = new Array();
            $scope.board = {};

            $scope.addBoard = function(){
                boardService.save($scope.board).then(function(){
                    alert('ok');
                });
            };

            $scope.onFileSelect = function($files) {
                for ( var i = 0; i < $files.length; i++) {
                    $scope.selectedFiles.push($files[i]);
                    var count = $scope.selectedFiles.length*1-1 ;
                    $scope.selectedFiles[count].isImg = $scope.selectedFiles[count].type.indexOf('image') < 0 ? false : true;
                    $scope.uploadFile(count);
                }
            };

            $scope.uploadFile = function(index){
                $scope.selectedFiles[index].progress = 0;
                fileService.fileUpload($scope.selectedFiles[index], 'board')
                    .then(function(data){
                        $scope.uploadFileList.push(data);
                    },function(data){
                        $scope.selectedFiles[index].progress = 0;
                        $scope.selectedFiles[index].error = data;
                    },function(evt){
                        $scope.selectedFiles[index].progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
                    });
            };

            $scope.deleteFile = function(index){
                $scope.uploadFileList[index].deleteYn = 'Y';
            };
        }]);