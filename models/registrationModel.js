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
    },
    socketId: {
        type: String,
        default: null
    }

});

module.exports = mongoose.model('users', registrationSchema);
