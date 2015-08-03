/**
 * Created by braddavis on 7/27/15.
 */
var
  jwt = require('jsonwebtoken'),
  VError = require('verror');

module.exports = function (app, self) {
  'use strict';

  self = self || {};

  self.generateToken = function(user, callback) {
    // create a token
    var token = jwt.sign(user, app.config.jwt.secret, {
      expiresInMinutes: 1440 // expires in 24 hours
    });

    var authenticatedUser = user;
    authenticatedUser.token = token;

    delete authenticatedUser.hash;
    // return the JWT token
    return setImmediate(function () {
      return callback(null, user);
    });
  };



  self.validateToken = function(token, callback) {

    var verr;

    // verifies secret and checks exp
    jwt.verify(token, app.config.jwt.secret, function (err, decodedToken) {
      if (err) {
        verr = new VError(
          err,
          'could not validate user token');
        return callback(verr);
      } else {
        // if everything is good, save to request for use in other routes
        return callback(null, decodedToken);
      }
    });
  };

  return self;

};
