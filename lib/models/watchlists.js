/**
 * Created by braddavis on 7/21/15.
 */
var
    async = require('async'),
    countdown = require('countdown'),
    uuid = require('node-uuid'),

    errors = require('./errors'),
    validation = require('./validation');

module.exports = function (app, data, services, self) {
    'use strict';

    self = self || {};

    /**
     * Used by the route to create a user in the API
     **/
    self.getAllWatchlistItems = function (user, callback) {
        var
            modelError,
            startTime = new Date();

        // validate the input
        if (validation.isEmpty(user)) {
            modelError =
                new errors.RequiredFieldMissingError('user payload is required');

            return setImmediate(callback, modelError);
        }

        if (validation.isEmpty(user.userId)) {
            modelError =
                new errors.RequiredFieldMissingError('userId is required');

            return setImmediate(callback, modelError);
        }

        async.waterfall([
            // find all items in a users watchlist
            function (done) {
                data.watchlists.findByUserId(
                    user.userId,
                    function (err, watchlistItems) {
                        // check to see if user has watchlist categories defined
                        if (err) {
                            modelError = new errors.GeneralConflictError(
                                'failed to lookup watchlist items');

                            return setImmediate(done, modelError);
                        }

                        app.log.trace('user watchlist lookup completed in %s',
                            countdown(startTime, new Date(), countdown.MILLISECONDS).toString());

                        return done(null, watchlistItems);
                    }
                );
            }

        ], callback);
    };


    return self;
};

