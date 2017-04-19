var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var OrderSchema = new mongoose.Schema({
  product: {type: Schema.Types.ObjectId, ref: "Product"},
  customer: {type: Schema.Types.ObjectId, ref: "Customer"},
  qty: {type: Number, required: true},
}, {timestamps: true});

var Order = mongoose.model('Order', OrderSchema);
