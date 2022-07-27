const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
    postId: {
        type: Number,
        required: true,
    },
    nickName: {
        type: String,
        required: true,
        unique: true,
    },
    commentPosting: {
        type: String,
        required: true,
    },
    commentCreatedAt: {
        type: Date
    }
});

module.exports = mongoose.model("Comments", commentSchema)