//filter the locations array to display as we want
angular.module('app.common').filter('location', function() {
  return function(input) {
    let out = "";
    for(var lcv = 0; lcv <input.length; lcv++) {
      if(lcv !== (input.length-1)) {
        out+= input[lcv].city + ", " + input[lcv].state + " - ";
      }
      else {
        out+= input[lcv].city + ", " + input[lcv].state;
      }
    }
    return out;
  };
});
