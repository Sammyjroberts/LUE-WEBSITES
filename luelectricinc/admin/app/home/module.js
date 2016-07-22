"use strict";

angular.module('app.home', ['ui.router'])

    .config(function ($stateProvider) {
        $stateProvider
            .state('app.home', {
                abstract: false,
                url: "/home",
                views: {
                    "content@app": {
                        template: '<div><h1>Hello World</h1></div>',
                        controller: "homeCtrl"
                    }
                }
            });
    });
