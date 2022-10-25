var fs = require('fs');
const help = (name,channel,message,connection) =>{
    connection.send(`PRIVMSG ${channel} : @${name}, available commends are : `+fs.readdirSync(__dirname).map(item => {
        return "-"+item.replace(".js","")
    }).join(","))
}

module.exports={execute:help}