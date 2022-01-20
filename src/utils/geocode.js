const request = require('request')

const geocode = (address, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoidmFzaWxpb2siLCJhIjoiY2t5ZDlzMWI1MHhqMjJ4bzhiaXZjcnNybiJ9.bO6ritmvunTv3E_YP6YwaQ&limit=1`
    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to location services!', undefined)

        } else if (body.features.length === 0) {
            callback('Unable to find location. Try another search', undefined)

        } else {
            callback(undefined, {
                location: body.features[0].place_name,
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0]
            })
        }
    })
}


module.exports = geocode;