angular.module("app.jobpostings").controller("JobPostingEditCtrl", function(JobPosting, $stateParams, $state) {
  const self = this;
  self.stateParams = $stateParams;
  JobPosting.initController(self, "edit");
  self.delete = function() {
    JobPosting.delete($stateParams.id)
    .then(function(response) {
      console.log(response);
      $state.go("app.jobpostings.home");
    })
    .catch(function(err) {
      console.error(err);
    });
  };
  self.submit = function() {
    console.log("submitting");
    console.log(self.jobPosting);
    const postingToPost = JobPosting.prepForPost(self.jobPosting);
    console.log(JSON.stringify(postingToPost));

    JobPosting.put(postingToPost, $stateParams.id)
    .then(function(response) {
      console.log(response);
      $state.go("app.jobpostings.home");
    })
    .catch(function(err) {
      console.error(err);
    });
  };

});
