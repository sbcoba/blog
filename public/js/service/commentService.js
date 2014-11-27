/**
 * Created by 동준 on 2014-11-27.
 */
angular.module("johayo.service")
    .factory("commentService", ['$resource', '$q',
        function($resource, $q){
            var boardApi = {
                list : $resource('/api/board/list/:division',{division:'@division'},{'query': {method: 'GET', isArray:true}}),
                url : $resource('/api/board/:seq',{seq:'@seq'},{'get': {method: 'GET', 'update': {method:'PUT'}}})
            };

            var service = {
                list : function(division){
                    var asy = $q.defer();
                    boardApi.list.query({division : division},
                        function(data){
                            asy.resolve(data);
                        });
                    return asy.promise;
                },
                detail : function(seq){
                    var asy = $q.defer();
                    boardApi.url.get({seq : seq},
                        function(data){
                            asy.resolve(data);
                        });
                    return asy.promise;
                },
                save : function(title, content, division){
                    var asy = $q.defer();
                    boardApi.url.save({title: title, content: content, division: division}, function(){
                        asy.resolve(data);
                    });
                    return asy.promise;
                },
                update : function(seq, title, content){
                    var asy = $q.defer();
                    boardApi.url.update({title: title, content: content, seq: seq}, function(){
                        asy.resolve(data);
                    });
                    return asy.promise;
                },
                delete : function(seq){
                    var asy = $q.defer();
                    boardApi.url.delete({seq: seq}, function(){
                        asy.resolve(data);
                    });
                    return asy.promise;
                }
            };

            return service;
        }]);