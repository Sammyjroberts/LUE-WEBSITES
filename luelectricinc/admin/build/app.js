angular.module('app',[
    "ui.router",
    "app.layout",
    "app.home"
]);
"use strict";

angular.module('app.home', ['ui.router'])

    .config(function ($stateProvider) {
        $stateProvider
            .state('app.home', {
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
"use strict";

angular.module('app.layout', ['ui.router'])

    .config(function ($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('app', {
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
angular.module('app.home').controller("homeCtrl", function() {
    console.log("Hello World");
})
angular.module("app").run(["$templateCache", function($templateCache) {$templateCache.put("src/layout/views/layout.tpl.html","<div>\r\n    <div ng-include=\"\'app/layout/views/partials/header.partial.tpl.html\'\"></div>\r\n    <div ng-include = \"\'app/layout/views/partials/sidebar.partial.tpl.html\'\"></div>\r\n    <div class = \"main-content\">\r\n        <div data-ui-view=\"content\" data-autoscroll=\"false\"></div>\r\n    </div>\r\n</div>");
$templateCache.put("src/layout/views/partials/header.partial.tpl.html","<nav class=\"navbar navbar-default\">\r\n    <div class=\"container-fluid\">\r\n        <!-- Brand and toggle get grouped for better mobile display -->\r\n        <div class=\"navbar-header\">\r\n            <button type=\"button\" class=\"navbar-toggle collapsed\" data-toggle=\"collapse\" data-target=\"#bs-example-navbar-collapse-1\" aria-expanded=\"false\">\r\n                <span class=\"sr-only\">Toggle navigation</span>\r\n                <span class=\"icon-bar\"></span>\r\n                <span class=\"icon-bar\"></span>\r\n                <span class=\"icon-bar\"></span>\r\n            </button>\r\n            <a class=\"navbar-brand\" href=\"#\">Sleepy API</a>\r\n        </div>\r\n\r\n        <!-- Collect the nav links, forms, and other content for toggling -->\r\n        <div class=\"collapse navbar-collapse\" id=\"bs-example-navbar-collapse-1\">\r\n            <ul class=\"nav navbar-nav\">\r\n                <li class=\"active\"><a href=\"#\">Link <span class=\"sr-only\">(current)</span></a></li>\r\n                <li><a href=\"#\">Link</a></li>\r\n                <li class=\"dropdown\">\r\n                    <a href=\"#\" class=\"dropdown-toggle\" data-toggle=\"dropdown\" role=\"button\" aria-haspopup=\"true\" aria-expanded=\"false\">Dropdown <span class=\"caret\"></span></a>\r\n                    <ul class=\"dropdown-menu\">\r\n                        <li><a href=\"#\">Action</a></li>\r\n                        <li><a href=\"#\">Another action</a></li>\r\n                        <li><a href=\"#\">Something else here</a></li>\r\n                        <li role=\"separator\" class=\"divider\"></li>\r\n                        <li><a href=\"#\">Separated link</a></li>\r\n                        <li role=\"separator\" class=\"divider\"></li>\r\n                        <li><a href=\"#\">One more separated link</a></li>\r\n                    </ul>\r\n                </li>\r\n            </ul>\r\n            <form class=\"navbar-form navbar-left\" role=\"search\">\r\n                <div class=\"form-group\">\r\n                    <input type=\"text\" class=\"form-control\" placeholder=\"Search\">\r\n                </div>\r\n                <button type=\"submit\" class=\"btn btn-default\">Submit</button>\r\n            </form>\r\n            <ul class=\"nav navbar-nav navbar-right\">\r\n                <li><a href=\"#\">Link</a></li>\r\n                <li class=\"dropdown\">\r\n                    <a href=\"#\" class=\"dropdown-toggle\" data-toggle=\"dropdown\" role=\"button\" aria-haspopup=\"true\" aria-expanded=\"false\">Dropdown <span class=\"caret\"></span></a>\r\n                    <ul class=\"dropdown-menu\">\r\n                        <li><a href=\"#\">Action</a></li>\r\n                        <li><a href=\"#\">Another action</a></li>\r\n                        <li><a href=\"#\">Something else here</a></li>\r\n                        <li role=\"separator\" class=\"divider\"></li>\r\n                        <li><a href=\"#\">Separated link</a></li>\r\n                    </ul>\r\n                </li>\r\n            </ul>\r\n        </div><!-- /.navbar-collapse -->\r\n    </div><!-- /.container-fluid -->\r\n</nav>");
$templateCache.put("src/layout/views/partials/sidebar.partial.tpl.html","<div class = \"sidebar\">\r\n    <div class = \"sidebar-header\">Navigation</div>\r\n    <ul class = \"sidebar-list\">\r\n        <li class = \"sidebar-content\">\r\n            <a href=\"\">\r\n                <div class = \"item-media\"><i class =\"fa fa-lg fa-fw fa-home\"></i></div>\r\n                <div class =\"item-label\">Item 1</div>\r\n            </a>\r\n        </li>\r\n        <li class = \"sidebar-content\">\r\n            <a href=\"\">\r\n                <div class = \"item-media\"><i class =\"fa fa-lg fa-fw fa-home\"></i></div>\r\n                <div class =\"item-label\">Item 2</div>\r\n            </a>\r\n        </li>\r\n        <li class = \"sidebar-content\">\r\n            <a href=\"\">\r\n                <div class = \"item-media\"><i class =\"fa fa-lg fa-fw fa-home\"></i></div>\r\n                <div class =\"item-label\">Item 3</div>\r\n            </a>\r\n        </li>\r\n        <li class = \"sidebar-content\">\r\n            <a href=\"\">\r\n                <div class = \"item-media\"><i class =\"fa fa-lg fa-fw fa-home\"></i></div>\r\n                <div class =\"item-label\">Item 4</div>\r\n            </a>\r\n        </li>\r\n        <li class = \"sidebar-content\">\r\n            <a href=\"\">\r\n                <div class = \"item-media\"><i class =\"fa fa-lg fa-fw fa-home\"></i></div>\r\n                <div class =\"item-label\">Item 5</div>\r\n            </a>\r\n        </li>\r\n    </ul>\r\n</div>");}]);
angular.module("app.layout").controller("layoutCtrl", function() {
    console.log("inside layout")
})