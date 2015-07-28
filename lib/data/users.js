var
  mongoose = require('mongoose'),
  VError = require('verror'),
  extensions = require('./extensions'),

  usersSchema = mongoose.Schema({
    userId : {
      index: true,
      required: true,
      type: String
    },
    firstName : {
      required : false,
      type : String
    },
    lastName : {
      required : false,
      type : String
    },
    email : {
      index : true,
      required : true,
      type : String
    },
    password : {
      required : true,
      type: String
    },
    phone: {
      required: false,
      type: String
    },
    isAdmin : {
      required : true,
      type : Boolean
    }
  }, {
    strict : false
  });


module.exports = function (app, self) {
  'use strict';

  self = self || {};

  // extend schemas with audit fields and toObject override
  extensions.auditFields(usersSchema);
  extensions.toObject(usersSchema);

  // create mongoose model
  var User = mongoose.model('users', usersSchema);


  self.findByEmail = function (email, callback) {
    var verr;

    var email = email.toLowerCase();

    User
      .findOne({ email : email })
      .exec(function(err, user) {
        if (err) {
          verr = new VError(err, 'lookup by email failed', user);

          return callback(verr);
        }

        if(user){
          user = user.toObject({ transform : true })
        }

        return callback(null, user);
      });
  };

  self.deleteUser = function (email, callback) {
    var verr;

    var email = email.toLowerCase();

    User
      .findOne({ email : email })
      .exec(function (err, user) {
        if (err) {
          verr = new VError(err, 'lookup of user %s failed', email);
          return callback(verr);
        }

        if(!user) {
          verr = new VError('could not find user %s', email);
          return callback(null, user);
        }

        user.remove(function (err) {
          if (err) {
            verr =
              new VError(err, 'removal of user %s has failed', user);
            return callback(verr);
          }

          return callback(null, user.toObject({ transform : true }));
        });
      });
  };

  self.createUser = function (user, callback) {
    var verr;

    user.email = user.email.toLowerCase();

    var newUser = new User(user);

    newUser.save(function (err) {
      if (err) {
        verr = new VError(
          err,
          'save of new user %s failed',
          user.email);
        return callback(verr);
      }

      // return
      return callback(
        null,
        newUser.toObject({ transform : true }));
    });
  };

  return self;
};
