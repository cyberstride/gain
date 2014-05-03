'use strict';

var fs   = require('fs'),
    _    = require('lodash'),
    path = require('path');

var defaults = {ignore : ['.git','node_modules', 'public','.bower-cache']};

var walk = function(dir, options, done) {
  var results = [];
  if(typeof(options) === 'function'){
    done = options;
    options = defaults;
  }
  options = _.defaults(options || {}, defaults);

  var ignore = _.map(options.ignore, function(name){ return path.join(dir,name); });
  fs.readdir(dir, function(err, list) {
    if (err) return done(err);
    var pending = list.length;
    if (!pending) return done(null, results);
    list.forEach(function(file) {
      file = path.join(dir,file);
      fs.stat(file, function(err, stat) {
        if (stat && stat.isDirectory() && !~ignore.indexOf(file)) {  //TODO: better iggie list
          walk(file, function(err, res) {
            results = results.concat(res);
            if (!--pending) done(null, results);
          });
        } else {
          var fileParts = file.split('.');
          if(fileParts[fileParts.length-1] == 'js')
            results.push(file);
          if (!--pending) done(null, results);
        }
      });
    });
  });
};

module.exports = walk;