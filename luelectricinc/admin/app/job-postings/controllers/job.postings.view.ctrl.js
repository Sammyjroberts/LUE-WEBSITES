angular.module("app.jobpostings").controller("jobPostingViewCtrl", function(JobPosting, $stateParams) {
    const self = this;
    self.jobPosting = {};
    self.jobPosting.id = $stateParams.id;
    JobPosting.initController(self, "view");
});
