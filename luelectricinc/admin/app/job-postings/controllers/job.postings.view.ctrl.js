angular.module("app.jobpostings").controller("JobPostingViewCtrl", function(JobPosting, $stateParams) {
    const self = this;
    self.stateParams = $stateParams;
    JobPosting.initController(self, "view");
});
