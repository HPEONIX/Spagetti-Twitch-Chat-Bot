const managePoll = require('../../PollModule/poll')
const {VoteEventHandler,VoteEventType} = require('../../EventCallbackSystem/customEvents')

const pollStop = (name,channel,message,connection) =>{
    if(channel !== `#${name}`){ 
        connection.send( `PRIVMSG ${channel} :you cannot use that command @${name}`)
    }
    // voteEventHandler.emit(voteEventType.voteEnd)
    VoteEventHandler.emit(VoteEventType.voteEnd)
    const result= managePoll.getResult()
    managePoll.resetPoll()
    connection.send((result)?`PRIVMSG ${channel} :the poll has ended, the winner is '${result.name}' with '${result.value} votes'`:'no poll running')
}

module.exports={execute:pollStop}