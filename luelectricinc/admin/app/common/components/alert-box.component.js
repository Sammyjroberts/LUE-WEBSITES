/*
  component we will dynamically compile to pop alerts
*/
angular.module('app.common').component('alertBox', {
  template: `
    <div ng-class ="ctrl.class" style="position: fixed; bottom:0px; right:0px;">
      <h1><b>{{ctrl.type.toUpperCase()}}</b></h1>
      <p>{{ctrl.msg}}</p
    </div>
  `,

  controller: function() {
    const self = this;
    console.log(self);
    self.class = [];
    self.class.push("bs-callout");

    switch (self.type) {
      case "error":
        self.class.push("bs-callout-danger");
        break;
      case "warning":
        self.class.push("alert-warning");
        break;
      case "success":
        self.class.push("bs-callout-success");
        break;
      default:
        self.class.push("alert-danger");
      break;

    }
  },
  controllerAs:"ctrl",
  bindings: {
    type: "=",
    msg:"="
  }
});
