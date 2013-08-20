'use strict';

var mage = angular.module(
  "mage", 
  [
    "ui.bootstrap",
    "leaflet-directive",
    "mage.***REMOVED***s",
    "mage.userService",
    "mage.deviceService",
    "mage.layerService",
    "mage.featureService",
    "mage.timerService",
    "mage.locationService",
    "mage.iconService",
    "mage.aboutService",
    "mage.lib"])
  .config(function ($routeProvider, $locationProvider, $httpProvider) {
    $httpProvider.defaults.withCredentials = true;
    $httpProvider.defaults.headers.post  = {'Content-Type': 'application/x-www-form-urlencoded'};

    var resolveLogin = function(roles) {
      return {
        user: function(UserService) {
         return UserService.login(roles);
        }
      }
    }

    $routeProvider.when('/signin',
    {
      templateUrl:    'js/app/partials/signin.html',
      controller:     "SigninController",
      resolve: resolveLogin()
    });
    $routeProvider.when('/signup',
    {
      templateUrl:    'js/app/partials/signup.html',
      controller:     "SignupController"
      //resolve: resolveLogin()
    }); 
    $routeProvider.when('/admin',
    {
      templateUrl:    'js/app/partials/admin.html',
      controller:     "AdminController",
      resolve: resolveLogin(["ADMIN_ROLE"])
    });
    $routeProvider.when('/map',
    {
      templateUrl:    'js/app/partials/map.html', 
      controller:     "MapController", 
      resolve: resolveLogin(["USER_ROLE", "ADMIN_ROLE"])
    });
    $routeProvider.when('/layers', 
    {
      templateUrl:    "js/app/partials/layers.html",
      controller:      "LayerController",
      resolve: resolveLogin(["ADMIN_ROLE"])
    });
    $routeProvider.when('/user', 
    {
      templateUrl:    "js/app/partials/user.html",
      controller:      "UserController",
      resolve: resolveLogin(["USER_ROLE", "ADMIN_ROLE"])
    });
    $routeProvider.when('/about', 
    {
      templateUrl:    "/js/app/partials/about.html",
      controller:     "AboutController",
      resolve: resolveLogin(["USER_ROLE", "ADMIN_ROLE"])
    });
    $routeProvider.when('/aboot', {
      templateUrl:    "/js/app/partials/about.html",
      controller:     AboutController  
    });
    $routeProvider.otherwise(
    {
      redirectTo:     '/signin',
      controller:     SigninController, 
    }
  );
});