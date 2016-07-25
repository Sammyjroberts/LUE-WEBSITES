angular.module('app',[
  //external
    "ui.router",
    "ui.grid",
//internal
    "app.common",
    "app.layout",
    "app.home",
    "app.jobpostings"
])
.constant('_', window._);
