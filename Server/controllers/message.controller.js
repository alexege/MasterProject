const db = require("../models");
const User = db.user;
const Role = db.role;
const Message = db.message;

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
    Message.find({}, (err, messages) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }
        res.status(200).send({ messages })
    })
}
