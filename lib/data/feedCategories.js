/**
 * Created by braddavis on 8/2/15.
 */
var
    mongoose = require('mongoose'),
    VError = require('verror'),
    extensions = require('./extensions'),

    feedCategoriesSchema = mongoose.Schema({
        userId: {
            type: String,
            required: true
        },
        categories: {
            type: Array,
            default: [{
                "code": "SSSS",
                "name": "For Sale",
                "selected": true,
                "__ivhTreeviewExpanded": false,
                "__ivhTreeviewIndeterminate": false,
                "categories": [{
                    "code": "SANT",
                    "name": "Antiques",
                    "selected": true,
                    "__ivhTreeviewExpanded": false,
                    "__ivhTreeviewIndeterminate": false
                }, {
                    "code": "SAPP",
                    "name": "Apparel",
                    "selected": true,
                    "__ivhTreeviewExpanded": false,
                    "__ivhTreeviewIndeterminate": false
                }, {
                    "code": "SAPL",
                    "name": "Appliances",
                    "selected": true,
                    "__ivhTreeviewExpanded": false,
                    "__ivhTreeviewIndeterminate": false
                }, {
                    "code": "SANC",
                    "name": "Art And Crafts",
                    "selected": true,
                    "__ivhTreeviewExpanded": false,
                    "__ivhTreeviewIndeterminate": false
                }, {
                    "code": "SKID",
                    "name": "Babies And Kids",
                    "selected": true,
                    "__ivhTreeviewExpanded": false,
                    "__ivhTreeviewIndeterminate": false
                }, {
                    "code": "SBAR",
                    "name": "Barters",
                    "selected": true,
                    "__ivhTreeviewExpanded": false,
                    "__ivhTreeviewIndeterminate": false
                }, {
                    "code": "SBIK",
                    "name": "Bicycles",
                    "selected": true,
                    "__ivhTreeviewExpanded": false,
                    "__ivhTreeviewIndeterminate": false
                }, {
                    "code": "SBIZ",
                    "name": "Businesses",
                    "selected": true,
                    "__ivhTreeviewExpanded": false,
                    "__ivhTreeviewIndeterminate": false
                }, {
                    "code": "SCOL",
                    "name": "Collections",
                    "selected": true,
                    "__ivhTreeviewExpanded": false,
                    "__ivhTreeviewIndeterminate": false
                }, {
                    "code": "SEDU",
                    "name": "Educational",
                    "selected": true,
                    "__ivhTreeviewExpanded": false,
                    "__ivhTreeviewIndeterminate": false
                }, {
                    "code": "SELE",
                    "name": "Electronics And Photo",
                    "selected": true,
                    "__ivhTreeviewExpanded": false,
                    "__ivhTreeviewIndeterminate": false
                }, {
                    "code": "SFNB",
                    "name": "Food And Beverage",
                    "selected": true,
                    "__ivhTreeviewExpanded": false,
                    "__ivhTreeviewIndeterminate": false
                }, {
                    "code": "SFUR",
                    "name": "Furniture",
                    "selected": true,
                    "__ivhTreeviewExpanded": false,
                    "__ivhTreeviewIndeterminate": false
                }, {
                    "code": "SGAR",
                    "name": "Garage Sales",
                    "selected": true,
                    "__ivhTreeviewExpanded": false,
                    "__ivhTreeviewIndeterminate": false
                }, {
                    "code": "SGFT",
                    "name": "Gift Cards",
                    "selected": true,
                    "__ivhTreeviewExpanded": false,
                    "__ivhTreeviewIndeterminate": false
                }, {
                    "code": "SHNB",
                    "name": "Health And Beauty",
                    "selected": true,
                    "__ivhTreeviewExpanded": false,
                    "__ivhTreeviewIndeterminate": false
                }, {
                    "code": "SHNG",
                    "name": "Home And Garden",
                    "selected": true,
                    "__ivhTreeviewExpanded": false,
                    "__ivhTreeviewIndeterminate": false
                }, {
                    "code": "SIND",
                    "name": "Industrial",
                    "selected": true,
                    "__ivhTreeviewExpanded": false,
                    "__ivhTreeviewIndeterminate": false
                }, {
                    "code": "SJWL",
                    "name": "Jewelry",
                    "selected": true,
                    "__ivhTreeviewExpanded": false,
                    "__ivhTreeviewIndeterminate": false
                }, {
                    "code": "SLIT",
                    "name": "Literature",
                    "selected": true,
                    "__ivhTreeviewExpanded": false,
                    "__ivhTreeviewIndeterminate": false
                }, {
                    "code": "SMNM",
                    "name": "Movies And Music",
                    "selected": true,
                    "__ivhTreeviewExpanded": false,
                    "__ivhTreeviewIndeterminate": false
                }, {
                    "code": "SMUS",
                    "name": "Musical Instruments",
                    "selected": true,
                    "__ivhTreeviewExpanded": false,
                    "__ivhTreeviewIndeterminate": false
                }, {
                    "code": "SRES",
                    "name": "Restaurants",
                    "selected": true,
                    "__ivhTreeviewExpanded": false,
                    "__ivhTreeviewIndeterminate": false
                }, {
                    "code": "SSNF",
                    "name": "Sports And Fitness",
                    "selected": true,
                    "__ivhTreeviewExpanded": false,
                    "__ivhTreeviewIndeterminate": false
                }, {
                    "code": "STIX",
                    "name": "Tickets",
                    "selected": true,
                    "__ivhTreeviewExpanded": false,
                    "__ivhTreeviewIndeterminate": false
                }, {
                    "code": "STOO",
                    "name": "Tools",
                    "selected": true,
                    "__ivhTreeviewExpanded": false,
                    "__ivhTreeviewIndeterminate": false
                }, {
                    "code": "STOY",
                    "name": "Toys And Hobbies",
                    "selected": true,
                    "__ivhTreeviewExpanded": false,
                    "__ivhTreeviewIndeterminate": false
                }, {
                    "code": "STVL",
                    "name": "Travel",
                    "selected": true,
                    "__ivhTreeviewExpanded": false,
                    "__ivhTreeviewIndeterminate": false
                }, {
                    "code": "SWNT",
                    "name": "Wanted",
                    "selected": true,
                    "__ivhTreeviewExpanded": false,
                    "__ivhTreeviewIndeterminate": false
                }, {
                    "code": "SOTH",
                    "name": "Other",
                    "selected": true,
                    "__ivhTreeviewExpanded": false,
                    "__ivhTreeviewIndeterminate": false
                }],
                "selected": true,
                "__ivhTreeviewIndeterminate": false,
                "__ivhTreeviewExpanded": true
            }, {
                "code": "RRRR",
                "name": "Real Estate",
                "selected": true,
                "__ivhTreeviewExpanded": false,
                "__ivhTreeviewIndeterminate": false,
                "categories": [{
                    "code": "RCRE",
                    "name": "Commercial Real Estate",
                    "selected": true,
                    "__ivhTreeviewExpanded": false,
                    "__ivhTreeviewIndeterminate": false
                }, {
                    "code": "RHFR",
                    "name": "Housing For Rent",
                    "selected": true,
                    "__ivhTreeviewExpanded": false,
                    "__ivhTreeviewIndeterminate": false
                }, {
                    "code": "RHFS",
                    "name": "Housing For Sale",
                    "selected": true,
                    "__ivhTreeviewExpanded": false,
                    "__ivhTreeviewIndeterminate": false
                }, {
                    "code": "RSUB",
                    "name": "Housing Sublets",
                    "selected": true,
                    "__ivhTreeviewExpanded": false,
                    "__ivhTreeviewIndeterminate": false
                }, {
                    "code": "RSWP",
                    "name": "Housing Swaps",
                    "selected": true,
                    "__ivhTreeviewExpanded": false,
                    "__ivhTreeviewIndeterminate": false
                }, {
                    "code": "RLOT",
                    "name": "Lots And Land",
                    "selected": true,
                    "__ivhTreeviewExpanded": false,
                    "__ivhTreeviewIndeterminate": false
                }, {
                    "code": "RPNS",
                    "name": "Parking And Storage",
                    "selected": true,
                    "__ivhTreeviewExpanded": false,
                    "__ivhTreeviewIndeterminate": false
                }, {
                    "code": "RSHR",
                    "name": "Room Shares",
                    "selected": true,
                    "__ivhTreeviewExpanded": false,
                    "__ivhTreeviewIndeterminate": false
                }, {
                    "code": "RVAC",
                    "name": "Vacation Properties",
                    "selected": true,
                    "__ivhTreeviewExpanded": false,
                    "__ivhTreeviewIndeterminate": false
                }, {
                    "code": "RWNT",
                    "name": "Want Housing",
                    "selected": true,
                    "__ivhTreeviewExpanded": false,
                    "__ivhTreeviewIndeterminate": false
                }, {
                    "code": "ROTH",
                    "name": "Other",
                    "selected": true,
                    "__ivhTreeviewExpanded": false,
                    "__ivhTreeviewIndeterminate": false
                }],
                "selected": true,
                "__ivhTreeviewIndeterminate": false,
                "__ivhTreeviewExpanded": true
            }, {
                "code": "VVVV",
                "name": "Vehicles",
                "selected": true,
                "__ivhTreeviewExpanded": false,
                "__ivhTreeviewIndeterminate": false,
                "categories": [{
                    "code": "VAUT",
                    "name": "Autos",
                    "selected": true,
                    "__ivhTreeviewExpanded": false,
                    "__ivhTreeviewIndeterminate": false
                }, {
                    "code": "VMOT",
                    "name": "Motorcycles",
                    "selected": true,
                    "__ivhTreeviewExpanded": false,
                    "__ivhTreeviewIndeterminate": false
                }, {
                    "code": "VMPT",
                    "name": "Motorcycle Parts",
                    "selected": true,
                    "__ivhTreeviewExpanded": false,
                    "__ivhTreeviewIndeterminate": false
                }, {
                    "code": "VPAR",
                    "name": "Parts",
                    "selected": true,
                    "__ivhTreeviewExpanded": false,
                    "__ivhTreeviewIndeterminate": false
                }, {
                    "code": "VOTH",
                    "name": "Other",
                    "selected": true,
                    "__ivhTreeviewExpanded": false,
                    "__ivhTreeviewIndeterminate": false
                }],
                "selected": true,
                "__ivhTreeviewIndeterminate": false,
                "__ivhTreeviewExpanded": true
            }]
        }
    });


module.exports = function (app, self) {
    'use strict';

    self = self || {};

    // extend schemas with audit fields and toObject override
    extensions.toObject(feedCategoriesSchema);

    // create mongoose model
    var FeedCategories = mongoose.model('feedCategories', feedCategoriesSchema);

    self.findByUserId = function (userId, callback) {
        var verr;

        if(userId) {
            FeedCategories
                .findOne({userId: userId})
                .exec(function (err, feedCategories) {
                    if (err) {
                        verr = new VError(err, 'lookup by id failed', userId);

                        return callback(verr);
                    }

                    if (feedCategories) {
                        feedCategories = feedCategories.toObject({transform: true});
                    }

                    return callback(null, feedCategories);
                });
        } else {

            var defaultFeedCategories = new FeedCategories();

            return callback(null, defaultFeedCategories);
        }
    };


    return self;
};
