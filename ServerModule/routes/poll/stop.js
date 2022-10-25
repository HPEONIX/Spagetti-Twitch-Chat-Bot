var express = require('express');
var router = express.Router();
const PollHandler = require('../../../PollModule/poll')

router.get('/', (req, res) => {
    var payload={}
    PollHandler.stopPoll()
    payload["data"]={quiz:PollHandler.currentQuestion,options:PollHandler.getAllResult()}
    payload={message:"success"}
    res.send(payload)
})

module.exports = router