const registrationService = require("../services/registerService");
const bcrypt = require("bcrypt");

exports.registerUser = (req, res) => {
  var user = req.body;
    registrationService
      .registerUser(req.body)
      .then(result => {
        res.send(result);
      })
      .catch(err => {
        res.send(err);
      });
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
