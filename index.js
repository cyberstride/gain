'use strict';

var path = require('path'),
    _    = require('lodash');

var defaults = {
    modulePath : './',
    traversePath : './',
    includeDev : false
}

module.exports = function(options){
    if(!options.traversePath)
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

    console.log(dependencies);
}