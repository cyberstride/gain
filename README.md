Getting Started
====

Gain's a really simple library intended to scan a Node project and detect any dependencies in your package.json that are never used in your application code.  It doesn't check your node_modules, and it only looks at .js files right now. 

We've provided *gain* as an in-memory module right now, and as a shell script. We're thinking about maknig a grunt and gulp tools for it when we get around to it.  

For now, start off pulling the package to your machine:

```sh
npm install -g gain
```

Then you can cd to the root of your favorite node app and run from the command line:

```sh
gain
```

Which will give you a list of all the packages you have declared in the local ./package.json file that are never required in any of your .js files.  We're still working on a solution that will check extensionless files, so for now if you have bin scripts they'll not be checked as locations for `require` statements.

Alternatively, you can install it in your app

```sh
npm install -g gain
```

Then you can make use of it in a file of your creation:

```js
var gain = require('gain');

gain('./', function(err, excess){ 
   console.log(excess);
});
```

More docs to follow
