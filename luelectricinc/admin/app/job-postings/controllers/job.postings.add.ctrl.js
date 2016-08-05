angular.module("app.jobpostings").controller("JobPostingAddCtrl", function(FormHelpers, JobPosting, authHttp, $state, AlertPopper) {
  const self = this;
  JobPosting.initController(self, "add");


  self.submit = function() {
    //build post object
    const postingToPost = JobPosting.prepForPost(self.jobPosting);

    //save posting
    JobPosting.post(postingToPost)
    .then(function(response) {
      //pop success
      AlertPopper.popAlert("success","Job Posing Created!");

      $state.go("app.jobpostings.home");
    })
    .catch(function(err) {
      AlertPopper.popAlert("error",err.data.message);
      console.error(err);
    });
  };
});
