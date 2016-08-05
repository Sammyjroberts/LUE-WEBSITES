angular.module("app.jobpostings").controller("JobPostingEditCtrl", function(JobPosting, $stateParams, $state, AlertPopper) {
  const self = this;
  //put stateparams into the controller so we can use them in init
  self.stateParams = $stateParams;

  //build the controller
  JobPosting.initController(self, "edit")
  .then(function(response) {
    console.log("data:application/octet-stream;charset=utf-16le;base64,"+self.jobPosting.application);
  })
  .catch((err)=> {
    console.error(err);
  });

  //deletes the job posting
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

  //submits the posting, putting it
  self.submit = function() {
    console.log("submitting");
    console.log(self.jobPosting);
    const postingToPost = JobPosting.prepForPost(self.jobPosting);
    console.log(JSON.stringify(postingToPost));

    JobPosting.put(postingToPost, $stateParams.id)
    .then(function(response) {
      console.log(response);
      AlertPopper.popAlert("success","Job Posing Edited!");
      $state.go("app.jobpostings.home");
    })
    .catch(function(err) {
      AlertPopper.popAlert("error",err.data.message);
      console.error(err);
    });
  };

});
