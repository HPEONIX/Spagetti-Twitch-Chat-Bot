const express = require('express');
const ws = require('ws').Server
const path = require('path');
const managePoll = require('../PollModule/poll.js');
const { getPollManager } = require('../PollModule/pollSubscribers.js');

var app = express();
var server = require('http').createServer(app);

const socket =new ws({ server: server, path: "/socket" })

socket.on

socket.on("connection",(connection)=>{
    console.log("UI connected")
    if(!managePoll.isPollActive) return
    connection.send( JSON.stringify({event:"voteStart",data:managePoll.getPollInfo()}) )
})

var ping = require('./routes/ping.js');
app.use("/ping", ping);

var pollStart = require('./routes/poll/start')
app.use('/routes/poll/start', pollStart)

var pollStop = require('./routes/poll/stop')
app.use('/routes/poll/stop', pollStop)

app.use("/UI",express.static(path.join(__dirname,"Standalone")))

module.exports = {server,socket}