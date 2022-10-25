//start locat server
const twitchChatConnection = require('./ChatModule/twitchSocket-v3').TwitchSocket
const {server} = require('./ServerModule/server')
const { VoteEventHandler,VoteEventType, messageFlowStage, messageFlowStageType } = require('./EventCallbackSystem/customEvents')
const { commandInterface } = require('./CommandModule/chatCommandInterface')
const { WordTriggerInterface } = require('./WordTriggerModule/chatWordTriggerInterface')
const { onVote, onPollStart } = require('./PollModule/pollSubscribers')
require('dotenv').config('.env')

console.clear()
const main = async ()  =>{

    //voting module
    //VoteEventHandler.on(VoteEventType.voteCast,require(`./ServerModule/socket/voteCastBrodcast`))
    VoteEventHandler.on(VoteEventType.voteEnd,require(`./ServerModule/socket/voteEndBrodcast`))
    VoteEventHandler.on(VoteEventType.voteStart,require(`./ServerModule/socket/voteStartBrodcast`))

    VoteEventHandler.on(VoteEventType.voteStart,onPollStart)
    VoteEventHandler.on(VoteEventType.onVote,onVote)
    messageFlowStage.on(messageFlowStageType.postBulkMessagesProcess,require(`./ServerModule/socket/voteCastBrodcast`))

    //command processing module
    messageFlowStage.on(messageFlowStageType.onMessageProcess,commandInterface)


    //word trigger module
    messageFlowStage.on(messageFlowStageType.onMessageProcess,WordTriggerInterface)

    //logging
    messageFlowStage.on(messageFlowStageType.onMessageProcess,({ parsedMessage, connection })=>{console.log(parsedMessage.source.nick,parsedMessage.parameters)})

    twitchChatConnection.joinChannel(`${process.env.APP_CHANNEL_NAME}`)
    twitchChatConnection.sendMessage(`${process.env.APP_CHANNEL_NAME}`, `${process.env.APP_GREETING}`)
    console.log("socket started")

    server.listen(3000, () => { console.log("server started at 3000"); })
}


main()