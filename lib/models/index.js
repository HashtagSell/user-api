/**
 * Created by braddavis on 7/21/15.
 */
var users = require('./users');

module.exports = (function (self) {
  'use strict';

  self = self || {};

  self.initialize = function (app, data, services, callback) {
    var err;

    if (!app || !app.config || !app.log) {
      err = new Error('application context with config and log are required');
      return setImmediate(callback, err);
    }

    if (!services) {
      err = new Error('services context is required to initialize models');
      return setImmediate(callback, err);
    }

    app.log.trace('initializing business layer modules');

    self.users = users(app, data, services);

    return setImmediate(callback);
  };

  return self;
}({}));
