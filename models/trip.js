'use strict';

var mongoose = require('mongoose');

var ObjectId = mongoose.Schema.Types.ObjectId;

var TripModel = function () {
  var tripSchema = mongoose.Schema({
    title: String,
    url: {type: String, unique: true},
    content: String,
    location: String,
    start_date: Date,
    end_date: Date,
    weather: String,
    author: {type: ObjectId, ref: 'User'},
    fans: [{type: Number, ref: 'User'}],
    mode: {type: String, default: 'draft'}
  });
  
  return mongoose.model('Trip', tripSchema);
};

module.exports = new TripModel();
