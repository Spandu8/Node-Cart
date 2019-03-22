var mongoose = require('mongoose');
const Schema = mongoose.Schema;

var productSchema = new Schema({

  name: {
    type: String,
    required: true
  },
  amount: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('product', productSchema);
