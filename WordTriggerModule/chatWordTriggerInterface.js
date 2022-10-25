const vote=require('./WordTrigger/vote')

const WordTriggerInterface = ({parsedMessage,connection}) =>{
    vote.execute(parsedMessage.source.nick,parsedMessage.command.channel,parsedMessage.parameters)
}

module.exports={WordTriggerInterface}