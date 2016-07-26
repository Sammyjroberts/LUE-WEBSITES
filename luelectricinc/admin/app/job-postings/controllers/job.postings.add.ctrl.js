angular.module("app.jobpostings").controller("JobPostingAddCtrl", function(FormHelpers, JobPosting, authHttp) {
  const self = this;
  JobPosting.initController(self, "add");
  self.submit = function() {
    console.log("submitting");
    const postingToPost = JobPosting.prepForPost(self.jobPosting);
    console.log(JSON.stringify(postingToPost));

    JobPosting.post(postingToPost)
    .then(function(response) {
      console.log(response);
    })
    .catch(function(err) {
      console.error(err);
    });
  };
});
