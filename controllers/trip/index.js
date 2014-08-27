'use strict';


var TripModel = require('../../models/trip');


module.exports = function (router) {

    var model = new TripModel();


    router.get('/', function (req, res) {
        
        res.render('trip/index', model);
        
    });

};
