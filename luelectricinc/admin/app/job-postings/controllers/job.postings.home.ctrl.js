angular.module("app.jobpostings").controller("JobPostingHomeCtrl", function(JobPosting) {
  const self = this;
  console.log("in home ctrl");

  self.gridOptions = {};
  self.gridOptions.data = [{msg:"eyy"}];

  
  JobPosting.getAll()
  .then(function(response) {
    console.log(response);
    self.gridOptions.data = response.data;
  });

});
