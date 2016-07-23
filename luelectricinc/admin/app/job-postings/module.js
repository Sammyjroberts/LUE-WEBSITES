
angular.module('app.jobpostings', ['ui.router'])
    .config(function ($stateProvider) {
        $stateProvider
            .state('app.jobpostings', {
                abstract: true
            })
            .state('app.jobpostings.home', {
                url: "/job-postings",
                views: {
                "content@app": {
                        templateUrl: 'app/job-postings/views/home.html',
                        controller: 'JobPostingHomeCtrl',
                        controllerAs: "ctrl"
                    }
                }
            })
            .state('app.jobpostings.add', {
              url: "/job-postings/add",
                views: {
                    "content@app": {
                        templateUrl: 'app/job-postings/views/add-edit-view.html',
                        controller: 'JobPostingAddCtrl',
                        controllerAs: "ctrl"
                    }
                }
            })
            .state('app.jobpostings.edit', {
                url: "/job-postings/edit/:id",
                views: {
                    "content@app": {
                        templateUrl: 'app/job-postings/views/add-edit-view.html',
                        controller: 'jobPostingEditCtrl',
                        controllerAs: "ctrl"
                    }
                }
            })
            .state('app.jobpostings.view', {
                url: "/job-postings/view/:id",
                views: {
                    "content@app": {
                        templateUrl: 'app/job-postings/views/add-edit-view.html',
                        controller: 'jobPostingViewCtrl',
                        controllerAs: "ctrl"
                    }
                }
            });
    });
