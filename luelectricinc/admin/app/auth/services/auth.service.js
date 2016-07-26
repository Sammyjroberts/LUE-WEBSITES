angular.module("app.auth").service("auth", function($window, $state, RouteGetter, $http) {
  const self = this;
  const model = "auth";
  const LOCAL_STORAGE_LOCATION = "jwt";

  self.permissionlessStates = ["login"];


  //saves token to location
  self.saveToken = function(token) {
    token = token || "";
    $window.localStorage.setItem(LOCAL_STORAGE_LOCATION, token);
  };

  // checks if jwt is expired, if expired forces login and removes jwt
  self.checkIfValid = function() {
    if($window.localStorage[LOCAL_STORAGE_LOCATION]) {
      try {
        const token = self.getDecodedToken();
        const expDate = new Date(token.exp);
        if(expDate >= Date.now()) {
          return false;
        }
      }
      catch(err) {
        console.error(err);
        return false;
      }
      return true;
    }
  };


  //removes jwt from local storage and forces you to go to the login page
  self.forceLogin = function() {
    $window.localStorage.removeItem(LOCAL_STORAGE_LOCATION);
    $state.go("login");
  };

  //returns decoded information
  self.getDecodedToken = function() {
    let token = $window.localStorage[LOCAL_STORAGE_LOCATION];
    return(JSON.parse($window.atob(token.split('.')[1])));
  };

  // run on every state change to see if we are good to swap states
  self.authenticatedStateChange = function (toState, event) {
    if(self.permissionlessStates.indexOf(toState.name.toString()) === -1) {
        console.log("state req permissions");
        if(!self.checkIfValid()) {
            console.log("--ERROR: not logged in");
            event.preventDefault();
            self.forceLogin();
        }
    }
};
  //logs in
  self.login = function(data) {
    const route = RouteGetter.get(model);
    console.log(data);
    return $http.post(route,data);
  };

return self;

});
