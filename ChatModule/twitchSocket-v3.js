const WebSocket = require('ws')
const managePoll = require('../PollModule/poll')
const { handleSocketOpen, handleSocketMessages } = require('./helperScripts/SocketHandleFunctions')
const { chatSocketConnectEventHandler, chatSocketConnectEventType } = require('../EventCallbackSystem/customEvents')


class TwitchSocket {
    constructor() {
        this.channelName = new Set()
        this.canJoin = false
        //return connection if it already exists
        if (TwitchSocket._instance) return TwitchSocket._instance
        const ws = new WebSocket('ws://irc-ws.chat.twitch.tv:80', "irc")
        chatSocketConnectEventHandler.once(chatSocketConnectEventType.login,()=>{
            this.canJoin = true
        })
        this.ws = ws
        this.ws.on('open',() => {
            console.log("connected")
            if (!ws.readyState === 1) {
                console.log("failed", ws.readyState)
                throw new Error('socket connection failed');
            }
            handleSocketOpen(ws)
        })
        this.ws.on("message", (data, isBinary) => {
            const rawMessages = isBinary ? data : data.toString();
            handleSocketMessages(this.ws,rawMessages)
        })
        
        TwitchSocket._instance = this
    }
    joinChannel(channelName){
        if(this.canJoin)
        {
            this.channelName.add(channelName)
            this.ws.send(`JOIN #${channelName}`)
            return
        }
        chatSocketConnectEventHandler.once(chatSocketConnectEventType.login,()=>{
            this.ws.send(`JOIN #${channelName}`)
        })
    }
    sendMessage(channelName,message){
        if(this.ws && this.ws.readyState === 1){
            this.ws.send(`PRIVMSG #${channelName} :${message}`)
            return
        }
        chatSocketConnectEventHandler.once(chatSocketConnectEventType.login,()=>{
            this.ws.send(`PRIVMSG #${channelName} :${message}`)
        })
    }
}
const tsocket = new TwitchSocket()
module.exports = { TwitchSocket: tsocket }
