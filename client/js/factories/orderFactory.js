app.factory('orderFactory', function($http) {
  var factory = {};
  var friends = [];
  factory.getOrders = function(callback) {
    $http.get('/orders',{}).then(function(response){
      orders = response.data;
      callback(orders);
    }, function() {
      console.log("Error: could not load /orders");
    });
  }
  factory.deleteOrder = function(callback, order) {
    var errors = [];
    // friends.splice(friends.indexOf(friend), 1);
    $http.delete('/orders/'+order._id, {}).then(function(response) {
      $http.get('/orders',{}).then(function(response){
        orders = response.data;
        errors = response.data.errors;
        callback(errors, orders);
      });
    }, function() {
      console.log("Error in orderFactory.deleteOrder!");
    });
  }
  factory.createOrder = function(callback, order) {
    console.log(order);
    var errors = [];
    if(!order) {
      errors.push("Please enter an order!");
    }
    else {
      if(!order.customer) {
        errors.push("Please select a customer!");
      }
      if(!order.product) {
        errors.push("Please select a product!");
      }
      if(!order.qty) {
        errors.push("Please select a quantity!");
      }
    }
    if(!errors.length) {
      $http.post('/orders',{customer: order.customer._id, product: order.product._id, qty: order.qty}).then(function(response){
        console.log("returned:",response.data);
        callback(response.data);
      }), function() {
        console.log("Error in friendFactory.newFriend")
      }
    }
    else {
      callback({errors:errors});
    }
  }
  return factory;
});
