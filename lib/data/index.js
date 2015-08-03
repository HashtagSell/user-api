var
	async = require('async'),
	mongoose = require('mongoose'),
	mongooseMiddleware = require('mongoose-middleware'),

	users = require('./users'),
	watchlists = require('./watchlists'),
	feedCategories = require('./feedCategories');

module.exports = (function (self) {
	'use strict';

	self = self || {};

	/**
	 * Creates connection to Mongo
	 **/
	function initializeMongo (app, callback) {
		// only connect to Mongo if not already connected
		if (mongoose.connection.readyState !== 0) {
			return setImmediate(callback);
		}

		// connect to Mongo
		app.log.info('connecting to Mongo at %s', app.config.data.mongo.url);
		mongoose.connect(app.config.data.mongo.url);

		// load middleware component for easy search, pagination, projection, etc.
		app.log.info(
			'setting max document limit for paginated queries to %d',
			app.config.data.mongo.documentCountLimit);
		mongooseMiddleware.initialize({
			maxDocs : app.config.data.mongo.documentCountLimit
		}, mongoose);

		// listen on key events
		mongoose.connection.on('error', callback);
		mongoose.connection.once('open', callback);
	}

	/**
	 * Applies all DAL to the module.exports object for clients of this
	 * module to easily reference
	 **/
	function setupDataAccessModules (app, callback) {
		app.log.trace('initializing data access modules');

		self.users = users(app);
		self.watchlists = watchlists(app);
		self.feedCategories = feedCategories(app);

		return setImmediate(callback);
	}

	/**
	 * Closes the connection to Mongo
	 **/
	self.close = function (callback) {
		return mongoose.disconnect(callback);
	};

	/**
	 * Opens a connection to Mongo and prepares Mongoose Middleware and
	 * ensures all sub-modules of lib/data are ready for use
	 **/
	self.initialize = function (app, callback) {
		if (!app || !app.config || !app.log) {
			var err = new Error('application context with config and log are required');
			return setImmediate(callback, err);
		}

		async.waterfall([
				async.apply(initializeMongo, app),
				async.apply(setupDataAccessModules, app)
			], callback);
	};

	return self;
}({}));
