var
  mongoose = require('mongoose'),
  VError = require('verror'),
  extensions = require('./extensions'),

  usersSchema = mongoose.Schema({
    isAdmin: {
      type : Boolean,
      default: false
    },
    userId: {
      index: true,
      required: true,
      type: String
    },
    username: {
      index: true,
      required: true,
      type: String
    },
    acceptedBetaAgreement: {
      type: Boolean,
      required: true
    },
    modifiedAt: {
      type: Date
    },
    createdAt: {
      type: Date
    },
    local: {
      email : {
        index : true,
        required : true,
        type : String
      },
      hash : {
        required : true,
        type: String
      }
    },
    facebook:{
      token:{
        type : String,
        default: null
      }
    },
    twitter: {
      token: {
        type : String,
        default: null
      }
    },
    stats: {
      loginCount: {
        type : Number,
        default: 1
      },
      minutesActive:{
        type : Number,
        default: 1
      }
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

    email = email.toLowerCase();

    User
      .findOne({ 'local.email' : email })
      .exec(function(err, user) {
        if (err) {
          verr = new VError(err, 'lookup by email failed', user);

          return callback(verr);
        }

        if(user){
          user = user.toObject({ transform : true });
        }

        return callback(null, user);
      });
  };



  self.findByUsername = function (username, callback) {
    var verr;

    var username = username.toLowerCase();

    User
        .findOne({ username : username })
        .exec(function(err, user) {
          if (err) {
            verr = new VError(err, 'lookup by username failed', user);

            return callback(verr);
          }

          if(user){
            user = user.toObject({ transform : true });
          }

          return callback(null, user);
        });
  };



  self.deleteUser = function (email, callback) {
    var verr;

    var email = email.toLowerCase();

    User
      .findOne({ 'local.email' : email })
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

    user.local = {
      email: user.email.toLowerCase(),
      hash: user.hash
    };

    delete user.password;
    delete user.email;
    delete user.hash;

    var newUser = new User(user);

    newUser.save(function (err) {
      if (err) {
        verr = new VError(
          err,
          'save of new user %s failed',
          user.local.email);
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
