angular.module("app.jobpostings").controller("JobPostingAddCtrl", function(FormHelpers, JobPosting, authHttp, $state, AlertPopper) {
  const self = this;
  JobPosting.initController(self, "add");
  self.submit = function() {
    console.log("submitting");
    console.log(self.jobPosting);
    const postingToPost = JobPosting.prepForPost(self.jobPosting);
    console.log(postingToPost);

    JobPosting.post(postingToPost)
    .then(function(response) {
      console.log(response);
      AlertPopper.popAlert("success","Job Posing Created!");
      $state.go("app.jobpostings.home");
    })
    .catch(function(err) {
      AlertPopper.popAlert("error",err.data.message);
      console.error(err);
    });
  };
});
