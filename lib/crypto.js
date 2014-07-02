'use strict';

var Crypto = function () {
  var level = -1;
  
  this.getLevel = function () {
    return level; 
  };
  
  this.setLevel = function (difficulty) {
    if (level === -1) {
      level = difficulty; 
    }
  };
};

module.exports = new Crypto();
