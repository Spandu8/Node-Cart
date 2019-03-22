const registrationService = require("../services/registerService");
const bcrypt = require("bcrypt");
const CONSTS = require("../constants");

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
  console.log(req.body, "req")

      registrationService
        .login(req.body)
        .then(user => {
          res.send(user);
        })
        .catch(err => {
          res.send(err);
        });


};

exports.getUser = (req, res) => {
  registrationService
    .getUserDetails(req.params.id)
    .then(result => {
      res.send(result);
    })
    .catch(err => {
      res.send(err);
    });
};
