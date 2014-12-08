/**
 * Created by 동준 on 2014-11-27.
 */
angular.module('johayo.controller')
    .controller('commentController', ['$scope', 'commentService',
        function($scope, commentService){
            /* 댓글 달때 씀 */
            $scope.comment = {};
            /* sub댓글 달때 쓴다. */
            $scope.sub = {};
            /* 서브 댓글 등록시 editor를 보이게 할지 설정 */
            $scope.showWriteSubBox = {};
            /* 댓글 수정시 글을 안보이고 editor를 보이게 할지 설정 */
            $scope.isShowEditor = {};
            /* 댓글의 서브 댓글을 수정시 editer를 보이게 할지 설정 */
            $scope.isShowSubEditor = {};

            /* sub 댓글 달때 쓰는 param들 */
            $scope.subParams = {
                division: 'sub',
                boardSeq: $scope.boardDetail._id
            };

            /* 댓글 등록 */
            $scope.addComment = function(){
                commentService.addComment($scope.boardDetail._id, $scope.comment.content, $scope.comment.name, $scope.comment.pw)
                    .then(function(data){
                        $scope.boardDetail = data;
                        $scope.comment = {};
                    });
            };

            /* 댓글 수정 */
            $scope.editComment = function(commentDetail){
                commentService.editComment($scope.boardDetail._id, commentDetail.seq, commentDetail.content, commentDetail.pw)
                    .then(function(data){
                        $scope.closeEditor();
                        $scope.boardDetail = data;
                        $scope.showWriteBox = false;
                    });
            };

            /* 댓글 삭제 */
            $scope.deleteComment = function(commentSeq, pw){
                commentService.deleteComment($scope.boardDetail._id, commentSeq, pw)
                    .then(function(data){
                        $scope.boardDetail = data;
                    });
            };

            /* sub 댓글 등록 */
            $scope.addSubComment = function(commentSeq, sub){
                $scope.subParams.commentSeq = commentSeq;
                $scope.subParams.content = sub.content;
                $scope.subParams.name = sub.name;
                $scope.subParams.pw = sub.pw;

                commentService.addSubComment($scope.subParams)
                    .then(function(data){
                        $scope.boardDetail = data;
                        sub.pw = {};
                    });
            };

            /* sub 댓글 수정 */
            $scope.editSubComment = function(commentSeq, commentSub){
                $scope.subParams.commentSeq = commentSeq;
                $scope.subParams.subSeq = commentSeq.seq;
                $scope.subParams.content = commentSub.content;
                $scope.subParams.pw = commentSub.pw;

                commentService.editSubComment($scope.subParams)
                    .then(function(){
                        $scope.closeEditor();
                        commentSub.pw={};
                    });
            };

            /* sub 댓글 삭제 */
            $scope.deleteSubComment = function(commentSeq, subSeq){
                $scope.subParams.commentSeq = commentSeq;
                $scope.subParams.subSeq = subSeq;
                commentService.deleteSubComment($scope.subParams)
                    .then(function(data){

                    });
            };

            /* 유효성 체크 */
            $scope.checkVal = function(val){
                var checkContent = true;
                if(!!val.content){
                    checkContent = val.content.replace(/(<([^>]+)>)/ig,"") == ''
                }
                return checkContent || (!$scope.isLogin && (!val.name || !val.pw));
            };

            /* 댓글 수정시 다른 곳의 댓글들의 editor 연것을 안보이게 하고 해당 부분을 보이게 한다. */
            $scope.showEditor = function(seq, subSeq){
                $scope.showWriteBox = true;
                if(!!subSeq){
                    if(!$scope.isShowSubEditor[seq+'-'+subSeq]){
                        $scope.closeEditor();
                        $scope.isShowSubEditor[seq+'-'+subSeq] = true;
                    }else{
                        $scope.closeEditor();
                    }
                }else{
                    if(!$scope.isShowEditor[seq]){
                        $scope.closeEditor();
                        $scope.isShowEditor[seq] = true;
                    }else{
                        $scope.closeEditor();
                    }
                }
            };

            /* 서브 댓글 등록 박스 */
            $scope.isShowWriteSubBox = function(seq){
                $scope.showWriteBox = true;
                if($scope.showWriteSubBox[seq]){
                    $scope.closeEditor();
                }else{
                    $scope.closeEditor();
                    $scope.showWriteSubBox[seq] = true;
                }
            };

            /* 댓글 다 닫기 */
            $scope.closeEditor = function(){
                if(!!$scope.boardDetail.commentList){
                    for(var i=0;i<$scope.boardDetail.commentList.length;i++){
                        $scope.isShowEditor[$scope.boardDetail.commentList[i].seq] = false;
                        $scope.showWriteSubBox[$scope.boardDetail.commentList[i].seq] = false;
                        if(!!$scope.boardDetail.commentList[i].sub){
                            for(var j=0;j < $scope.boardDetail.commentList[i].sub.length;j++){
                                $scope.isShowSubEditor[$scope.boardDetail.commentList[i].seq+ '-' + $scope.boardDetail.commentList[i].sub[j].seq] = false;
                            }
                        }
                    }
                }
            };
        }]);