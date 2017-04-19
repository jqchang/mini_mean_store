app.controller('OrderController', ['$scope', '$routeParams', '$location', 'customerFactory', 'productFactory', 'orderFactory', function($scope, $routeParams, $location, customerFactory, productFactory, orderFactory) {
  $scope.customers = [];
  $scope.products = [];
  $scope.orders = [];
  $scope.errors = [];
  $scope.prodLimit = 5;
  $scope.custLimit = 3;
  $scope.orderLimit = 3;
  $scope.filter = "";
  $scope.ordering = '-createdAt';

  customerFactory.getCustomers(function(data){
    if(!data.errors) {
      $scope.customers = data;
    }
    else {
      $scope.errors = [`Could not retrieve customer list`]
    }
  });

  productFactory.getProducts(function(data){
    if(!data.errors) {
      $scope.products = data;
    }
    else {
      $scope.errors = [`Could not retrieve product list`]
    }
  });

  orderFactory.getOrders(function(data){
    if(!data.errors) {
      $scope.orders = data;
      console.log(data);
    }
    else {
      $scope.errors = [`Could not retrieve order list`]
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
    orderFactory.deleteOrder(function(err, orders){
      $scope.errors = err;
      $scope.orders = orders
      if(!$scope.errors){
        console.log("No errors");
        $location.url('/orders');
      }
      else {
        console.log("Err:",$scope.errors);
        $location.url('/orders');
      }
    }, customer);
  }

  $scope.create = function(){
    orderFactory.createOrder(function(data) {
      $scope.errors = data.errors;
      if(!$scope.errors) {
        orderFactory.getOrders(function(list) {
          $scope.orders = list;
          $scope.newOrder = {};
        })
        productFactory.getProducts(function(list) {
          $scope.products = list;
        })
      }
      console.log($scope.errors);
    }, $scope.newOrder)
  }

  $scope.showMore = function(str) {
    if(str == 'product') {
      $scope.prodLimit += 5;
      console.log('product limit increased');
    }
    else if(str == 'order') {
      $scope.orderLimit = $scope.orders.length;
      console.log('order limit maxed');
    }
    else if(str == 'customer') {
      $scope.custLimit = $scope.customers.length;
      console.log('customer limit maxed');
    }
  }
}]);
