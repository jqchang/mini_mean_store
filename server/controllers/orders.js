var mongoose = require('mongoose');
var Product = mongoose.model('Product');
var Order = mongoose.model('Order');

module.exports = {
  index: function(req, res) {
    console.log("req",req.body);
    Order.find({}).populate('customer').populate('product').exec(function(err, orders) {
      if(err) {
        res.json({errors:err})
      } else {
        res.json(orders);
      }
    })
  },
  show: function(req, res) {
    Order.findOne({_id:req.params.id}, function(err, order) {
      if(err) {
        console.log("error in root")
        res.json({errors:err})
      } else {
        res.json(order);
      }
    })
  },
  create: function(req, res) {
    var errors = [];
    var order = new Order({product: req.body.product, customer: req.body.customer, qty: req.body.qty});
    Product.findOne({_id:req.body.product}, function(err, data) {
      console.log("data",data);
      if(!order.product) {
        errors.push("Please select a product!");
      }
      if(!order.customer){
        errors.push("Please select a customer!");
      }
      if(order.qty === undefined) {
        errors.push("Please select a quantity!");
      }
      if(order.qty <= 0) {
        errors.push("Quantity must be positive!");
      }
      else if(order.qty > data.qty) {
        errors.push("Not enough stock!");
      }
      if(!errors.length) {
        order.save(function(err){
          if(err) {
            console.log('something went wrong in post /submit save');
            res.json({errors:err});
          } else {
            console.log('successfully added a order!');
            res.json(order);
          }
        })
        Product.update({_id:req.body.product}, {qty:(data.qty-order.qty)}, function(err, data){
          if(err) {
            console.log("error updating quantity")
          } else {
            console.log("quantity updated")
          }
        })
      }
      else {
        console.log("ERR:", errors)
        res.json({errors:errors});
      }
    });
  },
  update: function(req, res) {
    // console.log("PUT DATA", req.body);
    Order.findOne({_id:req.params.id}, function(err, order) {
      if(err) {
        console.log("error in UPDATE:id")
        res.json({errors:err})
      }
      else {
        order.name = req.body.name;
        order.save(function(err) {
          if(err) {
            console.log('error in UPDATE:id post-find')
            res.json({errors:err});
          }
          else {
            console.log("PUT no errors, Redirecting")
            res.json(order);
            // res.redirect('back')
          }
        });
      }
    });
  },
  delete: function(req, res) {
    Order.deleteOne({_id:req.params.id}, function(err, order) {
      if(err) {
        console.log("error in DELETE:id")
        res.json({success:"false", errors:err});
      }
      else {
        res.json({success:"true"})
      }
    });
  }
}
