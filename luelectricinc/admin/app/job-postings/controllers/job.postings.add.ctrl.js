angular.module("app.jobpostings").controller("JobPostingAddCtrl", function() {
  const self = this;
  self.jobPosting = {
    locations:[{city:"Orange County",state:"CA"},{city:"Los Angeles",state:"CA"}],
    qualifications: [{name:""}]
  };
});
