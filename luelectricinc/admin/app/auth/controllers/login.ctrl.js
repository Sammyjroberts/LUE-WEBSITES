angular.module("app.auth").controller("loginCtrl", function(auth) {
 const self = this;
 self.user = {};
 self.submit = function() {
   auth.login()
   .then(function(response) {
     auth.saveToken(response.data.token);
   });
 };
});
