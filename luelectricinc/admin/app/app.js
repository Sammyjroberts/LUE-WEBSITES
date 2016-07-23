angular.module('app',[
  //external
    "ui.router",
    "ui.grid",
    "textAngular",
//internal
    "app.common",
    "app.layout",
    "app.home",
    "app.jobpostings"
])
.constant('_', window._);
