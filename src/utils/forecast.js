const request = require('request')

const forecast = (lattitude, longitude, callback)=>{
    const url = 'http://api.weatherstack.com/current?access_key=7e9afb97978038c122b924d699db6bdf&query=' + lattitude + ',' + longitude + '&units=f' 

    request({ url, json: true }, (error, { body })=>{
        if(error){
            callback('Unable to connect weather services', undefined)
        }
        else if(body.error){
            callback('Unable to find location', undefined)
        } else{
            callback(undefined, body.current.weather_descriptions[0] +' .It is currently ' + body.current.temperature + ' farenheit out. It feels like ' + body.current.feelslike + ' farenheit out. The humidity is ' + body.current.humidity + '%')
        }
    })

}


module.exports = forecast