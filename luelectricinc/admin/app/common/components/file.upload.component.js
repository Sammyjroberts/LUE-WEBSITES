
angular.module('app.common').component('fileUpload', {
  template: `
  <label>Application File</label>
  <input type="file" class ="form-control" ng-model="ctrl.file">
  <div class="progress">
    <div class="progress-bar" role="progressbar" aria-valuenow="70"
    aria-valuemin="0" aria-valuemax="100" style="width:{{ctrl.currentProgress}}%">
      70%
    </div>
  </div>
  `,
  controller: function() {
    const self = this;
    const fr = new FileReader();
    fr.onload = function(loadEvent) {
      self.file = loadEvent.target.result;
    };
    fr.onprogress = function(event) {
      self.currentProgress = ((event.loaded/event.total).toFixed(2))*100;
    };
  },
  controllerAs:"ctrl",
  bindings: {
    file: '='
  }
});
