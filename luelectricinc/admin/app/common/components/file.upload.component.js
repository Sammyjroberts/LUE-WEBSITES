
angular.module('app.common').component('fileUpload', {
  template: `
  <label>Application File</label>
  <input type="file" class ="form-control" onchange="angular.element(this).scope().fileNameChanged(this)">
  <div class="progress">
    <div class="progress-bar" role="progressbar" aria-valuenow="70"
    aria-valuemin="0" aria-valuemax="100" ng-style="{width:ctrl.currentProgress}">

    </div>
    {{ctrl.currentProgress}}
  </div>
  `,
  //angular.element(element).controller().startDownload()
  controller: function($scope, $window) {
    const self = this;
    self.currentProgress = "0%";
    const fr = new FileReader();
    fr.onload = function(loadEvent) {
      console.log("done");
      //encode file
      self.file = $window.btoa(loadEvent.target.result);
      console.log(self.file);
      $scope.$apply();
    };
    fr.onprogress = function(event) {
      console.log("progress");
      self.currentProgress = ((event.loaded/event.total).toFixed(2))*100 +"%";
      $scope.$apply();
    };
    $scope.fileNameChanged = function(guy) {
      fr.readAsBinaryString(guy.files[0]);
    };
  },
  controllerAs:"ctrl",
  bindings: {
    file: '='
  }
});
