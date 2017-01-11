 /*jshint esversion: 6 */

 app.controller('MainController', ['$scope', 'fileUpload', '$http', '$localStorage',
   function($scope, fileUpload, $http, $localStorage) {


     // Array that holds the checked files
     $scope.checked = [];


     $scope.fetchIndex = function(file) {
       $scope.fileIndex = $localStorage[file];
       return file, $scope.fileIndex;
     };

     // 
     $scope.toogleSelection = function toogleSelection(file) {
       var ino = $scope.checked.indexOf(file);
       if (ino > -1) {
         $scope.checked.splice(ino, 1);
       } else {
         $scope.checked.push(file);
       }
     };

     $scope.uploadFile = function() {
       var file = $scope.myFile;
       var uploadUrl = "/savedata";
       fileUpload.uploadFileToUrl(file, uploadUrl).then(function(response) {
         let fileName = file.name;
         $localStorage[fileName] = response.data;
       });

     };

     $scope.searchIndex = function() {
       if ($scope.checked === []) {
         $scope.files.forEach = function(file) {
           let data = [file, $localStorage[file], $scope.formData];
           $http.post('/api/searchIndex', data).success(function(data) {
             $scope.formData = {};
             $scope.searchedWords = data;
           }).error(function(data) {
             alert('error');
           });
         };
       } else {
         $scope.checked.forEach(function(file) {
           let data = [file, $localStorage[file], $scope.formData];
           $http.post('/api/searchIndex', data).success(function(data) {
             $scope.formData = {};
             $scope.searchedWords = data;
           }).error(function(data) {
             alert('error');
           });
         });
       }
     };

     $scope.showFiles = function() {
       $http.get('/api/files').success(function(
         data) {
         $scope.files = data;
       }).error(function(data, status, headers, config) {
         console.log(data, status, headers, config);
       });
     };

   }
 ]);

 app.service('fileUpload', ['$http', function($http) {
   this.uploadFileToUrl = function(file, uploadUrl) {
     var fd = new FormData();
     fd.append('file', file);

     var promise = $http.post(uploadUrl, fd, {
       transformRequest: angular.identity,
       headers: {
         'Content-Type': undefined
       }
     }).success(function(data) {
       return data;
     }).error(function() {});

     return promise;
   };
 }]);
