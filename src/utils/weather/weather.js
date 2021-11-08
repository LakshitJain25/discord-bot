const request = require('request')


const fetchWeather = (message, args) => {

    const Weatherurl = `http://api.weatherstack.com/current?access_key=3ed0c54d521166b9b702fbc9247407f3&query=${args.join("%20")}`
    // const geoUrl = "https://api.mapbox.com/geocoding/v5/mapbox.places/new delhi.json?access_token=pk.eyJ1IjoiaHFyZXBvcnQiLCJhIjoiY2tucnV5d2Z5MHFmdDJ2cGY5cDZ4bHFmaSJ9._3a1d8aSE4d4vlQ4RjLFpA"

    request({ url:Weatherurl, json: true }, (error, response) => {
        console.log(Weatherurl)
        if (error || response.error) { console.log("error  ", error) }
        else {
            console.log(error, response.body)
            message.channel.send(`weather in ${response.body.request.query} \ntemperature : ${response.body.current.temperature} degrees \nweather description : ${response.body.current.weather_descriptions[0]} \n`)
        }

    })
}



module.exports = fetchWeather