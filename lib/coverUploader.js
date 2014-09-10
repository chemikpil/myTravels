module.exports = function (coverphoto, dirname, cb) {    
  'use strict';
  
  var fs = require('fs');
  var newName = +new Date() + '_' + coverphoto.name;
  var cover_dir = __dirname + '/../public/img/' + dirname + '/';
  var serverPath = cover_dir + newName;
  
  if (!fs.existsSync(cover_dir)) {
    fs.mkdirSync(cover_dir, '0744');
  }
    
  console.log(coverphoto.path, serverPath);
  
    fs.rename(
      coverphoto.path,
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
