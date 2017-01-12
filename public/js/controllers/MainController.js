 /*jshint esversion: 6 */

 app.controller('MainController', ['$scope', 'fileUpload', '$http', '$localStorage', 'searchTerms',
   function($scope, fileUpload, $http, $localStorage, searchTerms) {


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

     $scope.showFiles = function() {
       $http.get('/api/files').success(function(
         data) {
         $scope.files = data;
       }).error(function(data, status, headers, config) {
         console.log(data, status, headers, config);
       });
       console.log($scope.files);
     };

     console.log($scope.files);

     $scope.searchIndex = function(files) {
       search_terms = $scope.formData;
       console.log(files);
       console.log($scope.checked);
       console.log(search_terms.search);
       if ($scope.checked.length === 0) {
         $scope.files.forEach = function(file) {
           searchTerms.search(file, search_terms).then(function(response) {
             $scope.formData = {};
             $scope.searchedWords = response.data;
           });
         };
       } else {
         $scope.checked.forEach(function(file) {
           searchTerms.search(file, search_terms).then(function(response) {
             $scope.formData = {};
             $scope.searchedWords = response.data;
           });
         });
       }

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

 app.service('searchTerms', ['$http', '$localStorage',
   function($http, $localStorage) {
     this.search = function(file, search_terms) {
       let data = [file, $localStorage[file], search_terms];
       var promise = $http.post('/api/searchIndex', data).success(function(data) {
         return data;
       }).error(function(data) {
         alert('error');
       });
       return promise;
     };
   }
 ]);
