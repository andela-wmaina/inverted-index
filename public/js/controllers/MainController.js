 /*jshint esversion: 6 */

 app.controller('MainController', ['$scope', 'fileUpload', '$http', '$localStorage', 'searchTerms',
   function($scope, fileUpload, $http, $localStorage, searchTerms) {

     // Function called when browser is loaded
     var init = function() {
       showFiles();
     };

     init();

     // Array that holds the checked files
     $scope.checked = [];

     // Get index fuction
     // @params file specified
     // returns the index of the file
     $scope.fetchIndex = function(file) {
       $scope.show = true;
       $scope.fileIndex = $localStorage[file];
       return file, $scope.fileIndex;
     };

     // called when a checkbox is checked. 
     // push or pops a file from the checked array
     // @params file specified
     $scope.toogleSelection = function toogleSelection(file) {
       var indexNo = $scope.checked.indexOf(file);
       if (indexNo > -1) {
         $scope.checked.splice(indexNo, 1);
       } else {
         $scope.checked.push(file);
       }
     };

     // called when a user uploads a file
     // sends the file and it's url to fileUpload service
     // adds the returned index to angular local storage
     $scope.uploadFile = function() {
       var file = $scope.myFile;
       var uploadUrl = "/savedata";
       fileUpload.uploadFileToUrl(file, uploadUrl).then(function(response) {
         let fileName = file.name;
         $localStorage[fileName] = response.data;
       });
     };

     // Sends a get request to server
     // returns a list of files in the upload folder
     function showFiles() {
       $http.get('/api/files').success(function(
         data) {
         $scope.files = data;
       }).error(function(data, status, headers, config) {
         console.log(data, status, headers, config);
       });
     }

     // called when user tries to search a file 
     // returns an array of the results
     $scope.searchIndex = function() {
       $scope.searchedWords = [];
       $scope.checked.forEach(function(file) {
         let data = [file, $localStorage[file], $scope.formData];
         $http.post('/api/searchIndex', data).success(function(data) {
           $scope.formData = {};
           $scope.searchedWords.push(data);
         }).error(function(data) {
           alert('error');
         });
       });
     };

   }
 ]);

 // angular service
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
