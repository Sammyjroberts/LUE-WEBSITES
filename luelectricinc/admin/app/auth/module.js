angular.module('app.auth', ['ui.router']);

angular.module('app.auth').config(function($stateProvider) {
    $stateProvider
        .state('login', {
            url: '/login/',
            views: {
                "root" : {
                    templateUrl: 'app/auth/views/login.html',
                    controller: 'loginCtrl',
                    controllerAs: "ctrl"
                }
            },
            data: {
                title: 'Login',
                htmlId: 'extr-page'
            }
        });
});
