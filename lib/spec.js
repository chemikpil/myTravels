'use strict';


module.exports = function spec(app) {

    return {
        onconfig: function (config, next) {
            config.get('view engines:js:renderer:arguments').push(app);
            
            next(null, config);
        }
    };
};