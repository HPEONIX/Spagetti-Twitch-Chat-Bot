const WebSocket =  require('ws');

const socket = require('../server').socket

const BrodcastPollingEnd = (result)=>{
    socket.clients.forEach((client)=>{
        if(client.readyState === WebSocket.OPEN)
        {
            client.send( JSON.stringify({event:"voteEnd",data:result}) )
        }
    })
}


module.exports=BrodcastPollingEnd
