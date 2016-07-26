angular.module("app.common").service("RouteGetter", function() {
    var RouteGetter = this;
    //const baseURL = "http://www.luelectricinc.com/api/api.php?";
    const baseURL = "/api/api.php?";
    RouteGetter.get = function(model, id) {
      id = id || "";
      var tempURL = baseURL;
      tempURL += "model=" + model;
      if(id !== "") {
        tempURL+= "&id=" + id;
      }
      console.log(tempURL);
      return tempURL;
    };
});
