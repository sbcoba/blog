/**
 * Created by 동준 on 2014-11-27.
 */
angular.module('johayo.controller')
    .controller('commentController', ['$scope',
        function($scope){
            /* 댓글 수정시 글을 안보이고 editor를 보이게 할지 설정 */
            $scope.isShowEditor = {};

            /* 댓글 설정 부분. 삭제와 수정을 넣는다. */
            $scope.commentDrop = function (seq){
                return [
                    {text: '<i class="glyphicon glyphicon-pencil"></i> Update', click: 'showEditor('+seq+')'},
                    {text: '<i class="glyphicon glyphicon-remove"></i> Delete', click: 'commentDelete('+seq+')'}
                ];
            };

            /* 댓글 수정시 다른 곳의 댓글들의 editor 연것을 안보이게 하고 해당 부분을 보이게 한다. */
            $scope.showEditor = function(seq){
                $scope.showWriteBox = false;
                $scope.isShowEditor[seq] = true;
            };

            $scope.closeEditor = function(){
                for(var i=0;i<$scope.commentList.length;i++){
                    $scope.isShowEditor[$scope.commentList[i].seq] = false;
                }
            };

            $scope.editCt = function(event){
                if(event.keyCode === 27){
                    $scope.closeEditor();
                }
            };
        }]);