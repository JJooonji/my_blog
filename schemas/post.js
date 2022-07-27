const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
    postId: {
        type: Number,
        required: true,
        uniapu: true,
    },
    user: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        unique: true,
    },
    title: {
        type: String,
        required: true,
    },
    posting: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date
    }
});

module.exports = mongoose.model("Posts", postSchema);