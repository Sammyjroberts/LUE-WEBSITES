"use strict";

angular.module('app.home', ['ui.router'])

    .config(function ($stateProvider) {
        $stateProvider
            .state('app.home', {
                abstract: false,
                url: "/home",
                views: {
                    "content@app": {
                        template: '<div class = "container-fluid"><h1 class = "page-header">Welcome to the LUE Website Administration Application</h1></div>',
                        controller: "homeCtrl"
                    }
                }
            });
    });
