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
          reader.onload = function(event) {
            scope.$apply(() => {
              const fileContent = event.target.result;

              // Checks if file is a valid JSON file
              if (isJSON(fileContent)) {
                scope.files.push(evt.target.files[0].name);
                let fileName = evt.target.files[0].name;
                $localStorage[fileName] = fileContent;
                scope.showError = false;
                scope.noFiles = false;
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
      let isJSON = (fileContent) => {
        try {
          let isArray = JSON.parse(fileContent);
          isArray.some((fileObject) => {
            if (fileObject.title && fileObject.text) {
              result = true;
            } else {
              result = false;
              return true;
            }
          });
          return result;
        } catch (e) {
          return false;
        }
      };
    },
  };
}]);
