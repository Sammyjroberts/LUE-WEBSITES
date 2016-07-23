angular.module("app.jobpostings").controller("JobPostingHomeCtrl", function() {
  const self = this;
  console.log("in home ctrl");
  self.gridOptions = {};
  self.gridOptions.data = [{msg:"eyy"}];
});
