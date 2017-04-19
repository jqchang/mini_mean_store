var mongoose = require('mongoose');

var ProductSchema = new mongoose.Schema({
  name: {type: String, required: true},
  imgurl: {type: String},
  description: {type: String, required: true},
  qty: {type: Number, required: true},
}, {timestamps: true});

var Product = mongoose.model('Product', ProductSchema);
