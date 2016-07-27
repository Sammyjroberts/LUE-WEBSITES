angular.module("app.auth").controller("loginCtrl", function(auth, $state) {
 const self = this;
 self.user = {};
 self.submit = function() {
   auth.login(self.user)
   .then(function(response) {
     console.log(response);
     auth.saveToken(response.data.token);
     $state.go("app.home");
   })
   .catch(function(err) {
     console.error(err);
   });
 };
});
