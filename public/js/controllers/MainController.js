 /*jshint esversion: 6 */

 app.controller('MainController', ['$scope', '$http', '$localStorage',
   function($scope, $http, $localStorage) {
     $scope.fileReady = false;
     $scope.afile = {};
     $scope.files = [];

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
       let indexNo = $scope.checked.indexOf(file);
       if (indexNo > -1) {
         $scope.checked.splice(indexNo, 1);
       } else {
         $scope.checked.push(file);
       }
     };

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
