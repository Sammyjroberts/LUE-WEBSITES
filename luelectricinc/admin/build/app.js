"use strict";

angular.module('app', [
//external
"ui.router", "ui.grid",
//internal
"app.common", "app.auth", "app.layout", "app.home", "app.jobpostings"]).constant('_', window._).config(function () {}).run(function ($rootScope, $state, $stateParams, auth) {
  $rootScope.$on("$stateChangeStart", function (event, toState, toParams, fromState, fromParams) {

    auth.authenticatedStateChange(toState, event);
  });
});

angular.module('app.auth', ['ui.router']);

angular.module('app.auth').config(function ($stateProvider) {
  $stateProvider.state('login', {
    url: '/login/',
    views: {
      "root": {
        templateUrl: 'app/auth/views/login.html',
        controller: 'loginCtrl',
        controllerAs: "ctrl"
      }
    },
    data: {
      title: 'Login',
      htmlId: 'extr-page'
    }
  });
});

angular.module('app.common', []);

"use strict";

angular.module('app.home', ['ui.router']).config(function ($stateProvider) {
  $stateProvider.state('app.home', {
    abstract: false,
    url: "/home",
    views: {
      "content@app": {
        template: '<div class = "container-fluid"><h1 class = "page-header">Welcome to the LUE Website Administration Application</h1></div>',
        controller: "homeCtrl"
      }
    }
  });
});

angular.module("app").run(["$templateCache", function ($templateCache) {
  $templateCache.put("src/layout/views/layout.tpl.html", "<div>\n    <div ng-include=\"\'app/layout/views/partials/header.partial.tpl.html\'\"></div>\n    <div ng-include = \"\'app/layout/views/partials/sidebar.partial.tpl.html\'\"></div>\n    <div class = \"main-content\">\n        <div data-ui-view=\"content\" data-autoscroll=\"false\"></div>\n    </div>\n</div>");
  $templateCache.put("src/layout/views/partials/header.partial.tpl.html", "<nav class=\"navbar navbar-default navbar-fixed-top\">\n    <div class=\"container-fluid\">\n        <!-- Brand and toggle get grouped for better mobile display -->\n        <div class=\"navbar-header\">\n            <a class=\"navbar-brand\" ui-sref=\"app.home\">LUE Website Administration</a>\n        </div>\n        <ul class=\"nav navbar-nav navbar-right\">\n            <li><a class = \"navbar-right\" ng-click=\"ctrl.logout()\"><i class =\"fa  fa-2x fa-sign-out\"></i></a></li>\n        </ul>\n    </div><!-- /.container-fluid -->\n</nav>\n");
  $templateCache.put("src/layout/views/partials/sidebar.partial.tpl.html", "<div class = \"sidebar\">\n    <div class = \"sidebar-header\">Navigation</div>\n    <ul class = \"sidebar-list\">\n        <li class = \"sidebar-content\">\n            <a ui-sref=\"app.jobpostings.home\">\n                <div class = \"item-media\"><i class =\"fa fa-lg fa-fw fa-child\"></i></div>\n                <div class =\"item-label\">Job Posting</div>\n            </a>\n        </li>\n\n    </ul>\n</div>\n");
}]);

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
        controller: 'JobPostingEditCtrl',
        controllerAs: "ctrl"
      }
    }
  }).state('app.jobpostings.view', {
    url: "/job-postings/view/:id",
    views: {
      "content@app": {
        templateUrl: 'app/job-postings/views/add-edit-view.html',
        controller: 'JobPostingViewCtrl',
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
        controller: 'layoutCtrl',
        controllerAs: "ctrl"
      }
    }
  });
  $urlRouterProvider.otherwise('/home');
});

angular.module("app.auth").controller("loginCtrl", function (auth, $state) {
  var self = this;
  self.user = {};
  self.submit = function () {
    auth.login(self.user).then(function (response) {
      console.log(response);
      auth.saveToken(response.data.token);
      $state.go("app.home");
    }).catch(function (err) {
      console.error(err);
    });
  };
});

