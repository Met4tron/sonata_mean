var app = angular.module('fileUpload', ['ngFileUpload']);

app.controller('formCtrl', ['$scope', '$http', '$window', 'Upload', function ($scope, $http, $window, Upload) {

    $scope.refresh = function () {
        $http.get('/uploads').then(function (response) {
            console.log(response.data);
            $scope.uploads = response.data;
        });
    }

    $scope.refresh();

    $scope.delete = function (uuid) {
        console.log(uuid);
        $http.delete(uuid)
            .then(function (response) {
                console.log(response.status);
                $scope.refresh();
            })
            .catch(function (err) {
                console.log("Errors foram encontrados: "+err);
            })

            $scope.refresh();
    };

    $scope.submit = function () {
        Upload.upload({
            url: '/uploads',
            method: 'post',
            data: $scope.upload
        }).then(function (response) {
            $scope.uploads.push(response.data);
            $scope.upload = {};
        }).catch(function (err) {
            console.log(err);
        });
    };
}]);