var mongoose = require('mongoose');
const Schema = mongoose.Schema;

var registrationSchema = new Schema({

    userName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    isAdmin: {
      type: Boolean
    }

});

module.exports = mongoose.model('users', registrationSchema);
