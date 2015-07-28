/**
 * Created by braddavis on 7/27/15.
 */
var jwtauth = require('./jwtauth');

module.exports = (function (self) {
  'use strict';

  self = self || {};

  self.initialize = function (app, callback) {
    var err;

    if (!app || !app.config || !app.log) {
      err = new Error('application context with config and log are required');
      return setImmediate(callback, err);
    }

    app.log.trace('initializing authentication services');

    self.jwtauth = jwtauth(app);

    return setImmediate(callback);
  };

  return self;
}({}));
