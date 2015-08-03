/**
 * Created by braddavis on 8/2/15.
 */
var
    mongoose = require('mongoose'),
    VError = require('verror'),
    extensions = require('./extensions'),

    watchlistsSchema = mongoose.Schema({
        userId: {
            type: String,
            required: true
        },
        labels: [
            {
                name: {
                    type: String
                }
            }
        ],
        posts: [
            {
                id: {type: String},
                labels: [
                    {
                        name: {type: String}
                    }
                ]
            }
        ]
    });


module.exports = function (app, self) {
    'use strict';

    self = self || {};

    // extend schemas with audit fields and toObject override
    extensions.auditFields(watchlistsSchema);
    extensions.toObject(watchlistsSchema);

    // create mongoose model
    var Watchlist = mongoose.model('watchlists', watchlistsSchema);


    self.findByUserId = function (userId, callback) {
        var verr;

        Watchlist
            .findOne({ userId : userId })
            .exec(function(err, watchlist) {
                if (err) {
                    verr = new VError(err, 'lookup by id failed', userId);

                    return callback(verr);
                }

                if(watchlist){
                    watchlist = watchlist.toObject({ transform : true });
                }

                return callback(null, watchlist);
            });
    };

    return self;
};
