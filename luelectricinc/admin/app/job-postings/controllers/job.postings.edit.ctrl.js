angular.module("app.jobpostings").controller("JobPostingEditCtrl", function(JobPosting, $stateParams) {
  const self = this;
  console.log($stateParams);
  self.jobPosting = {};
  self.jobPosting.id = $stateParams.id;
  JobPosting.initController(self, "edit");

});
