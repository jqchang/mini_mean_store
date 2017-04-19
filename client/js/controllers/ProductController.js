app.controller('ProductController', ['$scope', '$routeParams', '$location', 'productFactory', function($scope, $routeParams, $location, productFactory) {
  $scope.products = [];
  $scope.errors = [];
  $scope.ordering = '-createdAt';

  productFactory.getProducts(function(data){
    if(!data.errors) {
      $scope.products = data;
    }
    else {
      $scope.errors = [`Could not retrieve product list`]
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
  $scope.delete = function(product) {
    productFactory.deleteProduct(function(err, products){
      $scope.errors = err;
      $scope.products = products
      if(!$scope.errors){
        console.log("No errors");
        $location.url('/products');
      }
      else {
        console.log("Err:",$scope.errors);
        $location.url('/products');
      }
    }, product);
  }
  $scope.create = function(){
    productFactory.createProduct(function(data) {
      $scope.errors = data.errors;
      if(!$scope.errors) {
        productFactory.getProducts(function(list) {
          $scope.products = list;
          $scope.newProduct = {};
        })
      }
      console.log($scope.errors);
    }, $scope.newProduct)
  }
}]);
