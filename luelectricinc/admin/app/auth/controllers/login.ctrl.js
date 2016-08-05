/*
 * Controller for the Login State
 */
angular.module("app.auth").controller("loginCtrl", function(auth, $state, AlertPopper) {
 const self = this; //ViewModel
 //set object to post
 self.user = {};
 //function fired on form submit
 self.submit = function() {
   //post user info
   auth.login(self.user)
   .then(function(response) {
     console.log(response);
     //save JWT
     auth.saveToken(response.data.token);
     //pop alert
     AlertPopper.popAlert("success","Logged In");
     //go into the app
     $state.go("app.home");
   })
   .catch(function(err) {
     //pop error
     AlertPopper.popAlert("error",err.data.message);
     console.error(err);
   });
 };
});
