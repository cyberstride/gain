Getting Started
====

Gain's a really simple library intended to scan a Node project and detect any dependencies in your package.json that are never used in your application code.  It doesn't check your node_modules, and it only looks at .js files right now. 

We've provided *gain* as an in-memory module right now, but are going to kick out a shell script as well as grunt and gulp tools for it when we get around to it.  

For now, start off pulling the package into your project:

```sh
npm install gain
```

Then you can make use of it in a file of your creation:

```js
var gain = require('gain');

gain('./', function(err, excess){ 
   console.log(excess);
});
```

More docs to follow
