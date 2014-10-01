'use strict';

var mongoose = require('mongoose');

var ObjectId = mongoose.Schema.Types.ObjectId;

var TravelModel = function () {
  var travelSchema = mongoose.Schema({
    title: String,
    cover_photo: String,
    location: {},
    date: String,
    content: {type: String, default: '##This is section title\n\nThis is content. Click to edit'},
    author: {type: ObjectId, ref: 'User'},
    fans: [{type: Number, ref: 'User'}],
    mode: {type: String, default: 'draft'},
    url: {type: String, unique: true},
    created: {type: Date, default: Date.now}
  });
  
  travelSchema.pre('save', function (next) {
    var travel = this;
    
    travel.url = travel._id;
    
    next();
  });
  
  return mongoose.model('Travel', travelSchema);
};

module.exports = new TravelModel();
