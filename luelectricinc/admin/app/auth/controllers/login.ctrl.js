angular.module("app.auth").controller("loginCtrl", function(auth, $state, AlertPopper) {
 const self = this;
 self.user = {};
 self.submit = function() {
   auth.login(self.user)
   .then(function(response) {
     console.log(response);
     auth.saveToken(response.data.token);
     AlertPopper.popAlert("success","Logged In");
     $state.go("app.home");
   })
   .catch(function(err) {
     AlertPopper.popAlert("error",err.data.message);
     console.error(err);
   });
 };
});
