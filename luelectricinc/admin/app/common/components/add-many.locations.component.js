angular.module('app.common').component('addManyLocations', {
  template: `
  <div>
    <label>{{ctrl.title}}</label>
    <button class ="btn btn-default form-control" ng-click="ctrl.addNew()" ng-disabled = "ctrl.readOnly">Add New {{ctrl.title}}</button>
    <p></p>
    <div ng-repeat ="item in ctrl.srcArray track by $index">
      <div class = "row form-group">
        <div class ="col-md-6">
          <input placeholder="{{ctrl.title}}..." ng-model="item.city" class = "form-control" type = "text" ng-readOnly = "ctrl.readOnly">
        </div>
        <div class ="col-md-5">
          <select class = "form-control" ng-model ="item.state" ng-disabled = "ctrl.readOnly">
            <option value="CA">California</option>
            <option value="AZ">Arizona</option>
          </select>
        </div>
        <div class ="col-md-1">
          <i class ="fa fa-minus fa-2x" ng-click="ctrl.removeItem($index)" ng-hide = "ctrl.readOnly"></i>
        </div>
      </div>
    </div>
  </div>
  `,
  controller: function() {
    const self = this;
    self.addNew = function() {
      self.srcArray.push({city:"", state:"CA"});
    };
    self.removeItem = function(index) {
      _.pullAt(self.srcArray, index);
    };
  },
  controllerAs:"ctrl",
  bindings: {
    srcArray: '=',
    title: '@',
    readOnly: '='
  }
});
