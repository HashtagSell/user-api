module.exports = (function (self) {
	'use strict';

	self = self || {};

	self.isEmpty = function (value) {
		if (value instanceof Date) {
			return false;
		}

		return (typeof value === 'undefined' ||
			(value === null) ||
			(typeof value === 'string' && value === '') ||
			(Array.isArray(value) && !value.length) ||
			(typeof value === 'object' && !Object.keys(value).length));
	};


  self.isInvalidPass = function (password) {
    if(password.length >= 6 && password.length <= 30){
      return false;
    } else {
      return true;
    }

  };


  self.isInvalidEmail = function (email) {
    var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
    return !re.test(email);
  };

	return self;
}({}));
