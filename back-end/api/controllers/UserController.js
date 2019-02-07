/**
 * UserController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */


var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

module.exports = {

  signUp: function (req, res) {
    if (!_.has(req.body, 'email') || !_.has(req.body, 'password') || !_.has(req.body, 'name')) {
      return res.serverError("No field should be empty.");
    }
    User.findOne({
      email: req.body.email
    }).exec(function callback(err, user) {
      if (err) {
        res.send(500, { error: "DB Error" });
      } else if (user) {
        res.send(400, {error: "Username already Taken"});
      } else {
        User.create({name: req.body.name, password: req.body.password, email: req.body.email}).exec(function(error, user) {
          if (error) {
            console.log(error);
            res.send(500, {error: "DB Error"});
          } else {
            module.exports.login(req,res);
          }
        });
      }

    });
  },

  login: function (req, res) {
    if (!_.has(req.body, 'email') || !_.has(req.body, 'password')) {
      return res.serverError("No field should be empty.");
    }
    User.findOne({
      email: req.body.email
    }).exec(function callback(err, user) {
      if (err) return res.serverError(err);
      if (!user) return res.serverError("User not found, please sign up.");
      //check password
      bcrypt.compare(req.body.password, user.password, function (error, matched) {
        if (error) return res.serverError(error);
        if (!matched) return res.serverError("Invalid password.");
        //save the date the token was generated for already inside toJSON()
        var token = jwt.sign(user.toJSON(), "this is my secret key", {
          expiresIn: '10m'
        });
        //return the token here
        res.ok(token);
      });

    });
  },

  token: function (req, res) {
    User.findOne(req.user.id).exec(function callback(error, user) {
      if (error) return res.serverError(error);
      if (!user) return res.serverError("User not found");
      var token = jwt.sign(user.toJSON(), "this is my secret key", {
        expiresIn: '10m'
      });
      res.ok(token);
    });
  },

};
