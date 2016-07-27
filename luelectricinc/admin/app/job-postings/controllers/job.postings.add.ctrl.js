angular.module("app.jobpostings").controller("JobPostingAddCtrl", function(FormHelpers, JobPosting, authHttp, $state) {
  const self = this;
  JobPosting.initController(self, "add");
  self.submit = function() {
    console.log("submitting");
    console.log(self.jobPosting);
    const postingToPost = JobPosting.prepForPost(self.jobPosting);
    console.log(JSON.stringify(postingToPost));

    JobPosting.post(postingToPost)
    .then(function(response) {
      console.log(response);
      $state.go("app.jobpostings.home");
    })
    .catch(function(err) {
      console.error(err);
    });
  };
});
