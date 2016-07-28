angular.module("app.common").service("AlertPopper", function($compile, $rootScope, $timeout) {
  const self = this;
  self.popAlert = function(type, msg, dur) {
    if(!dur) {
      dur = 3000;
    }
    console.log("in");
    const scope = ($rootScope.$new(true));
    scope.msg = msg;
    scope.type = type;
    const elem = $compile("<alert-box type='type' msg='msg'></alert-box>")(scope);
    angular.element(document).find('body').append(elem);
    console.log(elem);
    $timeout(function() {
      elem.remove();
    },dur);
  };
  return self;
});
