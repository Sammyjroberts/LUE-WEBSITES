angular.module('app',[
  //external
    "ui.router",
    "ui.grid",
//internal
    "app.common",
    "app.auth",
    "app.layout",
    "app.home",
    "app.jobpostings"
])
.constant('_', window._)
.config(function() {

})
.run(function ($rootScope, $state, $stateParams, auth) {
    $rootScope.$on("$stateChangeStart", (function(event, toState, toParams, fromState, fromParams) {

        auth.authenticatedStateChange(toState, event);
    }));
});
