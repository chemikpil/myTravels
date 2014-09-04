'use strict';

var mongoose = require('mongoose');

var ObjectId = mongoose.Schema.Types.ObjectId;

var TravelModel = function () {
  var travelSchema = mongoose.Schema({
    title: String,
    cover_photo: String,
    location: String,
    date: Date,
    sections: [{type: Object}],
    author: {type: ObjectId, ref: 'User'},
    fans: [{type: Number, ref: 'User'}],
    mode: {type: String, default: 'draft'},
    url: {type: String, unique: true},
  });
  
  return mongoose.model('Travel', travelSchema);
};

module.exports = new TravelModel();
