var mongoose = require('mongoose');
var Customer = mongoose.model('Customer');
var Order = mongoose.model('Order');

module.exports = {
  index: function(req, res) {
    Customer.find({}, function(err, customers) {
      if(err) {
        res.json({errors:err})
      } else {
        res.json(customers);
      }
    })
  },
  show: function(req, res) {
    Customer.findOne({_id:req.params.id}, function(err, customer) {
      if(err) {
        console.log("error in root")
        res.json({errors:err})
      } else {
        res.json(customer);
      }
    })
  },
  create: function(req, res) {
    var errors = [];
    Customer.find({name:req.body.name}, function(err, data) {
      if(err) {
        console.log(err);
        res.json({errors:["Error communicating to database"]});
      }
      else {
        if(!data.length) {
          console.log("No matches found");
          var customer = new Customer({name:req.body.name});
          customer.save(function(err) {
            if(err) {
              console.log("Error saving new customer");
              res.json({errors:"Error saving new customer"})
            }
            else {
              console.log("No errors")
              res.json(customer);
            }
          })
        }
        else {
          res.json({errors:[data.length + " customer(s) already exist with that name"]})
        }
      }
    })

  },
  update: function(req, res) {
    // console.log("PUT DATA", req.body);
    Customer.findOne({_id:req.params.id}, function(err, customer) {
      if(err) {
        console.log("error in UPDATE:id")
        res.json({errors:err})
      }
      else {
        customer.name = req.body.name;
        customer.save(function(err) {
          if(err) {
            console.log('error in UPDATE:id post-find')
            res.json({errors:err});
          }
          else {
            console.log("PUT no errors, Redirecting")
            res.json(customer);
            // res.redirect('back')
          }
        });
      }
    });
  },
  delete: function(req, res) {
    Customer.deleteOne({_id:req.params.id}, function(err, customer) {
      if(err) {
        console.log("error in DELETE:id")
        res.json({success:"false", errors:err});
      }
      else {
        Order.deleteMany({customer:req.params.id}, function(err) {
          console.log("All associated orders deleted");
        })
        res.json({success:"true"})
      }
    });
  }
}
