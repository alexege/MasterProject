const { message, user } = require("../models");
const db = require("../models");
const User = db.user;
const Role = db.role;
const Message = db.message;
const Comment = db.comment;

exports.addMessage = (req, res) => {
    console.log("req.body:", req.body);

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

        if(req.body.author){
            console.log("User body author was found", req.body.author);

            User.findOne({
                _id: { $in: req.body.author }
            },
            (err, author) => {
                if(err) {
                    res.status(500).send({ message: err });
                    return;
                }
                console.log("author: ", author);
    
                message.authorName = author;

                message.save(err => {
                    if (err) {
                        res.status(500).send({ message: err });
                        return;
                    }
                })

                console.log("new message: ", message);
                // res.status(200).send({ message: "Message created successfully!" });
                res.status(200).send({ 
                    id: message._id,
                    title: message.title,
                    body: message.body,
                    author: author.username
                })
            })
        }

        // res.status(200).send({ message: "Messsage created!" });
    })
}

exports.addComment = (req, res) => {

    const comment = new Comment({
        body: req.body.body,
        author: req.body.author
    })

    comment.save((err, comment) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }

        Message.findOne({
            _id: { $in: req.body.messageId }
        },
        (err, message) => {
            console.log("Message was found: ", message);
            console.log("Message was found: ", message.comments);
            if (err) {
                res.status(500).send({ message: err });
                return;
            }

            message.comments.push(comment);

            message.save();

            res.status(200).send({
                message: "Comment added!"
            })
        })
    })

    console.log("Adding a comment", req.body);
    message.find({ _id: req.body.messageId }, (err, message) => {

    })
}

exports.deleteMessage = (req, res) => {
    message.deleteOne({ _id: req.params.id }, (err, message) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }

        console.log("Messag: ", message);

        res.status(200).send({ message: "Message deleted!" });
    })
}

exports.editMessage = (req, res) => {

    const update = {
        title: req.body.title,
        body: req.body.body
    }

    console.log("req:", req.body);
    console.log("req:", req.params.id);

    // let test = Message.findById({ _id: req.params.id });
    // console.log("test is: ", test);

    message.findByIdAndUpdate({ _id: req.params.id }, update ,(err, message) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        } else {
            console.log("message: ", message);
        }

    //     res.status(200).send({ message: "Message deleted!" });
    res.status(200).send({ message: "Message updated successfully" });
    })
}

exports.allMessages = (req, res) => {
    Message.find({}, (err, messages) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }
        res.status(200).send({ messages })
    }).sort([['createdAt', 'descending']])
}

exports.allComments = (req, res) => {
    Comment.find({}, (err, comments) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }
        res.status(200).send({ comments })
    }).sort([['createdAt', 'ascending']])
}
