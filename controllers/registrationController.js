const registrationService = require("../services/registerService");
const bcrypt = require("bcrypt");

exports.registerUser = (req, res) => {
  var user = req.body;
  if(!user.email || !user.userName || !user.password) {
    res.send({
      code:400,
      message: 'All fields are mandatory '
    })
  } else{
    registrationService
      .registerUser(req.body)
      .then(result => {
        res.send(result);
      })
      .catch(err => {
        res.send(err);
      });
    }
};

exports.login = (req, res) => {
      registrationService
        .login(req.body)
        .then(user => {
          res.send(user);
        })
        .catch(err => {
          res.send(err);
        });


};
