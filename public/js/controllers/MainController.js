 /* jshint esversion: 6 */
 /* eslint no-param-reassign: ["error", { "props": false }]*/

 app.controller('MainController', ['$scope', '$http', '$localStorage',
   ($scope, $http, $localStorage) => {
     $scope.noFiles = true;
     $scope.fileReady = false;
     $scope.files = []; // Contains all uploaded file names
     $scope.checked = []; // Contains all the checked files names

     /**
      * createIndex
      *
      * sends a http.post to server with the file.
      * @params {string}
      * @returns {object} 
      */
     $scope.createIndex = (fileName) => {
       $scope.show = true;
       const fileContent = JSON.parse($localStorage[fileName]);
       const data = [fileName, fileContent];
       $http.post('/createIndex', data).success((index) => {
         $scope.fileIndex = index;
       }).error((err) => {
         $scope.error = 'An error has occurred';
       });
     };

     /**
      * toogleSelection
      *
      * called when a checkbox is checked.
      *
      * @param {string}
      */
     $scope.toogleSelection = (file) => {
       const indexNo = $scope.checked.indexOf(file);
       if (indexNo > -1) {
         $scope.checked.splice(indexNo, 1);
       } else {
         $scope.checked.push(file);
       }
     };

     /**
       * searchIndex
       *
       * passes the selected files and the searched words 
       * to search function
       *
       * @param none
       */
     $scope.searchIndex = () => {
       $scope.searchedWords = [];
       let data;
       if ($scope.checked.length === 0 && $scope.files.length > 0) {
         $scope.files.forEach((file) => {
           data = [file, $scope.formData];
           $scope.search(data);
         });
       } else {
         $scope.checked.forEach((file) => {
           data = [file, $scope.formData];
           $scope.search(data);
         });
       }
     };

     /**
      * search
      *
      * sends a http post request to server with the filename 
      * and the searched words.
      *
      * @param {Array}
      */
     $scope.search = (data) => {
       $http.post('/api/searchIndex', data)
         .success((results) => {
           $scope.formData = {};
           $scope.searchedWords.push(results);
         })
         .error((err) => {
           $scope.error = 'Index not created';
         });
     };
   },
 ]);
