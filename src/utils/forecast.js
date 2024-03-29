const request = require('request')

const forecast = (lat, long, callback) => {

    const url = 'https://api.darksky.net/forecast/b05e06287d283f63e7d45c5cd508847c/' + lat + ',' + long

    request( { url, json: true }, (error, { body } = {}) => {
        if(error)
        {
            callback('Unable to connect weather service!', undefined)
        } else if (body.error) {
            callback(body.error, undefined)
        } else {
            callback(undefined, body.daily.data[0].summary + ' It is currently ' + body.currently.temperature + ' degrees out. Today\'s high temperature is ' + body.daily.data[0].temperatureHigh + ' and low temperature is ' + body.daily.data[0].temperatureLow + '. There is a ' + body.currently.precipProbability + '% chance of rain.')
        }
    })
}

module.exports = forecast
