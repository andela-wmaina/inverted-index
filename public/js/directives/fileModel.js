/* jshint esversion: 6 */

app.directive('fileList', ['$http', '$localStorage', function($http, $localStorage) {
  return {
    restrict: 'EA',

    link(scope, element, attrs) {
      element.bind('change', (evt) => {
        scope.$apply(() => {
          scope[attrs.name] = evt.target.files;
          scope.fileReady = true;

          // new fileReader object
          const reader = new FileReader();

          // inject file on onload
          reader.onload = (event) => {
            const fileContent = event.target.result;
            scope.$apply(() => {
              // Checks if file is a valid JSON file
              $http.post('/isJSON', fileContent)
              .success((results) => {
                if (results === true) {
                  scope.files.push(evt.target.files[0].name);
                  const fileName = evt.target.files[0].name;
                  $localStorage[fileName] = fileContent;
                  scope.showError = false;
                  scope.noFiles = false;
                } else {
                  scope.error = 'Not a valid JSON file';
                  scope.showError = true;
                }
              })
              .error((err) => {
                scope.error = 'Not a valid JSON file';
              });
            });
          };
          // when file is read it triggers the onload event
          reader.readAsText(evt.target.files[0]);
        });
      });
    },
  };
}]);