angular.module("app.auth").service("authHttp", function ($http, auth) {
  var self = this;
  self.get = function (url) {
    var req = {
      method: 'GET',
      url: url,
      headers: {
        'Authorization': 'Bearer ' + auth.getToken()
      }
    };
    return $http(req);
  };
  self.post = function (url, data) {
    var req = {
      method: 'POST',
      url: url,
      data: data,
      headers: {
        'Authorization': 'Bearer ' + auth.getToken()
      }
    };
    return $http(req);
  };
  self.put = function (url, data) {
    var req = {
      method: 'PUT',
      url: url,
      data: data,
      headers: {
        'Authorization': 'Bearer ' + auth.getToken()
      }
    };
    return $http(req);
  };
  self.delete = function (url) {
    var req = {
      method: 'DELETE',
      url: url,
      headers: {
        'Authorization': 'Bearer ' + auth.getToken()
      }
    };
    return $http(req);
  };

  return self;
});

angular.module("app.auth").service("auth", function ($window, $state, RouteGetter, $http) {
  var self = this;
  var model = "auth";
  var LOCAL_STORAGE_LOCATION = "jwt";

  self.permissionlessStates = ["login"];

  //saves token to location
  self.saveToken = function (token) {
    token = token || "";
    $window.localStorage.setItem(LOCAL_STORAGE_LOCATION, token);
  };

  // checks if jwt is expired, if expired forces login and removes jwt
  self.checkIfValid = function () {
    if ($window.localStorage[LOCAL_STORAGE_LOCATION]) {
      try {
        var token = self.getDecodedToken();
        var expDate = new Date(token.exp * 1000);
        if (expDate.getTime() <= Date.now()) {
          return false;
        }
      } catch (err) {
        console.error(err);
        return false;
      }
      return true;
    }
  };

  //removes jwt from local storage and forces you to go to the login page
  self.forceLogin = function () {
    $window.localStorage.removeItem(LOCAL_STORAGE_LOCATION);
    $state.go("login");
  };

  //returns decoded information
  self.getDecodedToken = function () {
    var token = $window.localStorage[LOCAL_STORAGE_LOCATION];
    return JSON.parse($window.atob(token.split('.')[1]));
  };
  self.getToken = function () {
    return $window.localStorage[LOCAL_STORAGE_LOCATION];
  };
  // run on every state change to see if we are good to swap states
  self.authenticatedStateChange = function (toState, event) {
    if (self.permissionlessStates.indexOf(toState.name.toString()) === -1) {
      console.log("state req permissions");
      if (!self.checkIfValid()) {
        console.log("--ERROR: not logged in");
        event.preventDefault();
        self.forceLogin();
      }
    }
  };
  //logs in
  self.login = function (data) {
    var route = RouteGetter.get(model);
    return $http.post(route, data);
  };

  return self;
});

