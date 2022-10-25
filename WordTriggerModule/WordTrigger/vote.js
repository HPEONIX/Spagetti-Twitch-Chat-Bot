const { VoteEventHandler, VoteEventType } = require('../../EventCallbackSystem/customEvents')

const chooseOption = (name,channel,message)=>{
    const option = message.trim()
    if(!/^[0-9]+$/.test(option)) return null
    VoteEventHandler.emit(VoteEventType.onVote,{name,option})
    return null
}
module.exports={execute:chooseOption}