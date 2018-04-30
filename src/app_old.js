import 'babel-polyfill';

import Koa from 'koa';
//import config from './config';
import bodyParser from 'koa-bodyparser';
import cors from 'kcors';

//import ipMiddleware from "./ipMiddleware";

var http = require('http');
var request = require('request');
var querystring = require('querystring');

var latlong = '';
var appId = 'e5acca9f288013d599a3f21e0c0268d1';


const app = new Koa();

//app.use(ipMiddleware);

//get weather
app.use(async(ctx, next) => {
    try {
        console.log("get weather start");
        await next() // next is now a function
        console.log("get weather end")
        
    }
    catch (err) {
        ctx.body = { message: err.message }
        ctx.status = err.status || 500
    }
});

//get latlong
app.use(async(ctx, next) => {
    try {
        console.log("get latlong start");
        
        
                
        var urlipapi = 'http://ip-api.com/json/'
    request({
        url:urlipapi,
    }, function (error, response, body) {
        if (error) {
            console.log('error:', error); // Print the error if one occurred

        } else if(response && body) {
            console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
            console.log(body);
            //return body;
            //res.json({'body': body}); // Print JSON response.
        }
    })
        await next() // next is now a function

    
        console.log("get latlong end")
        
    }
    catch (err) {
        ctx.body = { message: err.message }
        ctx.status = err.status || 500
    }
});

//get ip
app.use(async(ctx, next) => {
    try {
        console.log("get ip start");
        await next() // next is now a function
        console.log(ctx.ip);
        //var ip = ctx.ip;
        console.log("get ip end")
        
    }
    catch (err) {
        ctx.body = { message: err.message }
        ctx.status = err.status || 500
    }
});

//main
app.use(async (ctx, next) => {
    console.log("main start");
    await next();
    ctx.body = 'hello world';
    
        
    //var city = await geolocation.getCityAsync();
    //var forecast = await weather.getForecastAsync(city);
    console.log("main end");
  })
  
function getLatLong(){
    var urlipapi = 'http://ip-api.com/json/'
    request({
        url:urlipapi,
    }, function (error, response, body) {
        if (error) {
            console.log('error:', error); // Print the error if one occurred

        } else if(response && body) {
            console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
            console.log(body);
            return body;
            //res.json({'body': body}); // Print JSON response.
        }
    })
}

function getWeather(lat,long){
    var urlOpenWeatherCurrent = 'http://api.openweathermap.org/data/2.5/weather?'
    var queryObject = {
        APPID: appId,
        lat: lat,
        lon: long
    }
    console.log(queryObject)
    request({
        url:urlOpenWeatherCurrent,
        qs: queryObject
    }, function (error, response, body) {
        if (error) {
            console.log('error:', error); // Print the error if one occurred

        } else if(response && body) {
            console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
            //res.json({'body': body}); // Print JSON response.
        }
    })
}

export default app;