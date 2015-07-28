var
	fs = require('fs'),
	path = require('path'),

	aglio = require('aglio'),
	async = require('async'),
	express = require('express'),

	BLUEPRINT_PATH = path.join(__dirname, '../../v1.apibp.md');


	module.exports = function (app) {
		'use strict';

		var
			blueprintHTML,
			router = express.Router();

		app.log.trace('registering routes for /v1/docs');
		app.use('/v1/docs', router);

		function loadBlueprint (callback) {
			// read blueprint markdown and set variable on resource
			fs.readFile(BLUEPRINT_PATH, { encoding : 'UTF-8' }, function (err, md) {
				if (err) {
					return callback(err);
				}

				app.log.trace('loaded blueprint');
				return callback(null, md, 'default');
			});
		}

		router.get('/', function (req, res, next) {
			if (blueprintHTML) {
				return res
					.status(200)
					.send(blueprintHTML);
			}

			async.waterfall([
					loadBlueprint,
					aglio.render
				], function (err, html, warnings) {
					if (err) {
						return next(err);
					}

					blueprintHTML = html;

					// debug warnings in API blueprint markdown
					if (warnings) {
						delete warnings.input;
						app.log.debug(JSON.stringify(warnings, 0, 2));
					}

					return res
						.status(200)
						.send(blueprintHTML);
				});
		});
	};
