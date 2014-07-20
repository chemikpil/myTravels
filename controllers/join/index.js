'use strict';


var JoinModel = require('../../models/join');


module.exports = function (router) {

    var model = new JoinModel();


    router.get('/', function (req, res) {
        
        res.render('join/index', model);
        
    });

};
