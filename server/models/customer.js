var mongoose = require('mongoose');

var CustomerSchema = new mongoose.Schema({
  name: {type: String, required: true},
}, {timestamps: true});

var Customer = mongoose.model('Customer', CustomerSchema);
