var
  mongoose = require('mongoose'),
  VError = require('verror'),
  extensions = require('./extensions'),

  //usersSchema = mongoose.Schema({
  //  isAdmin: {
  //    type : Boolean,
  //    default: false
  //  },
  //  userId: {
  //    index: true,
  //    required: true,
  //    type: String
  //  },
  //  username: {
  //    index: true,
  //    required: true,
  //    type: String
  //  },
  //  acceptedBetaAgreement: {
  //    type: Boolean,
  //    required: true
  //  },
  //  modifiedAt: {
  //    type: Date
  //  },
  //  createdAt: {
  //    type: Date
  //  },
  //  local: {
  //    email : {
  //      index : true,
  //      required : true,
  //      type : String
  //    },
  //    hash : {
  //      required : true,
  //      type: String
  //    }
  //  },
  //  facebook:{
  //    token:{
  //      type : String,
  //      default: null
  //    }
  //  },
  //  twitter: {
  //    token: {
  //      type : String,
  //      default: null
  //    }
  //  },
  //  stats: {
  //    loginCount: {
  //      type : Number,
  //      default: 1
  //    },
  //    minutesActive:{
  //      type : Number,
  //      default: 1
  //    }
  //  }
  //}, {
  //  strict : false
  //}),



   usersSchema = mongoose.Schema({
    local            : {
      email        : String,
      hash         : String,
      resetPasswordToken: String,
      resetPasswordExpires: Date,
      role         : String
    },
    user_settings    : {
      name         : String,
      biography    : { type: String, default: "Add a profile description" },
      location_type: { type: String, default: "Approximate" },
      linkedAccounts: {
        facebook         : {
          id           : String,
          token        : String,
          tokenExpiration: Date,
          email        : String,
          name         : String
        },
        twitter          : {
          id           : String,
          token        : String,
          tokenSecret  : String,
          tokenExpiration: Date,
          displayName  : String,
          username     : String
        },
        ebay             : {
          timestamp    : Date,
          version      : String,
          build        : String,
          eBayAuthToken: String,
          hardExpirationTime: Date
        },
        amazon           : {
          id           : String,
          token        : String,
          email        : String,
          name         : String
        }
      },
      merchantAccount: {
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
      },
      profile_photo : { type: String, default: "//static.hashtagsell.com/htsApp/placeholders/user-placeholder.png" },
      banner_photo : { type: String, default: "//static.hashtagsell.com/htsApp/placeholders/header-placeholder.png" },
      user_labels  : [],
      favorites    : [],
      feed_categories : {
        type: Array,
        default: [{
          "code": "SSSS",
          "name": "For Sale",
          "selected" : true,
          "__ivhTreeviewExpanded" : false,
          "__ivhTreeviewIndeterminate" : false,
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
          "selected" : true,
          "__ivhTreeviewExpanded" : false,
          "__ivhTreeviewIndeterminate" : false,
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
          "selected" : true,
          "__ivhTreeviewExpanded" : false,
          "__ivhTreeviewIndeterminate" : false,
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
    },
    stats : {
      activated : { type: Boolean, default: false },
      readBetaAgreement: { type: Boolean, default: true },
      activation_code: {
        type: String,
        default: function () {
          return randomString();
        }
      },
      creation_date: { type: Date, default: Date.now },
      login_count  : { type: Number, default: 0 }
    }
  });

function randomString() {
  var chars =
      "0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz";
  var randomstring = '';
  var string_length = 30;
  for (var i=0; i<string_length; i++) {
    var rnum = Math.floor(Math.random() * chars.length);
    randomstring += chars.substring(rnum,rnum+1);
  }
  return randomstring;
}


module.exports = function (app, self) {
  'use strict';

  self = self || {};

  // extend schemas with audit fields and toObject override
  extensions.auditFields(usersSchema);
  extensions.toObject(usersSchema);

  // create mongoose model
  var User = mongoose.model('users', usersSchema);


  self.findByEmail = function (email, callback) {
    var verr;

    email = email.toLowerCase();

    User
      .findOne({ 'local.email' : email })
      .exec(function(err, user) {
        if (err) {
          verr = new VError(err, 'lookup by email failed', user);

          return callback(verr);
        }

        if(user){
          user = user.toObject({ transform : true });
        }

        return callback(null, user);
      });
  };



  self.findByUsername = function (username, callback) {
    var verr;

    var username = username.toLowerCase();

    User
        .findOne({ 'user_settings.name' : username })
        .exec(function(err, user) {
          if (err) {
            verr = new VError(err, 'lookup by username failed', user);

            return callback(verr);
          }

          if(user){
            user = user.toObject({ transform : true });
          }

          return callback(null, user);
        });
  };



  self.deleteUser = function (email, callback) {
    var verr;

    var email = email.toLowerCase();

    User
      .findOne({ 'local.email' : email })
      .exec(function (err, user) {
        if (err) {
          verr = new VError(err, 'lookup of user %s failed', email);
          return callback(verr);
        }

        if(!user) {
          verr = new VError('could not find user %s', email);
          return callback(null, user);
        }

        user.remove(function (err) {
          if (err) {
            verr =
              new VError(err, 'removal of user %s has failed', user);
            return callback(verr);
          }

          return callback(null, user.toObject({ transform : true }));
        });
      });
  };

  self.createUser = function (user, callback) {
    var verr;

    user.local = {
      email: user.email.toLowerCase(),
      hash: user.hash
    };

    delete user.password;
    delete user.email;
    delete user.hash;

    var newUser = new User(user);

    newUser.save(function (err) {
      if (err) {
        verr = new VError(
          err,
          'save of new user %s failed',
          user.local.email);
        return callback(verr);
      }

      // return
      return callback(
        null,
        newUser.toObject({ transform : true }));
    });
  };

  return self;
};
