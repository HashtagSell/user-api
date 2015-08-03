/**
 * Created by braddavis on 8/2/15.
 */
var
    mongoose = require('mongoose'),
    VError = require('verror'),
    extensions = require('./extensions'),

    merchantsSchema = mongoose.Schema({
        userId: {
            type: String,
            required: true
        },
        details: {
            business: {
                legalName: String,
                taxId: String,
                address: {
                    street_address: String,
                    locality: String,
                    region: String,
                    postalCode: String
                }
            },
            individual: {
                firstName: String,
                lastName: String,
                email: String,
                dateOfBirth: String,
                address: {
                    streetAddress: String,
                    locality: String,
                    region: String,
                    postalCode: String
                }
            },
            funding: {
                destination: String,
                email: String,
                mobilePhone: String,
                accountNumber: String,
                routingNumber: String
            },
            tosAccepted: Boolean,
            id: String
        },
        response: {
            id: String,
            status: String,
            currencyIsoCode: String,
            subMerchantAccount: Boolean,
            masterMerchantAccount: {
                id: String,
                status: String,
                currencyIsoCode: String,
                subMerchantAccount: Boolean
            }
        }
    });


module.exports = function (app, self) {
    'use strict';

    self = self || {};

    // extend schemas with audit fields and toObject override
    extensions.auditFields(merchantsSchema);
    extensions.toObject(merchantsSchema);

    // create mongoose model
    var Merchant = mongoose.model('profiles', merchantsSchema);


    //self.findByEmail = function (email, callback) {
    //    var verr;
    //
    //    var email = email.toLowerCase();
    //
    //    User
    //        .findOne({ email : email })
    //        .exec(function(err, user) {
    //            if (err) {
    //                verr = new VError(err, 'lookup by email failed', user);
    //
    //                return callback(verr);
    //            }
    //
    //            if(user){
    //                user = user.toObject({ transform : true })
    //            }
    //
    //            return callback(null, user);
    //        });
    //};
    //
    //
    //
    //self.findByUsername = function (username, callback) {
    //    var verr;
    //
    //    var username = username.toLowerCase();
    //
    //    User
    //        .findOne({ username : username })
    //        .exec(function(err, user) {
    //            if (err) {
    //                verr = new VError(err, 'lookup by username failed', user);
    //
    //                return callback(verr);
    //            }
    //
    //            if(user){
    //                user = user.toObject({ transform : true })
    //            }
    //
    //            return callback(null, user);
    //        });
    //};
    //
    //
    //
    //self.deleteUser = function (email, callback) {
    //    var verr;
    //
    //    var email = email.toLowerCase();
    //
    //    User
    //        .findOne({ email : email })
    //        .exec(function (err, user) {
    //            if (err) {
    //                verr = new VError(err, 'lookup of user %s failed', email);
    //                return callback(verr);
    //            }
    //
    //            if(!user) {
    //                verr = new VError('could not find user %s', email);
    //                return callback(null, user);
    //            }
    //
    //            user.remove(function (err) {
    //                if (err) {
    //                    verr =
    //                        new VError(err, 'removal of user %s has failed', user);
    //                    return callback(verr);
    //                }
    //
    //                return callback(null, user.toObject({ transform : true }));
    //            });
    //        });
    //};
    //
    //self.createUser = function (user, callback) {
    //    var verr;
    //
    //    user.email = user.email.toLowerCase();
    //
    //    var newUser = new User(user);
    //
    //    newUser.save(function (err) {
    //        if (err) {
    //            verr = new VError(
    //                err,
    //                'save of new user %s failed',
    //                user.email);
    //            return callback(verr);
    //        }
    //
    //        // return
    //        return callback(
    //            null,
    //            newUser.toObject({ transform : true }));
    //    });
    //};

    return self;
};
