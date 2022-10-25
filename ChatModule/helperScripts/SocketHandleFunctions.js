const { splitMessage, parseMessage } = require('./twitchRTCParcer')
const { messageFlowStage, messageFlowStageType, chatSocketConnectEventHandler, chatSocketConnectEventType } = require('../../EventCallbackSystem/customEvents')
require('dotenv').config('../../.env')
const handleSocketOpen = (connection,nickName,passKey) => {
    connection.send('CAP REQ :twitch.tv/membership twitch.tv/tags twitch.tv/commands')
    connection.send(`PASS oauth:${process.env.APP_INIT_PWD}`)
    connection.send(`NICK ${process.env.APP_NAME}`)
    chatSocketConnectEventHandler.emit(chatSocketConnectEventType.open, { connection })
}

const handleSocketMessages = (connection, rawMessages) => {
    messageFlowStage.emit(messageFlowStageType.preBulkMessagesProcess, { connection })
    splitMessage(rawMessages).map((value) => {
        const parsedMessage = parseMessage(value)
        messageFlowStage.emit(messageFlowStageType.preMessageProcess, { value, connection })
        if (parsedMessage){
            switch (parsedMessage.command.command) {
                case "001":
                    chatSocketConnectEventHandler.emit(chatSocketConnectEventType.login,{ connection })
                    break;
                case "PING":
                    handleSocketPing(connection)
                    break;
                case "JOIN":
                    handleOnJoin(connection)
                    break;
                case "PRIVMSG":   
                    messageFlowStage.emit(messageFlowStageType.onMessageProcess, { parsedMessage, connection })
                    break;
            }
        }
        messageFlowStage.emit(messageFlowStageType.postMessageProcess, { value, connection })
    })
    messageFlowStage.emit(messageFlowStageType.postBulkMessagesProcess, { connection })
}

const handleSocketPing = (connection) => {
    connection.send('PONG :tmi.twitch.tv');
    chatSocketConnectEventHandler.emit(chatSocketConnectEventType.ping, { connection })
}

const handleOnJoin = (connection) => {
    chatSocketConnectEventHandler.emit(chatSocketConnectEventType.onChannelJoin, { connection })
}

module.exports={handleSocketOpen,handleSocketMessages}