'use strict';

var fs = require('fs');

var pattern = /require\(('|")(.*)('|")\)/g;

var requires = function(file, cb){
    var results = [];
    fs.readFile(file, 'utf-8', function(err, text){
        if(err) return cb(err);
        
        var match;
        while(match = pattern.exec(text)){
            if(match.length >= 3)
                results.push(match[2]);
        }
        cb(null, results);
    });
}

module.exports = requires;