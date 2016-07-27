angular.module("app.layout").controller("layoutCtrl", function(auth) {
  const self = this;
    console.log("inside layout")
    self.logout = function() {
      console.log("loging out");
      auth.forceLogin();
    }
})
