const WebSocket =  require('ws');
const managePoll = require('../../PollModule/poll');

const socket = require('../server').socket

const BrodcastPolling = ()=>{
    if(!managePoll.isPollActive) return
    socket.clients.forEach((client)=>{
        if(client.readyState === WebSocket.OPEN)
        {
            client.send( JSON.stringify({event:"voteCast",data:{poll:managePoll.getAllResult(),total:managePoll.getTotalCount()}}) )
        }
    })
}

module.exports=BrodcastPolling