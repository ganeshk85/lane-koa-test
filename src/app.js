import 'babel-polyfill';
import Koa from 'koa';
import config from './config';
//import bodyParser from 'koa-bodyparser';
//import cors from 'kcors';

//var http = require('http');
var request = require('request');

const app = new Koa();

function doHttpRequest(url,json, queryObject){
    var resultParams = new Promise(function(resolve,reject){
        request({
            url:url,
            json:json,
            qs: queryObject
        }, function (error, response, body) {
            if (error) {
                console.log('error:', error);
                reject(error);
            } else if(response && body) {
                resolve(body);
            }
        })
    })
    
    return resultParams; 
}

//middleware
app.use(async (ctx, next) => {
    //get lat long using current location ip
    var citylatlong = await doHttpRequest('http://ip-api.com/json/',true,null);
    
    //prepare query parameters to pass to openweather api
    var queryObject = {
        APPID: config.appId,
        lat: citylatlong.lat,
        lon: citylatlong.lon,
        units: config.weatherUnit
    }
    
    //get forecast
    var forecast = await doHttpRequest('http://api.openweathermap.org/data/2.5/weather?',true, queryObject);
    
    ctx.body = 'Today, ' + forecast.name + ' will be ' + forecast.main.temp + ' degree Celsius';
    
    await next();
})

export default app;