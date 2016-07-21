"use strict";

angular.module('app.layout', ['ui.router'])

    .config(function ($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('app', {
                abstract: true,
                views: {
                    root: {
                        templateUrl: 'app/layout/views/layout.tpl.html',
                        controller: 'layoutCtrl'
                    }
                }
            });
        $urlRouterProvider.otherwise('/home');
    });