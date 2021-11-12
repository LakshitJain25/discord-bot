const request = require('request')


const fetchGif = (message, args) => {

    const url = `https://api.redgifs.com/v2/gifs/search?search_text=${args.join(" ")}`
    request({ url: url, json: true }, (error, response) => {
        
        let randomMax = Math.floor((Math.random() * 100) % 80);
        randomMax = 90;
        console.log(randomMax)
        if (error) { console.log("error  ", error) }
        else {
           
            while ( randomMax>response.body.gifs.length || !response.body.gifs[randomMax].urls.gif) {
                randomMax = Math.floor((Math.random() * 100) % 80);
                console.log(randomMax)
            }
            console.log(error, response.body.gifs[randomMax].urls.gif)
            message.channel.send(response.body.gifs[randomMax].urls.gif)
        }

    })

}

module.exports = fetchGif