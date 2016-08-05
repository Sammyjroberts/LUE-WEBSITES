
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

    //init starting progress
    self.currentProgress = "0%";

    //file reader we will use to handle file events
    const fr = new FileReader();

    //file reader callbacks
    fr.onload = function(loadEvent) {
      console.log("done");
      //encode file
      self.file = $window.btoa(loadEvent.target.result);
      //run a digest cycle
      $scope.$apply();
    };
    fr.onprogress = function(event) {
      //on download progress update the bar
      self.currentProgress = ((event.loaded/event.total).toFixed(2))*100 +"%";
      //run a digest cycle
      $scope.$apply();
    };

    $scope.fileNameChanged = function(fileElement) {
      //get file name
      self.name = fileElement.files[0].name;
      //load into memory
      fr.readAsBinaryString(fileElement.files[0]);
      //run digest cycle
      $scope.$apply();
    };
  },
  controllerAs:"ctrl",
  bindings: {
    file: '=',
    name: '='
  }
});
