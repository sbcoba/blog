/**
 * Created by 동준 on 2014-12-05.
 */
angular.module("johayo.service")
    .factory("fileService", ['$http','$sce', '$q', '$upload', function($http, $sce, $q, $upload){
        var service = {
            fileUpload : function(file, division){
                var asy = $q.defer();
                $upload.upload({
                    url : '/api/file',
                    method: "post",
                    headers: {'my-header': 'my-header-value'},
                    file: file,
                    fileFormDataName: 'myFile'
                }).then(function(response) {
                    asy.resolve(response.data);
                }, function(response) {
                    asy.reject(response.data);
                }, function(evt) {
                    asy.notify(evt)
                });
                return asy.promise;
            },
            fileDelete : function(seq){
                var asy = $q.defer();
                $http.post('file/ajaxFileDelete',{seq : seq}).success(function(data){
                    if(data.err){ error(data.err); asy.reject(data.err); }
                    asy.resolve(data);
                }).error(function(){  asy.reject('실패');});
                return asy.promise;
            }
        }

        return service;
    }]);