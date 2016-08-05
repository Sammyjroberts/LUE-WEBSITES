//okay get ready this is a little weird.
angular.module("app.common").service("AlertPopper", function($compile, $rootScope, $timeout) {
  const self = this;

  //pop an alert
  self.popAlert = function(
    type, //see alter component for available types
     msg, //display message
     dur) // durration in miliseconds
      {
    if(!dur) {
      //if no durration use 3 seconds
      dur = 3000;
    }
    //init a new scope for the component
    const scope = ($rootScope.$new(true));

    //set the message to be in scope of the component
    scope.msg = msg;
    scope.type = type;

    //create the element
    const elem = $compile("<alert-box type='type' msg='msg'></alert-box>")(scope);
    //in the html document, find the body, and append the alert
    angular.element(document).find('body').append(elem);

    //remove after 3 seconds
    $timeout(function() {
      elem.remove();
    },dur);
  };
  return self;
});
