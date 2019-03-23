var mongoose = require('mongoose');
const Schema = mongoose.Schema;

var cartSchema = new Schema({

  userId: {
    type: String,
    required: true
  },
  productId: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('cart', cartSchema);
