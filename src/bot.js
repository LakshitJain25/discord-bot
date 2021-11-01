const { Client, MessageAttachment } = require('discord.js')
const API = require('anime-images-api')
const images_api = new API()
const DisTube = require('distube')
const checkMounted = require('./utils/mountBot/mountBot')
const tts = require('./utils/tts/tts')
fs = require('fs')

const path = require('path')
const { channel } = require('diagnostics_channel')
require('dotenv').config({ path: path.resolve(__dirname, '../.env') })
const client = new Client({
    intents: [
        'GUILDS',
        'GUILD_VOICE_STATES',
        'GUILD_MESSAGES',
    ],
})
const PREFIX = "-"

const distube = new DisTube.default(client, {
    searchSongs: 0,
    searchCooldown: 20,
    leaveOnEmpty: true,
    emptyCooldown: 0,
    leaveOnFinish: true,
    leaveOnStop: true,
    emitNewSongOnly: true
})
    // distube.on('playSong', (queue, song) => {
    //         console.log(queue)
    //         queue.textChannel.send(` __***${song.name}***__ is being played right now, thanks to one and only #${song.user}!# \n ${song.url}`)
    //         return
    //     })
    .on('addSong', (queue, song) => {
        queue.textChannel.send(` __***${song.name}***__ is added right now, thanks to one and only #${song.user}!# \n ${song.url}`)
        return
    })

const anime = {
    types: ['sfw'],
    subtypes: ['hug', 'kiss', "slap", 'punch', 'wink', 'pat', 'kill', 'cuddle', 'waifu']
}

animeImageSender = (message, args) => {
    if (anime.types.includes(args[0]) && anime.subtypes.includes(args[1])) {
        images_api[args[0]][args[1]]()
            .then(response => {
                message.channel.send(response.image)
            })
            .catch(error => {

                message.channel.send("Sorry, error can't process this request right now")
            })
    }

    else {
        message.channel.send("enter the correct command please!")
    }



}

helpInfoSender = (message) => {
    let helpInfo = fs.readFileSync(path.resolve(__dirname, './utils/helpInfo/helpInfo.txt'), 'utf8')
    //console.log(helpInfo)
    message.channel.send(helpInfo)
}

client.on('message', (message) => {
    if (message.content.startsWith(PREFIX)) {

        const [CMD_NAME, ...args] = message.content.trim().substring(PREFIX.length).split(/\s+/)



        if (CMD_NAME === "anime") {
            animeImageSender(message, args)
        }

        else if (CMD_NAME === "help") {
            helpInfoSender(message)
        }

        else if (CMD_NAME === 'play') {
            if (!checkMounted(message)) return
            if (args.length === 0) {
                message.channel.send("Atleast tell me what to play !")
                return
            } distube.play(message, args.join(" "))
        }

        else if (CMD_NAME === 'tts') {
            tts(message, args, client)
        }

        else if (CMD_NAME === 'disconnect' || CMD_NAME === 'leave') {
         console.log()   
         message.member.voice.channel.leave()
        }

    }
})






client.login(process.env.DISCORDJS_BOT_TOKEN)

