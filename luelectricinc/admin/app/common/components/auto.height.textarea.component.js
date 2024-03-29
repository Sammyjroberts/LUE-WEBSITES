//TODO make this good, this scales text box height to the content
angular.module("app.common").directive("autoHeight", function ($timeout) {
  return {
      restrict: 'A',
      link: function($scope, element) {
        if(element[0].scrollHeight < 30){
            element[0].style.height = 30;
        }else{
            element[0].style.height = (element[0].scrollHeight) + "px";
        }

        var resize = function() {
          return element[0].style.height = "" + element[0].scrollHeight + "px";
        };

        element.on("blur keyup change", resize);
        $timeout(resize, 0);
      }
    }
});
