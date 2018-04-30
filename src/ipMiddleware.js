var http = require('http');
var request = require('request');
var querystring = require('querystring');
var latlong = '';
var appId = 'e5acca9f288013d599a3f21e0c0268d1';

module.exports = async (ctx, next) => {
    try {
        console.log("ip middleware start")
        console.log(ctx.ip);
        //var ip = ctx.ip;
        
        latlong = await getLatLong();
        
        
        
        

        await next() // next is now a function
        //await getWeather(latlong.lat, latlong.lon);
        console.log(latlong);
        console.log("ip middleware end")
        
    }
    catch (err) {
        ctx.body = { message: err.message }
        ctx.status = err.status || 500
    }
}

function getLatLong(){
    http.get({
            host: 'ip-api.com',
            path: '/json/'
        }, function(response) {
            // Continuously update stream with data
            var body = '';
            response.on('data', function(d) {
                body += d;
            });
            response.on('end', function() {
            
                // Data reception is done, do whatever with it!
                var ipinfo = JSON.parse(body);
                console.log(ipinfo);
                //var iplatlong = {'lat':ipinfo.lat,'long':ipinfo.lon}
                //console.log(iplatlong);
                return ipinfo;
                
               
            });
        });
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