const Comment = require("../models/comment");
const Post = require("../models/post");
module.exports = {
    async showComments(req, res, next) {
        let post = await Post.findById(req.params.id)
            .populate("comments")
            .exec();
        if (!post) {
            console.log("no post found");
            return res.redirect("/");
        }
        res.render("comments/show", { post });
    },
    async postComments(req, res, next) {
        let post = await Post.findById(req.params.id);
        if (!post) {
            console.log("no post found");
            return res.redirect("/");
        }
        let comment = await Comment.create(req.body.comment);
        post.comments.push(comment);
        post.save();
        res.redirect(`/posts/${req.params.id}/comments`);
    },
};
