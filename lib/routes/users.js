var express = require('express');


module.exports = function (app, models, self) {
	'use strict';

	self = self || {};

	var router = express.Router();

	app.log.trace('registering routes for /v1/users');
	app.use('/v1/users', router);

  /**
   * Deletes existing user..
   **/
	router.delete('/', models.users.validateToken, function (req, res, next) {
		models.users.delete(req.body, function (err, user) {
				if (err) {
					return next(err);
				}

				return res.status(204).json(user);
			});
	});
};
