const basePath = "./commands/"
const commandSymbol ="-"
const fs = require("fs");
var path = require('path');

const commandInterface = ({parsedMessage,connection})=>{
    if(parsedMessage.parameters.startsWith(commandSymbol))
    {
        const command=(parsedMessage.parameters.split(" ")[0]).substring(1)
        const commandlist=fs.readdirSync(path.join(__dirname,basePath)).map(item => {
            return item.replace(".js","")
        })
        if(!commandlist.includes(command)) return "command not found"
        const filepath = path.join(__dirname,basePath,`${command}.js`);
        const commandModule = require(filepath)
        return commandModule.execute(parsedMessage.source.nick,parsedMessage.command.channel,parsedMessage.parameters,connection)
    }
    return null
}


module.exports= {commandInterface}