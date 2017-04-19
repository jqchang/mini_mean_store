var app = angular.module('myApp', ['ngRoute']);

app.filter('range', function() {
  return function(input, min, max) {
    min = parseInt(min); //Make string input int
    max = parseInt(max);
    for (var i=min; i<max; i++)
      input.push(i);
    return input;
  };
});

app.config(function($routeProvider) {
  $routeProvider
  .when('/', {
    templateUrl: 'partials/dashboard.html',
    controller: 'OrderController',
  })
  .when('/customers', {
    templateUrl: 'partials/customers.html',
    controller: 'CustomerController',
  })
  .when('/products', {
    templateUrl: 'partials/products.html',
    controller: 'ProductController',
  })
  .when('/orders', {
    templateUrl: 'partials/orders.html',
    controller: 'OrderController',
  })
  .when('/settings', {
    templateUrl: 'partials/settings.html',
    // controller: 'CustomerController',
  })
  .otherwise({
    redirectTo: '/'
  })
});
