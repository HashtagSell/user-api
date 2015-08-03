/**
 * Created by braddavis on 7/21/15.
 */
// get an instance of mongoose and mongoose.Schema
//var mongoose = require('mongoose');
//var Schema = mongoose.Schema;
//
//// set up a mongoose model and pass it using module.exports
//module.exports = mongoose.model('Agent', new Schema({
//  name: String,
//  password: String,
//  admin: Boolean
//}));



/*
 // Example user model

 {
 "userId" : "def456",
 "createdAt" : "2015-05-08T09:24.000Z", // system managed
 "modifiedAt" : "2015-05-08T09:24.000Z", // system managed
 "isAdmin" : true,
 "email" : "bdavis",
 "password" : "asd9fasdfoasdf979"
 }
 */

var
  async = require('async'),
  countdown = require('countdown'),
  uuid = require('node-uuid'),
  bcrypt = require('bcrypt'),

  errors = require('./errors'),
  validation = require('./validation');

module.exports = function (app, data, services, self) {
  'use strict';

  self = self || {};

  /**
   * Used by the route to create a user in the API
   **/
  self.create = function (user, callback) {
    var
      modelError,
      startTime = new Date();

    // validate the input
    if (validation.isEmpty(user)) {
      modelError =
        new errors.RequiredFieldMissingError('user payload is required');

      return setImmediate(callback, modelError);
    }

    if (validation.isEmpty(user.email)) {
      modelError =
        new errors.RequiredFieldMissingError('email is required');

      return setImmediate(callback, modelError);
    }

    if (validation.isInvalidEmail(user.email)) {
      modelError =
        new errors.authenticationError('not a valid email address');

      return setImmediate(callback, modelError);
    }

    if (validation.isEmpty(user.password)) {
      modelError =
        new errors.RequiredFieldMissingError('password is required');

      return setImmediate(callback, modelError);
    }

    if(validation.isInvalidPass(user.password)) {
      modelError =
        new errors.authenticationError('password must be between 6 - 30 characters');

      return setImmediate(callback, modelError);
    }

    if (validation.isEmpty(user.username)) {
      modelError =
        new errors.RequiredFieldMissingError('username is required');

      return setImmediate(callback, modelError);
    }

    if (validation.isEmpty(user.acceptedBetaAgreement)) {
      modelError =
          new errors.RequiredFieldMissingError('please agree to beta agreement');

      return setImmediate(callback, modelError);
    }

    async.waterfall([
      // look up existing email...
      function (done) {
        data.users.findByEmail(
          user.email,
          function (err, existingUser) {
            // check to see if user has exists
            if (existingUser) {
              modelError = new errors.GeneralConflictError(
                'email already exists');
              modelError.existingUser = existingUser;

              return setImmediate(done, modelError);
            }

            return setImmediate(done);
          });
      },
      // look up existing username...
      function (done) {
        data.users.findByUsername(
            user.username,
            function (err, existingUser) {
              // check to see if user has exists
              if (existingUser) {
                modelError = new errors.GeneralConflictError(
                    'username taken');
                modelError.existingUser = existingUser;

                return setImmediate(done, modelError);
              }

              return setImmediate(done);
            });
      },
      function (done) {
        //encrypt the password before saving in db
        bcrypt.hash(user.password, 10, function(err, hash) {
          if (err) {
            modelError = new errors.authenticationError(
                err,
                'unable to hash password');
            modelError.user = user;

            return done(modelError);
          }

          user.hash = hash;

          return setImmediate(done);
        });
      },
      function (done) {
        // create an ID for the user
        user.userId = uuid.v4().replace(/-/g, '');

        app.log.trace('creating user %s',
          user.email);

        // perform insert
        data.users.createUser(
          user,
          function (err, newUser) {
            if (err) {
              modelError = new errors.PersistenceError(
                err,
                'unable to create user');
              modelError.user = user;

              return done(modelError);
            }

            return done(null, newUser);
          });
      },

      function (newUser, done) {

        app.log.trace('creating new user %s token',
          newUser.email);

        services.jwtauth.generateToken(
          newUser,
          function (err, authenticatedUser) {
            if (err) {
              return callback(err);
            }

            app.log.trace('user login %s completed in %s',
              newUser.email,
              countdown(startTime, new Date(), countdown.MILLISECONDS).toString());

            return done(null, authenticatedUser);
          }
        )
      }

    ], callback);
  };




  self.login = function (user, callback) {
    var
        modelError,
        startTime = new Date();

    // validate the input
    if (validation.isEmpty(user)) {
      modelError =
          new errors.RequiredFieldMissingError('user payload is required');

      return setImmediate(callback, modelError);
    }

    if (validation.isEmpty(user.email)) {
      modelError =
          new errors.RequiredFieldMissingError('email is required');

      return setImmediate(callback, modelError);
    }

    if (validation.isInvalidEmail(user.email)) {
      modelError =
          new errors.authenticationError('not a valid email address');

      return setImmediate(callback, modelError);
    }

    if (validation.isEmpty(user.password)) {
      modelError =
          new errors.RequiredFieldMissingError('password is required');

      return setImmediate(callback, modelError);
    }

    if(validation.isInvalidPass(user.password)) {
      modelError =
          new errors.authenticationError('password must be between 6 - 20 characters');

      return setImmediate(callback, modelError);
    }

    async.waterfall([
      // look up existing user...
      function (done) {
        data.users.findByEmail(
            user.email,
            function (err, existingUser) {
              if (err) {
                return callback(err);
              }

              // check to see if user has exists
              if (!existingUser) {
                modelError = new errors.ResourceNotFoundError(
                    'unable to find user with specified email');
                modelError.email = user.email;

                return callback(modelError);
              }

              return done(null, existingUser);
            });
      },

      function (existingUser, done) {
        //Decrypt password

        bcrypt.compare(user.password, existingUser.local.hash, function(err, res) {
          // res === true
          if(err){

            modelError = new errors.authenticationError(
                err,
                'unable to hash password');
            modelError.user = user;

            return done(modelError);

          } else if (!res) {

            modelError = new errors.GeneralConflictError(
                'password is incorrect');
            modelError.password = user.password;

            return done(modelError);

          }

          return done(null, existingUser);

        });

      },

      function (existingUser, done) {

        app.log.trace('creating user %s token',
            existingUser.email);

        services.jwtauth.generateToken(
            existingUser,
            function (err, authenticatedUser) {
              if (err) {
                return callback(err);
              }

              app.log.trace('user login %s completed in %s',
                  existingUser.email,
                  countdown(startTime, new Date(), countdown.MILLISECONDS).toString());

              return done(null, authenticatedUser);
            }
        )
      }
    ], callback);
  };



  /**
   * Allows for removal of users
   **/
  self.delete = function (user, callback) {
    var
      modelError,
      startTime = new Date();

    if (validation.isEmpty(user.email)) {
      modelError =
        new errors.RequiredFieldMissingError('email is required');

      return setImmediate(callback, modelError);
    }

    data.users.deleteUser(user.email, function (err, removedUser) {
      if (err) {
        return callback(err);
      }

      if (!removedUser) {
        modelError = new errors.ResourceNotFoundError(
          'unable to find user with specified email');
        modelError.email = user.email;

        return callback(modelError);
      }

      app.log.trace('delete user %s completed in %s',
        user.email,
        countdown(startTime, new Date(), countdown.MILLISECONDS).toString());

      return callback(null, removedUser);
    });
  };


  self.validateToken = function (req, res, next) {
    var
      modelError,
      startTime = new Date();

    var token = req.body.token || req.query.token || req.headers['x-access-token'];

    // validate the input
    if (!token) {
      modelError =
        new errors.authenticationError('missing authentication token');

      return next(modelError);
    }

    services.jwtauth.validateToken(
      token,
      function (err, decodedToken) {

        app.log.trace('evaluated token in %s',
          countdown(startTime, new Date(), countdown.MILLISECONDS).toString());

        if(err){
          modelError =
            new errors.authenticationError('token is invalid');

          return next(modelError);
        }

        return next();
      }
    )
  };

  return self;
};

