"use strict";

angular.module('app', [
//external
"ui.router", "ui.grid", "textAngular",
//internal
"app.common", "app.layout", "app.home", "app.jobpostings"]).constant('_', window._);

angular.module('app.common', []);

"use strict";

angular.module('app.home', ['ui.router']).config(function ($stateProvider) {
  $stateProvider.state('app.home', {
    abstract: false,
    url: "/home",
    views: {
      "content@app": {
        template: '<div><h1>Hello World</h1></div>',
        controller: "homeCtrl"
      }
    }
  });
});

angular.module('app.jobpostings', ['ui.router']).config(function ($stateProvider) {
  $stateProvider.state('app.jobpostings', {
    abstract: true
  }).state('app.jobpostings.home', {
    url: "/job-postings",
    views: {
      "content@app": {
        templateUrl: 'app/job-postings/views/home.html',
        controller: 'JobPostingHomeCtrl',
        controllerAs: "ctrl"
      }
    }
  }).state('app.jobpostings.add', {
    url: "/job-postings/add",
    views: {
      "content@app": {
        templateUrl: 'app/job-postings/views/add-edit-view.html',
        controller: 'JobPostingAddCtrl',
        controllerAs: "ctrl"
      }
    }
  }).state('app.jobpostings.edit', {
    url: "/job-postings/edit/:id",
    views: {
      "content@app": {
        templateUrl: 'app/job-postings/views/add-edit-view.html',
        controller: 'jobPostingEditCtrl',
        controllerAs: "ctrl"
      }
    }
  }).state('app.jobpostings.view', {
    url: "/job-postings/view/:id",
    views: {
      "content@app": {
        templateUrl: 'app/job-postings/views/add-edit-view.html',
        controller: 'jobPostingViewCtrl',
        controllerAs: "ctrl"
      }
    }
  });
});

'use strict';

angular.module('app.layout', ['ui.router']).config(function ($stateProvider, $urlRouterProvider) {
  $stateProvider.state('app', {
    abstract: true,
    views: {
      root: {
        templateUrl: 'app/layout/views/layout.tpl.html',
        controller: 'layoutCtrl'
      }
    }
  });
  $urlRouterProvider.otherwise('/home');
});

angular.module('app.home').controller("homeCtrl", function () {
  console.log("Hello World");
});
angular.module("app").run(["$templateCache", function ($templateCache) {
  $templateCache.put("src/layout/views/layout.tpl.html", "<div>\n    <div ng-include=\"\'app/layout/views/partials/header.partial.tpl.html\'\"></div>\n    <div ng-include = \"\'app/layout/views/partials/sidebar.partial.tpl.html\'\"></div>\n    <div class = \"main-content\">\n        <div data-ui-view=\"content\" data-autoscroll=\"false\"></div>\n    </div>\n</div>");
  $templateCache.put("src/layout/views/partials/header.partial.tpl.html", "<nav class=\"navbar navbar-default\">\n    <div class=\"container-fluid\">\n        <!-- Brand and toggle get grouped for better mobile display -->\n        <div class=\"navbar-header\">\n            <a class=\"navbar-brand\" ui-sref=\"app.home\">LUE Website Administration</a>\n        </div>\n        <ul class=\"nav navbar-nav navbar-right\">\n            <li><a class = \"navbar-right\"><i class =\"fa  fa-2x fa-sign-out\"></i></a></li>\n        </ul>\n    </div><!-- /.container-fluid -->\n</nav>\n");
  $templateCache.put("src/layout/views/partials/sidebar.partial.tpl.html", "<div class = \"sidebar\">\n    <div class = \"sidebar-header\">Navigation</div>\n    <ul class = \"sidebar-list\">\n        <li class = \"sidebar-content\">\n            <a ui-sref=\"app.jobpostings.home\">\n                <div class = \"item-media\"><i class =\"fa fa-lg fa-fw fa-child\"></i></div>\n                <div class =\"item-label\">Job Posting</div>\n            </a>\n        </li>\n\n    </ul>\n</div>\n");
}]);
angular.module('app.common').component('addManyLocations', {
  template: "\n  <div>\n    <label>{{ctrl.title}}</label>\n    <button class =\"btn btn-default form-control\" ng-click=\"ctrl.addNew()\">Add New {{ctrl.title}}</button>\n    <p></p>\n    <div ng-repeat =\"item in ctrl.srcArray track by $index\">\n      <div class = \"row form-group\">\n        <div class =\"col-md-6\">\n          <input placeholder=\"{{ctrl.title}}...\" ng-model=\"item.city\" class = \"form-control\" type = \"text\">\n        </div>\n        <div class =\"col-md-5\">\n          <select class = \"form-control\" ng-model =\"item.state\">\n            <option value=\"CA\">California</option>\n            <option value=\"AZ\">Arizona</option>\n          </select>\n        </div>\n        <div class =\"col-md-1\">\n          <i class =\"fa fa-minus fa-2x\" ng-click=\"ctrl.removeItem($index)\"></i>\n        </div>\n      </div>\n    </div>\n  </div>\n  ",
  controller: function controller() {
    var self = this;
    console.log("in add many ctrl");
    self.addNew = function () {
      self.srcArray.push({ city: "", state: "CA" });
    };
    self.removeItem = function (index) {
      _.pullAt(self.srcArray, index);
    };
  },
  controllerAs: "ctrl",
  bindings: {
    srcArray: '=',
    title: '@'
  }
});

