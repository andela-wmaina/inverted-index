 app.controller('MainController', ['$scope', 'fileUpload', '$http', function($scope, fileUpload, $http) {

   $scope.checked = [];

   $scope.toogleSelection = function toogleSelection(file) {
     var ino = $scope.checked.indexOf(file);

     if (ino > -1) {
       $scope.checked.splice(ino, 1);
     } else {
       $scope.checked.push(file);
     }

     console.log($scope.checked);
   };

   $scope.uploadFile = function() {
     var file = $scope.myFile;
     var uploadUrl = "/savedata";
     fileUpload.uploadFileToUrl(file, uploadUrl);
   };

   $scope.getIndex = function() {
     $http.post('/api/getIndex', $scope.checked).success(function(data, status, headers, config) {
       $scope.words = data;
       console.log($scope.words);
     }).
     error(function(data, status, header, config) {
       $scope.ResponseDetails = "Data: " + data +
         "<br />status: " + status +
         "<br />headers: " + jsonFilter(header) +
         "<br />config: " + jsonFilter(config);
     });
   };

   $scope.searchIndex = function() {
     console.log($scope.formData);
     $http.post('/api/searchIndex', $scope.checked, $scope.formData).success(function(data) {
       $scope.formData = {};
       $scope.results = data;
       console.log(data);
     }).error(function(data) {
       alert('error');
     });

   };

   $scope.showFiles = function() {
     $http.get('/api/files').success(function(
       data) {
       $scope.files = data;
     }).error(function(data, status, headers, config) {
       console.log(data, status, headers, config);
     });
   };

 }]);

 app.service('fileUpload', ['$http', function($http) {
   this.uploadFileToUrl = function(file, uploadUrl) {
     var fd = new FormData();
     fd.append('file', file);



     $http.post(uploadUrl, fd, {
       transformRequest: angular.identity,
       headers: {
         'Content-Type': undefined
       }
     })

     .success(function(data) {
       return data;
     })

     .error(function() {});
   };
 }]);
