angular.module("app.common").service("RouteGetter", function() {
    const RouteGetter = this;

    //base api url
    const baseURL = "/api/api.php?";

    //gets a route based on a model and an optional ID
    RouteGetter.get = function(model, id) {
      //if no id then make it blank
      id = id || "";

      //create the URL
      var tempURL = baseURL;
      tempURL += "model=" + model;
      if(id !== "") {
        tempURL+= "&id=" + id;
      }
      return tempURL;
    };
});
