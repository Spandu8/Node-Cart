var mongoose = require('mongoose');
const Schema = mongoose.Schema;

var productSchema = new Schema({

  name: {
    type: String,
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  isAddedToCart: {
    type: Boolean,
    default: false
  }
});

module.exports = mongoose.model('product', productSchema);
