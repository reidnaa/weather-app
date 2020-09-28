const request = require('request');

const forecast = (lat, long, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=2bc90db215a4ee9bd2351b699bba3216&query=${lat},${long}`;

    request({url, json: true}, (err, {body}) =>{
        if(err){
            callback('unable to connect to weather service', undefined);
        } else if(body.error){
            callback('unable to find location', undefined);
        } else {

            
            const icon = body.current.weather_icons;
            const temp = body.current.temperature;
            const actual = body.current.feelslike;
            const description = body.current.weather_descriptions[0];
            const message = `${description}, it is currently ${temp} degrees and it feels like ${actual} degrees`;
            callback(undefined, {message, icon})
        }
    })
}

module.exports = forecast;