app.factory('customerFactory', function($http) {
  var factory = {};
  var friends = [];
  factory.getCustomers = function(callback) {
    $http.get('/customers',{}).then(function(response){
      customers = response.data;
      callback(customers);
    }, function() {
      console.log("Error: could not load /customers");
    });
  }
  factory.deleteCustomer = function(callback, customer) {
    var errors = [];
    // friends.splice(friends.indexOf(friend), 1);
    $http.delete('/customers/'+customer._id, {}).then(function(response) {
      $http.get('/customers',{}).then(function(response){
        customers = response.data;
        errors = response.errors;
        callback(errors, customers);
      });
    }, function() {
      console.log("Error in customerFactory.deleteCustomer!");
    });
  }
  factory.createCustomer = function(callback, customer) {
    $http.post('/customers',{name: customer.name}).then(function(response){
      console.log("returned:",response.data);
      callback(response.data);
    }), function() {
      console.log("Error in friendFactory.newFriend")
    }
  }
  return factory;
});
