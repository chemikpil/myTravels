'use strict';

var Crypto = function () {
  var level = 8;
  
  this.getLevel = function () {
    return level; 
  };
  
  this.setLevel = function (difficulty) {
    level = difficulty;
  };
};

module.exports = new Crypto();
