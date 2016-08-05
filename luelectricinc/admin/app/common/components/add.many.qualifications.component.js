/*
 *  Module used to add many qualifications to a job posting
 */
angular.module('app.common').component('addManyQualifications', {
  template: `
  <div>
    <label>{{ctrl.title}}</label>
    <button class ="btn btn-default form-control" ng-click="ctrl.addNew()" ng-disabled = "ctrl.readOnly">Add New {{ctrl.title}}</button>
    <p></p>
    <div ng-repeat ="item in ctrl.srcArray track by $index">
      <div class = "row form-group">
        <div class ="col-md-11">
          <input placeholder="{{ctrl.title}}..." ng-model="item.name" class = "form-control" type = "text" ng-readOnly = "ctrl.readOnly">
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
    console.log("in add many ctrl");

    //add new qualification
    self.addNew = function() {
      self.srcArray.push({name:""});
    };
    //remove an item
    self.removeItem = function(index) {
      _.pullAt(self.srcArray, index);
    };
  },
  controllerAs:"ctrl",
  bindings: {
    srcArray: '=',
    title: '@',
    readOnly :"="
  }
});
