'use strict';

var path = require('path'),
    walk = require('./lib/walk'),
    requires = require('./lib/requires'),
    async = require('async'),
    _    = require('lodash');

var defaults = {
    modulePath : './',
    traversePath : './',
    includeDev : false
}

module.exports = function(options, callback){
    if(typeof(options) === 'function'){
        callback = options;
        options = defaults;
    }

    if(options && !options.traversePath)
        options.traversePath = options.modulePath;

    options = _.defaults(options || {}, defaults);


    var pkgPath = path.join(options.modulePath,'package.json');
    if(pkgPath === 'package.json')
        pkgPath = './package.json';

    var pkg = require(pkgPath);

    var dependencies = Object.keys(pkg.dependencies);
    if(options.includeDev){
        dependencies = _.merge(dependencies,pkg.devDependencies);
    }

    walk('./', function(err, files){ 
        async.map(files, requires, function(err, results){ 
            results = _.uniq(_.flatten(results));
            var excessDependencies = _.difference(dependencies, results);
            if(callback)
                callback(null, excessDependencies);
        })
    });
}