'use strict';


var SignInModel = require('../../models/sign-in');


module.exports = function (router) {

    var model = new SignInModel();


    router.get('/', function (req, res) {
        
        res.render('sign-in/index', model);
        
    });

};
