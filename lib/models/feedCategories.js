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
    self.getAllFeedCategories = function (user, callback) {
        var
            modelError,
            startTime = new Date();

        async.waterfall([
            // find all items in a users watchlist
            function (done) {
                data.feedCategories.findByUserId(
                    user.userId,
                    function (err, feedCategories) {
                        // check to see if user has watchlist categories defined
                        if (err) {
                            modelError = new errors.GeneralConflictError(
                                'failed to lookup users feed categories');

                            return setImmediate(done, modelError);
                        }

                        app.log.trace('user feed categories lookup completed in %s',
                            countdown(startTime, new Date(), countdown.MILLISECONDS).toString());

                        return done(null, feedCategories);
                    }
                );
            }

        ], callback);
    };


    return self;
};

