/**
 * Created by braddavis on 7/23/15.
 */
var express = require('express');


module.exports = function (app, models, self) {
  'use strict';

  self = self || {};

  var router = express.Router();

  app.log.trace('registering routes for /v1/auth');
  app.use('/v1/auth', router);


  /**
   * Creates a new user with body data.
   **/
  router.post('/register', function (req, res, next) {
    models.users.create(req.body, function (err, user) {
      if (err) {
        return next(err);
      }

      return res.status(201).json(user);
    });
  });

  /**
   * Login user..
   **/
  router.post('/login', function (req, res, next) {
    models.users.login(req.body, function (err, user) {
      if (err) {
        return next(err);
      }

      return res.status(201).json(user);
    });
  });

};
