const mongoose = require("mongoose");

const Message = mongoose.model(
    "Message",
    new mongoose.Schema({
        title: String,
        body: String,
        author: {
            type: mongoose.Schema.Types.ObjectId, ref: 'Author'
        }
    })
);

module.exports = Message;