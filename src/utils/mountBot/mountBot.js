checkMounted = (message)=>{
    if(!message.member.voice.channel){message.channel.send("Please connect to a channel") 
    return false }
    return true
}

module.exports = checkMounted