const Registration = require("../models/registrationModel");
var config = require("../config/session");
var jwt = require("jsonwebtoken");
var secret = config.secret;
const bcrypt = require("bcrypt");
const passport = require("passport");

function verifyUserNameExist(user) {
  return new Promise(function(resolve, reject) {
    Registration.find({
      $or: [{ userName: user.userName }, { email: user.email }]
    }).then(users => {
      if (users.length) {
        return reject({
          code: 400,
          message: "Email or username already exist"
        });
      } else {
        return resolve(user);
      }
    });
  });
}

function registerUser(user) {
  return new Promise((resolve, reject) => {
    verifyUserNameExist(user)
      .then(user => {
        const registration = new Registration(user);
        registration
          .save()
          .then(data => {
            return resolve({
              message: "user registered successfully"
            });

          })
          .catch(err => {
            return reject({
              message: "unable to save to database"
            });
          });
      })
      .catch(err => {
        return reject(err);
      });
  });
}

function login(userDetails) {
  return new Promise((resolve, reject) => {
    Registration.findOne({userName: userDetails.userName}).then(user => {

      if(user){
        return resolve (authenticateUser(user, userDetails.password));
      }
      else {
        return reject({
          code:403,
          message: "user name does not exist"
        })
      }
    }).catch(err => {
      return reject(err);
    })
  })
}

function authenticateUser(user, password) {
  return new Promise((resolve, reject) => {
    if(user.password === password) {
        return resolve(getAuthenticatedResponse(user));
    }
    else{
      return reject({
        code: 403,
        message: "Invalid Password"
      });
    }
  });
}

function getAuthenticatedResponse(user) {
  if (!user) {
    return null;
  }

    var userData = user;
    var data = {};
    data.userName = userData.userName;
    data._id = userData._id;
    data.email = userData.email;
    data.isAdmin = userData.isAdmin;
    data.token = authenticate(userData);
    return data;

}

function authenticate(userData) {
  if (!userData) {
    return null;
  }
  // generate a user id and authenticate
  var payload = {
    userInfo: userData._id
  };
  // return token and user information with a refresh token
  var options = {
    expiresIn: 86400 // expires in 24 hours
  };

  return jwt.sign(payload, secret, options);
}



module.exports = {
  registerUser,
  verifyUserNameExist,
  authenticateUser,
  login
};
