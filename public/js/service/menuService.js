/**
 * Created by 동준 on 2014-11-17.
 */
angular.module("johayo.service")
    .factory("menuService", ['$http', '$q',
        function($http, $q){
            var service = {
                menuList : null,
                getMenuList : function(){
                    var asy = $q.defer();
                    if ( !!service.menuList ) {
                        asy.resolve(service.menuList);
                    } else {
                        $http.get('/api/menu').then(function(response) {
                            service.menuList = response.data;
                            asy.resolve(service.menuList);
                        });
                    }
                    return asy.promise;
                }
            };

            return service;
        }]);