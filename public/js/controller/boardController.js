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
    .controller('boardDetailController', ['$scope', '$timeout', 'boardService',
        function($scope, $timeout, boardService){
            $scope.showComment = false;

            $scope.commentList = [{
                seq : '1',
                name : '권동준',
                regDt : '2014-11-27 05:29',
                content : 'sdkljfbsdlfjknlkwefnweklfnweklfndjklsfvbsdkjfbnsdjkfbsdjkf',
                sub : [
                    {
                        seq : '1',
                        name : '권동준',
                        regDt : '2014-11-27 05:29',
                        content : '이런 저런 주정뱅이들!@ ㅋㅋ'
                    },
                    {
                        seq : '2',
                        name : '이런',
                        regDt : '2014-11-33 05:29',
                        content : '이런 저43543주정뱅이들!@ ㅋㅋ'
                    }
                ]
            }];

            /* 이게 모듈 버그 같은데 이거 안해주면 자꾸 밑에 먼가 보인다.. */
            $timeout(function(){
                $scope.showComment = true;
            }, 500);
        }]);