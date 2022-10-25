const managePoll = require("./poll");

const onVote =({name,option})=>{
    if(!managePoll.isPollActive) return null
    managePoll.castVote(option,name)
    return null
}

const onPollStart=({quiz,options})=>
{
    return managePoll.startPoll(quiz, options)
}

const getPollManager = () => {
    return getPollManager
}


module.exports={onVote,onPollStart,getPollManager}