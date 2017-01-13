// angular service
// app.service('fileUpload', ['$http', function($http) {
//   this.uploadFileToUrl = function(file, uploadUrl) {
//     let fd = new FormData();
//     fd.append('file', file);

//     let promise = $http.post(uploadUrl, fd, {
//       transformRequest: angular.identity,
//       headers: {
//         'Content-Type': undefined
//       }
//     }).success(function(data) {
//       return data;
//     }).error(function() {});

//     return promise;
//   };
// }]);

// app.service('FileInputService', function($q) {

//   this.readFileAsync = function(file) {
//     var deferred = $q.defer();
//     fileReader = new FileReader();
//     fileReader.readAsText(file);

//     fileReader.onload = function(e) {
//       deferred.resolve(e.target.result);
//     };
//     return deferred.promise;
//   };
// });

// called when a user uploads a file
// sends the file and it's url to fileUpload service
// adds the returned index to angular local storage
// $scope.uploadFile = function() {
//   let file = $scope.myFile;
//   let uploadUrl = "/savedata";
//   fileUpload.uploadFileToUrl(file, uploadUrl).then(function(response) {
//     let fileName = file.name;
//     $localStorage[fileName] = response.data;
//   });
// };


// Sends a get request to server
// returns a list of files in the upload folder
// function showFiles() {
//   $http.get('/api/files').success(function(
//     data) {
//     $scope.filerg = data;

//   }).error(function(data, status, headers, config) {
//     console.log(data, status, headers, config);
//   });
// }


// // Function called when browser is loaded
// let init = function() {
//   showFiles();
// };
// init();

// fileModel directive
// app.directive('fileModel', ['$parse', function($parse) {
//   return {
//     restrict: 'A',
//     link: function(scope, element, attrs) {
//       let model = $parse(attrs.fileModel);
//       let modelSetter = model.assign;

//       element.bind('change', function() {
//         scope.$apply(function() {
//           modelSetter(scope, element[0].files[0]);
//         });
//       });
//     }
//   };
// }]);

// $scope.fileInputContent = "";
// $scope.onFileUpload = function(element) {
//   $scope.$apply(function(scope) {
//     var file = element.files[0];
//     FileInputService.readFileAsync(file)
//       .then(function(fileInputContent) {
//         $scope.fileInputContent = fileInputContent;
//       });
//   });
// };

// app.service('FileInputService', function($q) {

//   this.readFileAsync = function(file) {
//     var deferred = $q.defer();
//     fileReader = new FileReader();
//     fileReader.readAsText(file);

//     fileReader.onload = function(e) {
//       deferred.resolve(e.target.result);
//     };
//     return deferred.promise;
//   };
// });
