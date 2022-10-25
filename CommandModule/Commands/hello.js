const hello = (name,channel,message,connection) => {
    connection.send(`PRIVMSG ${channel} : hello there @${name}`)
}

module.exports= {execute:hello}