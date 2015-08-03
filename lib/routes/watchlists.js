/**
 * Created by braddavis on 8/2/15.
 */
var express = require('express');


module.exports = function (app, models, self) {
    'use strict';

    self = self || {};

    var router = express.Router();

    app.log.trace('registering routes for /v1/watchlists');
    app.use('/v1/watchlists', router);

    /**
     * gets ..
     **/
    router.get('/', models.users.validateToken, function (req, res, next) {
        models.watchlists.getAllWatchlistItems(req.body, function (err, watchlistItems) {
            if (err) {
                return next(err);
            }

            return res.status(200).json(watchlistItems);
        });
    });
};
