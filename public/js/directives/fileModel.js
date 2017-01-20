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
              scope.files.push(evt.target.files[0].name);
              fileName = evt.target.files[0].name;
              the_url = event.target.result;
              createIndex(fileName, the_url);
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
    }
  };
}]);
