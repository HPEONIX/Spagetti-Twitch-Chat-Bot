const WebSocket =  require('ws');

const socket = require('../server').socket

const BrodcastPollingStart = (voting)=>{
    socket.clients.forEach((client)=>{
        if(client.readyState === WebSocket.OPEN)
        {
            client.send( JSON.stringify({event:"voteStart",data:voting}) )
        }
    })
}

module.exports=BrodcastPollingStart