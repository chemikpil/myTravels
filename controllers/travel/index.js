'use strict';


var TravelModel = require('../../models/travel');


module.exports = function (router) {

    var model = new TravelModel();


    router.get('/', function (req, res) {
        
        res.render('travel/index', model);
        
    });

};
