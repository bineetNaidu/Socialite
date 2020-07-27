const mongoose = require("mongoose");
const Comment = require("./comment");

const postSchema = new mongoose.Schema({
    image: String,
    description: String,
    createdAt: {
        type: Date,
        default: Date.now,
    },
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Comment",
        },
    ],
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
        avatar: String,
        username: String,
    },
});

postSchema.pre("remove", async function () {
    await Comment.remove({
        _id: {
            $in: this.comments,
        },
    });
});

module.exports = mongoose.model("Post", postSchema);
