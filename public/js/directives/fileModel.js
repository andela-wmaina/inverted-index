/* jshint esversion: 6 */

app.directive('fileList', ['$http', '$localStorage', function($http, $localStorage) {
  return {
    restrict: 'EA',

    link: function(scope, element, attrs) {
      element.bind('change', function(evt) {
        scope.$apply(function() {
          scope[attrs.name] = evt.target.files;
          scope.fileReady = true;
          // new fileReader object
          var reader = new FileReader();
          // inject file on onload
          reader.onload = function(event) {
            scope.$apply(function() {
              fileContent = event.target.result;
              console.log(isJSON(fileContent));
              if (isJSON(fileContent)) {
                scope.files.push(evt.target.files[0].name);
                fileName = evt.target.files[0].name;
                createIndex(fileName, fileContent);
                scope.showError = false;
              } else {
                scope.error = 'Not a valid JSON file';
                scope.showError = true;
              }
            });
          };
          // when file is read it triggers the onload event
          reader.readAsText(evt.target.files[0]);
        });
      });
      let createIndex = (fileName, url) => {
        console.log(url);
        $http.post('/createIndex', url).success(function(file) {
          $localStorage[fileName] = file;
        }).error(function(data) {
          alert('error');
        });
      };
      let isJSON = (fileContent) => {
        try {
          JSON.parse(fileContent);
        } catch (e) {
          return false;
        }
        return true;
      }
    }
  };
}]);
