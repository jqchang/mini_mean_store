var mongoose = require('mongoose');
var Product = mongoose.model('Product');

module.exports = {
  index: function(req, res) {
    Product.find({}, function(err, products) {
      if(err) {
        res.json({errors:err})
      } else {
        res.json(products);
      }
    })
  },
  show: function(req, res) {
    Product.findOne({_id:req.params.id}, function(err, product) {
      if(err) {
        console.log("error in root")
        res.json({errors:err})
      } else {
        res.json(product);
      }
    })
  },
  create: function(req, res) {
    var errors = [];
    var product = new Product({name: req.body.name, imgurl: req.body.imgurl, description: req.body.description, qty: req.body.qty});
    if(!product.name) {
      errors.push("Name is required!");
    }
    if(!product.description) {
      errors.push("Description is required!");
    }
    if(!product.qty) {
      errors.push("Quantity is required!");
    }
    else if(product.qty < 0) {
      errors.push("Quantity must be non-negative!");
    }
    if(!errors.length) {
      product.save(function(err){
        if(err) {
          console.log('something went wrong in post /submit save');
          res.json({errors:err});
        } else {
          console.log('successfully added a product!');
          res.json(product);
        }
      })
    }
    else {
      console.log("ERR:", errors)
      res.json({errors:errors});
    }
  },
  update: function(req, res) {
    // console.log("PUT DATA", req.body);
    Product.findOne({_id:req.params.id}, function(err, product) {
      if(err) {
        console.log("error in UPDATE:id")
        res.json({errors:err})
      }
      else {
        product.name = req.body.name;
        product.save(function(err) {
          if(err) {
            console.log('error in UPDATE:id post-find')
            res.json({errors:err});
          }
          else {
            console.log("PUT no errors, Redirecting")
            res.json(product);
            // res.redirect('back')
          }
        });
      }
    });
  },
  delete: function(req, res) {
    Product.deleteOne({_id:req.params.id}, function(err, product) {
      if(err) {
        console.log("error in DELETE:id")
        res.json({success:"false", errors:err});
      }
      else {
        Order.deleteMany({product:req.params.id}, function(err) {
          console.log("All associated orders deleted");
        })
        res.json({success:"true"})
      }
    });
  }
}
