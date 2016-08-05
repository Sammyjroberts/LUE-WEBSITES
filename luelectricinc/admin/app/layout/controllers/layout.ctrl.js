angular.module("app.layout").controller("layoutCtrl", function(auth) {
  const self = this;
  //force logout
    self.logout = function() {
      auth.forceLogin();
    };
});
