const discordTTS = require('discord-tts')


tts = (message,args,client)=>{
    const broadcast = client.voice.createBroadcast();
            const channelId = message.member.voice.channelID;
            const channel = client.channels.cache.get(channelId);
            if (!channel) {
                message.channel.send("Please connect to a voice channel, PLEASE!!!!!!!! :////")
                return
            }
            if (args.length === 0) {
                message.channel.send("Please tell me what to say, PLEASE!!!!!!!")
                return
            }
            channel.join().then(connection => {
                broadcast.play(discordTTS.getVoiceStream(args.join(" ")));
                const dispatcher = connection.play(broadcast);
            });
}



module.exports = tts