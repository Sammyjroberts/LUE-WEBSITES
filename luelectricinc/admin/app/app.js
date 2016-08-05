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
.constant('_', window._) //inject lodash as a constant across angular
.config(function() {

})
.run(function ($rootScope, $state, $stateParams, auth) {
    //when state changes authenticate the change
    $rootScope.$on("$stateChangeStart", (function(event, toState, toParams, fromState, fromParams) {
        auth.authenticatedStateChange(toState, event);
    }));
});
