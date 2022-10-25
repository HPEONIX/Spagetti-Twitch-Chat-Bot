const {VoteEventHandler,VoteEventType} = require('../../EventCallbackSystem/customEvents')

const strSplit =(message,pattern,occerance)=>{
    const arr = message.split(pattern)
    const result = arr.splice(0,occerance);
    result.push(arr.join(' '));
    return result
}
const pollStart = (name, channel, message,connection) => {
    if (channel !== `#${name}`) return `you cannot use that command @${name}`
    const unparsedQuiz=strSplit(message," ",1)[1]
    const parsedParams=strSplit(unparsedQuiz,'|',1)
    const optionList=parsedParams[parsedParams.length - 1].split(":")
    var optionMapped= {}
    optionList.map((value,index)=>{
        optionMapped[index]=value
    })
    VoteEventHandler.emit(VoteEventType.voteStart,{quiz:parsedParams[0],options:optionMapped})
    const optionString = ' '+ (optionList.map((item,index)=>{
        return index.toString()+") " + item.toString() 
    })).join(", ")
    connection.send(`PRIVMSG ${channel} : poll ${parsedParams[0]} has started with options :- ${optionString}`)
}

module.exports = { execute: pollStart }