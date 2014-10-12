module.exports = function (photo, dirname, cb) {    
  'use strict';
  
  var fs = require('fs');
  var photoName = photo.name.replace(' ', '_');
  var newName = +new Date() + '_' + photoName;
  var new_dir = __dirname + '/../public/img/' + dirname + '/';
  var serverPath = new_dir + newName;
  
  if (!fs.existsSync(new_dir)) {
    fs.mkdirSync(new_dir, '0744');
  }
  
  fs.rename(
    photo.path,
    serverPath,
    function (err) {
      if(err) {
        cb('Ah crap! Something bad happened');
        return;
      }

      cb(null, newName);
    }
  );
};
