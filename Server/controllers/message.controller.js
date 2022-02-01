// const { message } = require("../../Client/src/store/message.module");
const db = require("../models");
const Message = require("../models/message.model")
const msg = require("../../Client/src/store/message.module");

exports.addMessage = (req, res) => {
    
    const message = new Message({
        title: req.body.title,
        body: req.body.body,
        author: req.body.author
    });

    message.save((err, message) => {
        if(err) {
            res.status(500).send({ message: err });
            return;
        }

        res.status(200).send({ message: "Messsage created!" });
    })
}

exports.allMessages = (req, res) => {
    res.status(200).send("All Messages");
    console.log("All messages returning all messages");
    return msg.find({});
}
