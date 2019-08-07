const request = require('request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1Ijoic3J1cGF2YXRpeWEiLCJhIjoiY2p5dXY4MDhjMGZvNTNkbDlvN2hucnJhNiJ9.r3wkAw7x7xNSGPB1eDtqUQ&limit=1'

    request({url, json: true}, (error, { body } = {}) => {
        if(error)
        {
            callback('Unable to connect geocoding service!', undefined)
        } else if (body.features.length === 0) {
            callback('Unable to locate provided place. Try another search.', undefined)
        } else {
            const data = {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            }
            
            callback(undefined, data)
        }
    })
}

module.exports = geocode