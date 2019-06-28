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
  },
  fileUpload: {
    name: {
      type: String,
      required: true
    },
    originalName: {
      type: String,
      required: true
    }
 }
});

module.exports = mongoose.model('product', productSchema);