angular.module('app.common').component('addManyQualifications', {
  template: "\n  <div>\n    <label>{{ctrl.title}}</label>\n    <button class =\"btn btn-default form-control\" ng-click=\"ctrl.addNew()\">Add New {{ctrl.title}}</button>\n    <p></p>\n    <div ng-repeat =\"item in ctrl.srcArray track by $index\">\n      <div class = \"row form-group\">\n        <div class =\"col-md-11\">\n          <input placeholder=\"{{ctrl.title}}...\" ng-model=\"item.name\" class = \"form-control\" type = \"text\">\n        </div>\n        <div class =\"col-md-1\">\n          <i class =\"fa fa-minus fa-2x\" ng-click=\"ctrl.removeItem($index)\"></i>\n        </div>\n      </div>\n    </div>\n  </div>\n  ",
  controller: function controller() {
    var self = this;
    console.log("in add many ctrl");
    self.addNew = function () {
      self.srcArray.push({ name: "" });
    };
    self.removeItem = function (index) {
      _.pullAt(self.srcArray, index);
    };
  },
  controllerAs: "ctrl",
  bindings: {
    srcArray: '=',
    title: '@'
  }
});

angular.module('app.common').component('previewJobPosting', {
  template: "\n    <div class=\"container\">\n\n  <!-- Page Content -->\n  <button ng-click=\"ctrl.flip()\" class =\"btn btn-default form-control\">minimize{{ctrl.minimize}}</button>\n  <div ng-hide =\"ctrl.minimize\">\n    <div class=\"container\">\n      <!-- Page Heading/Breadcrumbs -->\n      <div class=\"row\">\n          <div class=\"col-lg-12\">\n              <h2 class=\"page-header\">Apply</h2>\n              <ol class=\"breadcrumb\">\n                  <li><a href=\"home\">Home</a>\n                  </li>\n                  <li><a href=\"careers\">Careers</a></li>\n                  <li class=\"active\">Apply</li>\n              </ol>\n          </div>\n      </div>\n      <div class=\"row\">\n        <div class=\"col-lg-12\">\n\n\n          <h1 class = \"page-header\">{{ctrl.jobPosting.jobTitle}} <small>{{ctrl.jobPosting.contractType}} <br>{{ctrl.jobPosting.locations | location}}</small></h1>\n          <div class=\"panel panel-default\">\n            <div class=\"panel-body\">\n              <h5 class = \"page-header\">About L.U. ELECTRIC, INC.</h5>\n              <p>\n                {{ctrl.jobPosting.aboutLu}}\n              </p>\n              <h5 class = \"page-header\">Job Description</h5>\n              <p>\n                {{ctrl.jobPosting.jobDescription}}\n              </p>\n              <h5 class=\"page-header\">Preferred Qualifications</h5>\n              <ul>\n                <li ng-repeat=\"qualification in ctrl.jobPosting.qualifications track by $index\">{{qualification.name}}</li>\n              </ul>\n              <h5 class = \"page-header\">Additional information</h5>\n                <p>\n                {{ctrl.jobPosting.additionalInfo}}\n                <br><b>Please email resume to <a href=\"mailto:<?php echo CAREER_CONTACT ?>\"><?php echo CAREER_CONTACT ?>.</a><b>\n                </p>\n            </div>\n        </div>\n      </div>\n    </div>\n  </div>\n</div>\n  ",
  controller: function controller() {

    var self = this;
    self.minimize = false;
    self.flip = function () {
      self.minimize = !self.minimize;
    };
  },
  controllerAs: "ctrl",
  bindings: {
    jobPosting: '='
  }
});

angular.module('app.common').filter('location', function () {
  return function (input) {
    console.log(input);
    var out = "";
    for (var lcv = 0; lcv < input.length; lcv++) {
      if (lcv !== input.length - 1) {
        out += input[lcv].city + ", " + input[lcv].state + " - ";
      } else {
        out += input[lcv].city + ", " + input[lcv].state;
      }
    }
    return out;
  };
});

angular.module("app.jobpostings").controller("JobPostingAddCtrl", function () {
  var self = this;
  self.jobPosting = {
    locations: [{ city: "Orange County", state: "CA" }, { city: "Los Angeles", state: "CA" }],
    qualifications: [{ name: "" }]
  };
});

angular.module("app.jobpostings").controller("JobPostingEditCtrl", function () {});

angular.module("app.jobpostings").controller("JobPostingHomeCtrl", function () {
  var self = this;
  console.log("in home ctrl");
  self.gridOptions = {};
  self.gridOptions.data = [{ msg: "eyy" }];
});

angular.module("app.jobpostings").controller("JobPostingViewCtrl", function () {});

angular.module("app.layout").controller("layoutCtrl", function () {
  console.log("inside layout");
});