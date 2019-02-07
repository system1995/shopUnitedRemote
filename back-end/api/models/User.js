/**
 * User.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

var bcrypt = require("bcryptjs");

module.exports = {

  attributes: {
    name: {
      type: 'string',
      required: true
    },
    roles: {
      type: 'json',
      columnType: 'array',
      defaultsTo: ["DEFAULT_USER"]
    },
    email: {
      type: 'string',
      unique: true,
      email: true,
      required: true
    },
    password: {
      type: 'string',
      required: true
    },
    likedShops: {
      collection: 'shop',
    }
  },
  customToJSON: function () {
    return _.omit(this, ['password']);
  },

  
  validationMessages: { //hand for i18n & l10n
    names: {
      required: 'Name is required'
    },
    email: {
      email: 'Provide valid email address',
      required: 'Email is required',
      unique: 'This email is already existing'
    },
    password: {
      required: 'Password is required'
    }
  },

  beforeCreate: function (values, cb) {
    // Hash password
    bcrypt.hash(values.password, 10, function (err, hash) {
      if (err) return cb(err);
      values.password = hash;
      cb();
    });
  }
};
