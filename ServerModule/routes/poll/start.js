var express = require('express');
const { onPollStart } = require('../../../PollModule/pollSubscribers');
var router = express.Router();

router.post('/', (req, res) => {
    var payload={message:"trigger success"}
    const quiz=req.body.quiz
    const mappedOption = req.body.options
    var payload={}
    (onPollStart({quiz,mappedOption}))?payload={message:"success"} : payload={message:"failed"}
    res.send(payload)
})

module.exports = router