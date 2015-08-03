/**
 * Created by braddavis on 8/2/15.
 */
var express = require('express');


module.exports = function (app, models, self) {
    'use strict';

    self = self || {};

    var router = express.Router();

    app.log.trace('registering routes for /v1/feedCategories');
    app.use('/v1/feedCategories', router);

    /**
     * gets ..
     **/
    router.get('/', function (req, res, next) {
        models.feedCategories.getAllFeedCategories(req.body, function (err, feedCategories) {
            if (err) {
                return next(err);
            }

            return res.status(200).json(feedCategories);
        });
    });
};
