app.factory('productFactory', function($http) {
  var factory = {};
  var friends = [];
  factory.getProducts = function(callback) {
    $http.get('/products',{}).then(function(response){
      products = response.data;
      callback(products);
    }, function() {
      console.log("Error: could not load /products");
    });
  }
  factory.deleteProduct = function(callback, product) {
    var errors = [];
    // friends.splice(friends.indexOf(friend), 1);
    $http.delete('/products/'+product._id, {}).then(function(response) {
      $http.get('/products',{}).then(function(response){
        products = response.data;
        errors = response.errors;
        callback(errors, products);
      });
    }, function() {
      console.log("Error in productFactory.deleteProduct!");
    });
  }
  factory.createProduct = function(callback, product) {
    $http.post('/products',{name: product.name, imgurl: product.imgurl, description: product.description, qty: product.qty}).then(function(response){
      console.log("returned:",response.data);
      callback(response.data);
    }), function() {
      console.log("Error in friendFactory.newFriend")
    }
  }
  return factory;
});
