app.controller('CustomerController', ['$scope', '$routeParams', '$location', 'customerFactory', function($scope, $routeParams, $location, customerFactory) {
  $scope.customers = [];
  $scope.errors = [];
  $scope.ordering = '-createdAt';

  customerFactory.getCustomers(function(data){
    if(!data.errors) {
      $scope.customers = data;
    }
    else {
      $scope.errors = [`Could not retrieve customer list`]
    }
  });
  $scope.order = function(str) {
    if($scope.ordering != str) {
      $scope.ordering = str;
    }
    else {
      $scope.ordering = '-' + str;
    }
  }
  $scope.delete = function(customer) {
    customerFactory.deleteCustomer(function(err, customers){
      $scope.errors = err;
      $scope.customers = customers
      if(!$scope.errors){
        console.log("No errors");
        $location.url('/customers');
      }
      else {
        console.log("Err:",$scope.errors);
        $location.url('/customers');
      }
    }, customer);
  }
  $scope.create = function(){
    customerFactory.createCustomer(function(data) {
      $scope.errors = data.errors;
      if(!$scope.errors) {
        customerFactory.getCustomers(function(list) {
          $scope.customers = list;
          $scope.newCustomer = {};
        })
      }
      console.log($scope.errors);
    }, $scope.newCustomer)
  }
}]);