angular.module('app.common').component('addManyLocations', {
  template: "\n  <div>\n    <label>{{ctrl.title}}</label>\n    <button class =\"btn btn-default form-control\" ng-click=\"ctrl.addNew()\">Add New {{ctrl.title}}</button>\n    <p></p>\n    <div ng-repeat =\"item in ctrl.srcArray track by $index\">\n      <div class = \"row form-group\">\n        <div class =\"col-md-6\">\n          <input placeholder=\"{{ctrl.title}}...\" ng-model=\"item.city\" class = \"form-control\" type = \"text\">\n        </div>\n        <div class =\"col-md-5\">\n          <select class = \"form-control\" ng-model =\"item.state\">\n            <option value=\"CA\">California</option>\n            <option value=\"AZ\">Arizona</option>\n          </select>\n        </div>\n        <div class =\"col-md-1\">\n          <i class =\"fa fa-minus fa-2x\" ng-click=\"ctrl.removeItem($index)\"></i>\n        </div>\n      </div>\n    </div>\n  </div>\n  ",
  controller: function controller() {
    var self = this;
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

angular.module("app.common").directive("autoHeight", function ($timeout) {
  return {
    restrict: 'A',
    link: function link($scope, element) {
      if (element[0].scrollHeight < 30) {
        element[0].style.height = 30;
      } else {
        element[0].style.height = element[0].scrollHeight + "px";
      }

      var resize = function resize() {
        return element[0].style.height = "" + element[0].scrollHeight + "px";
      };

      element.on("blur keyup change", resize);
      $timeout(resize, 0);
    }
  };
});

angular.module('app.common').component('fileUpload', {
  template: "\n  <label>Application File</label>\n  <input type=\"file\" class =\"form-control\" onchange=\"angular.element(this).scope().fileNameChanged(this)\">\n  <div class=\"progress\">\n    <div class=\"progress-bar\" role=\"progressbar\" aria-valuenow=\"70\"\n    aria-valuemin=\"0\" aria-valuemax=\"100\" ng-style=\"{width:ctrl.currentProgress}\">\n\n    </div>\n    {{ctrl.currentProgress}}\n  </div>\n  ",
  //angular.element(element).controller().startDownload()
  controller: function controller($scope, $window) {
    var self = this;
    self.currentProgress = "0%";
    var fr = new FileReader();
    fr.onload = function (loadEvent) {
      console.log("done");
      //encode file
      self.file = $window.btoa(loadEvent.target.result);
      console.log(self.file);
      $scope.$apply();
    };
    fr.onprogress = function (event) {
      console.log("progress");
      self.currentProgress = (event.loaded / event.total).toFixed(2) * 100 + "%";
      $scope.$apply();
    };
    $scope.fileNameChanged = function (guy) {
      self.name = guy.files[0].name;
      console.log("-----------" + self.name + "------------");
      fr.readAsBinaryString(guy.files[0]);
      $scope.$apply();
    };
  },
  controllerAs: "ctrl",
  bindings: {
    file: '=',
    name: '='
  }
});

angular.module('app.common').component('previewJobPosting', {
  template: "\n    <div class=\"container-fluid col-md-12\">\n\n  <!-- Page Content -->\n  <i ng-click=\"ctrl.flip()\" class=\" btn fa fa-minus-square-o fa-2x pull-right\"></i>\n  <div ng-hide =\"ctrl.minimize\">\n    <div class=\"container\">\n      <div class=\"row\">\n        <div class=\"col-lg-12\">\n\n\n          <h1 class = \"page-header\">{{ctrl.jobPosting.jobTitle}} <small>{{ctrl.jobPosting.contractType}} <br>{{ctrl.jobPosting.location | location}}</small></h1>\n          <div class=\"panel panel-default\">\n            <div class=\"panel-body\">\n              <h5 class = \"page-header\">About L.U. ELECTRIC, INC.</h5>\n              <p>\n                {{ctrl.jobPosting.aboutLu}}\n              </p>\n              <h5 class = \"page-header\">Job Description</h5>\n              <p>\n                {{ctrl.jobPosting.jobDescription}}\n              </p>\n              <h5 class=\"page-header\">Preferred Qualifications</h5>\n              <ul>\n                <li ng-repeat=\"qualification in ctrl.jobPosting.qualification track by $index\">{{qualification.name}}</li>\n              </ul>\n              <h5 class = \"page-header\">Additional information</h5>\n                <p>\n                {{ctrl.jobPosting.additionalInfo}}\n                <br><b>Please email resume to <a href=\"mailto:<?php echo CAREER_CONTACT ?>\"><?php echo CAREER_CONTACT ?>.</a><b>\n                </p>\n            </div>\n        </div>\n      </div>\n    </div>\n  </div>\n</div>\n  ",
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

angular.module("app.common").service("FormHelpers", function () {
  var FormHelpers = this;

  //configures form data STATES CAN ONLY BE EDIT ADD OR VIEW
  FormHelpers.formStateOpts = function (state) {
    var opts = {};
    opts.state = state;
    switch (state) {
      case "add":
        opts.canSubmit = true;
        opts.canDelete = false;
        opts.readOnly = false;
        break;
      case "edit":
        opts.canSubmit = true;
        opts.canDelete = true;
        opts.readOnly = false;
        break;
      case "view":
        opts.canSubmit = false;
        opts.canDelete = false;
        opts.readOnly = true;
        break;
      default:
        console.error("err");
        opts.canSubmit = false;
        opts.canDelete = false;
        opts.readOnly = true;
        break;
    }
    return opts;
  };
});

angular.module("app.common").service("RouteGetter", function () {
  var RouteGetter = this;
  var baseURL = "/api/api.php?";
  RouteGetter.get = function (model, id) {
    console.log(id);
    id = id || "";
    console.log(id);
    var tempURL = baseURL;
    tempURL += "model=" + model;
    if (id !== "") {
      tempURL += "&id=" + id;
    }
    console.log(tempURL);
    return tempURL;
  };
});

angular.module('app.home').controller("homeCtrl", function () {
  console.log("Hello World");
});
angular.module("app.jobpostings").controller("JobPostingAddCtrl", function (FormHelpers, JobPosting, authHttp, $state) {
  var self = this;
  JobPosting.initController(self, "add");
  self.submit = function () {
    console.log("submitting");
    console.log(self.jobPosting);
    var postingToPost = JobPosting.prepForPost(self.jobPosting);
    console.log(postingToPost);

    JobPosting.post(postingToPost).then(function (response) {
      console.log(response);
      $state.go("app.jobpostings.home");
    }).catch(function (err) {
      console.error(err);
    });
  };
});

angular.module("app.jobpostings").controller("JobPostingEditCtrl", function (JobPosting, $stateParams, $state) {
  var self = this;
  self.stateParams = $stateParams;
  JobPosting.initController(self, "edit").then(function (response) {
    console.log("data:application/octet-stream;charset=utf-16le;base64," + self.jobPosting.application);
  });
  self.delete = function () {
    JobPosting.delete($stateParams.id).then(function (response) {
      console.log(response);
      $state.go("app.jobpostings.home");
    }).catch(function (err) {
      console.error(err);
    });
  };
  self.submit = function () {
    console.log("submitting");
    console.log(self.jobPosting);
    var postingToPost = JobPosting.prepForPost(self.jobPosting);
    console.log(JSON.stringify(postingToPost));

    JobPosting.put(postingToPost, $stateParams.id).then(function (response) {
      console.log(response);
      $state.go("app.jobpostings.home");
    }).catch(function (err) {
      console.error(err);
    });
  };
});

angular.module("app.jobpostings").controller("JobPostingHomeCtrl", function (JobPosting) {
  var self = this;
  console.log("in home ctrl");

  self.gridOptions = {
    columnDefs: [{
      field: 'id',
      name: '',
      enableFiltering: false,
      enableSorting: false,
      cellTemplate: '<div class="ui-grid-cell-contents">' + '<a data-ui-sref="app.jobpostings.view({id: row.entity.id})"><i class="fa fa-lg fa-eye"></i></a>' + '<span>&nbsp &nbsp &nbsp</span>' + '<a data-ui-sref="app.jobpostings.edit({id: row.entity.id})"><i class="fa fa-lg fa-pencil-square-o"></i></a> </div>',
      width: 75
    }, {
      field: 'jobTitle',
      name: 'Job Title'
    }, {
      field: 'status',
      name: "Status"
    }, {
      field: 'contractType',
      name: 'Contract Type'
    }, {
      field: 'location',
      name: 'Locations'
    }]
  };
  self.gridOptions.data = [{ msg: "eyy" }];

  JobPosting.getAll().then(function (response) {
    console.log(response);
    response.data.forEach(function (post) {
      post.location = JobPosting.formatLocationsForView(post.location);
    });
    self.gridOptions.data = response.data;
  });
});

angular.module("app.jobpostings").controller("JobPostingViewCtrl", function (JobPosting, $stateParams) {
  var self = this;
  self.stateParams = $stateParams;
  JobPosting.initController(self, "view");
});

angular.module("app.jobpostings").service("JobPosting", function (FormHelpers, RouteGetter, authHttp) {
  var JobPosting = this;

  var model = "careers";
  JobPosting.getAll = function () {
    var route = RouteGetter.get(model);
    return authHttp.get(route);
  };
  JobPosting.getOne = function (id) {
    var route = RouteGetter.get(model, id);
    console.log(route);
    return authHttp.get(route);
  };
  JobPosting.post = function (data) {
    var route = RouteGetter.get(model);
    return authHttp.post(route, data);
  };
  JobPosting.put = function (data, id) {
    var route = RouteGetter.get(model, id);
    return authHttp.put(route, data);
  };
  JobPosting.delete = function (id) {
    var route = RouteGetter.get(model, id);
    return authHttp.delete(route);
  };

  function replaceAll(str, from, to) {
    var temp = _.split(str, from);
    temp = _.pull(temp, "");
    var newStr = "";
    temp.forEach(function (substr) {
      newStr += substr + to;
    });
    return newStr;
  }

  JobPosting.prepForPost = function (jobposting) {
    var toRet = JSON.stringify(jobposting);
    toRet = JSON.parse(toRet);
    var tempStr = "";
    toRet.location.forEach(function (loc) {
      tempStr += loc.city + ", " + loc.state + "$";
      console.log(loc);
      console.log("arr");
    });
    console.log(tempStr);
    var temp = tempStr;
    temp = temp.substr(0, temp.length - 1);
    toRet.location = temp;
    tempStr = "";
    toRet.qualification.forEach(function (qual) {
      tempStr += qual.name + "$";
    });
    var temp2 = tempStr;
    temp2 = temp2.substr(0, temp.length - 1);
    toRet.qualification = temp2;
    return toRet;
  };
  JobPosting.prepForForm = function () {};

  JobPosting.formatLocationsForView = function (locations) {
    console.log("formatting");
    var loc = replaceAll(locations, "$", " - ");
    console.log(loc);
    return loc;
  };

  JobPosting.initController = function (self, state) {
    return new Promise(function (resolve, reject) {
      //object model we will build
      self.jobPosting = {
        location: [{
          city: "Orange County",
          state: "CA"
        }, {
          city: "Los Angeles",
          state: "CA"
        }],
        qualification: [{
          name: ""
        }]

      };

      //schemas of reference fields to use in directives
      self.referenceFieldSchemas = {};

      //get access to the form helper service in the form
      self.FormHelpers = FormHelpers;

      //populate used Schemas
      //this form schema

      //form state
      self.formConfigOptions = FormHelpers.formStateOpts(state);

      //add default opts
      if (self.formConfigOptions.state === "add") {
        self.jobPosting.aboutLu = "A family owned business operating for over 25 years, the goal of L.U. Electric, Inc. is to provide best in class service with the highest level of professionalism and integrity. We value the many talents and abilities of our employees, and are seeking an experienced General Electrician to join ongoing projects in the OC and LA areas. We are selective and careful when it comes to hiring. Plenty of room for advancement and professional development.";
        self.jobPosting.additionalInfo = "L.U. Electric, Inc. is committed to hiring and retaining a diverse workforce. We are proud to be an Equal Opportunity/Affirmative Action Employer, making decisions without regard to race, color, religion, creed, sex, sexual orientation, gender identity, marital status, national origin, age, veteran status, disability, or any other protected class. ";
      }

      //based on state init jobPosting
      if (self.formConfigOptions.state === "edit" || self.formConfigOptions.state === "view") {

        //BEWARE - Only Italian chefs may venture forth. Grab you collander, spaghetti below.
        if (self.jobPosting.contractType) {
          self.jobPosting.contractType = self.jobPosting.contractType.toString();
        }
        if (self.jobPosting.status) {
          self.jobPosting.status = self.jobPosting.status.toString();
        }
        JobPosting.getOne(self.stateParams.id).then(function (response) {
          console.log(response);
          self.jobPosting = response.data;
          self.jobPosting.location = self.jobPosting.location.split("$");
          var formattedLocs = [];

          self.jobPosting.location.forEach(function (loc) {
            var temp = loc.split(",");
            loc = {};
            if (temp) {
              if (temp[0]) {
                loc.city = temp[0].trim();
              }
              if (temp[0]) {
                loc.state = temp[1].trim();
              }
            }
            if (loc) {
              formattedLocs.push(loc);
            }
          });
          self.jobPosting.location = formattedLocs;
          self.jobPosting.qualification = self.jobPosting.qualification.split("$");
          var formattedQuals = [];
          self.jobPosting.qualification.forEach(function (qual) {
            var tempQual = {};
            tempQual.name = qual;
            formattedQuals.push(tempQual);
          });
          self.jobPosting.qualification = formattedQuals;
          console.log(self.jobPosting);
          self.downloadPDF = function () {
            var elem = document.createElement("a");
            elem.href = "data:application/octet-stream;charset=utf-16le;base64," + self.jobPosting.application;
            elem.download = self.jobPosting.fileName;
            elem.target = "_blank";
            elem.click();
            elem.remove();
          };

          resolve(self);
        }).catch(function (err) {
          console.error(err);
          reject(err);
        });
      } else {
        resolve(self);
      }
    });
  };

  return JobPosting;
});

angular.module("app.layout").controller("layoutCtrl", function (auth) {
  var self = this;
  console.log("inside layout");
  self.logout = function () {
    console.log("loging out");
    auth.forceLogin();
  };
});