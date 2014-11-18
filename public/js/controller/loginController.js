/**
 * Created by 동준 on 2014-11-17.
 */
angular.module('johayo.controller')
    .controller('loginController', ['$scope', 'loginService', 'ngDialog',
        function($scope, loginService, ngDialog){
            loginService.logout();
            $scope.login = {};
            $scope.isErr = false;

            $scope.doLogin = function(){
                loginService.doLogin($scope.login).then(function(){
                    $scope.isErr = false;
                    ngDialog.close();
                }, function(err){
                    if(err){
                        $scope.isErr = true;
                        $scope.errorMsg = err;
                    }
                });
            };

        }]);