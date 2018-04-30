'use strict';

const env = process.env.NODE_ENV || 'development';
const port = 8080;
const ip = '0.0.0.0';
const src = env === 'production' ? './build/app' : './src/app';

require('babel-polyfill');

if (env === 'development') {
  // for development use babel/register for faster runtime compilation
  require('babel-register');
}

const app = require(src).default;

app.listen(port, ip, function() {  
    console.log("My APP is running...");
});