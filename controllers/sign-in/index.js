'use strict';


var UserModel = require('../../models/user');


module.exports = function (router) {

    var model = new UserModel();


    router.get('/', function (req, res) {
        
        res.render('sign-in/index', model);
        
    });

};
