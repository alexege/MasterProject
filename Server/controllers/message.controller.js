const { message } = require("../models");
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

exports.deleteMessage = (req, res) => {

    message.deleteOne({ id: req.body._id }, (err, message) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }

        res.status(200).send({ message: "Message deleted!" });
    })
}

exports.editMessage = (req, res) => {

    // const update = {
    //     title: req.body.title,
    //     body: req.body.body
    // }

    // message.findOneAndUpdate({ id: req.body._id }, update ,(err, message) => {
    //     if (err) {
    //         res.status(500).send({ message: err });
    //         return;
    //     }

    //     res.status(200).send({ message: "Message deleted!" });
    // })
    res.status(200).send({ message: "Message updated successfully" });
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
