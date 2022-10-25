const EventEmitter = require('events').EventEmitter
class customEventClass extends EventEmitter {}

const voteEventEmitter = new customEventClass()

const VoteEventType = {
    "voteEnd":Symbol("voteEnd"),
    "voteStart":Symbol("voteStart"),
    "voteCast":Symbol("voteCast"),
    "onVote":Symbol("onVote")
}

const messageFlowStage = new customEventClass()

const messageFlowStageType = {
    "preBulkMessagesProcess":Symbol("preBulkMessagesProcess"),
    "preMessageProcess":Symbol("preMessageProcess"),
    "onMessageProcess":Symbol("onMessageProcess"),
    "postMessageProcess":Symbol("postMessageProcess"),
    "postBulkMessagesProcess":Symbol("postBulkMessagesProcess")
}

const chatSocketConnectEventHandler = new customEventClass()

const chatSocketConnectEventType  = {
    "login":Symbol("login"),
    "ping":Symbol("ping"),
    "open":Symbol("open"),
    "connected":Symbol("connected"),
    "onChannelJoin":Symbol("onChannelJoin")
}

const messageType ={
    "misc":Symbol("misc"),
    "commend":Symbol("commend"),
    "trigger":Symbol("trigger")
}

module.exports={VoteEventHandler:voteEventEmitter,VoteEventType,messageFlowStage,messageFlowStageType, chatSocketConnectEventHandler, chatSocketConnectEventType}