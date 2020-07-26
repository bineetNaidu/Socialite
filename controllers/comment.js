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
    async editComment(req, res, next) {
        try {
            let post = await Post.findById(req.params.id);
            if (post) {
                let comment = await Comment.findOne({
                    _id: req.params.comment_id,
                });
                if (comment) {
                    res.render("comments/edit", { comment, post });
                } else {
                    console.log("Comments not found");
                    req.redirect("/");
                }
            } else {
                console.log("post not found");
                req.redirect("/");
            }
        } catch (error) {
            console.log(error);
        }
    },
    async updateComment(req, res, next) {
        try {
            let post = await Post.findById(req.params.id);
            if (post) {
                let comment = await Comment.findOne({
                    _id: req.params.comment_id,
                });
                if (comment) {
                    await Comment.findOneAndUpdate(
                        { _id: req.params.comment_id },
                        req.body.comment
                    );
                    comment.save();
                    res.redirect(`/posts/${req.params.id}/comments/`);
                } else {
                    console.log("Comments not found");
                    req.redirect("/");
                }
            } else {
                console.log("post not found");
                req.redirect("/");
            }
        } catch (error) {}
    },
    async deleteComment(req, res, next) {
        try {
            await Post.findByIdAndUpdate(req.params.id, {
                $pull: { comments: req.params.comment_id },
            });
            await Comment.findByIdAndRemove(req.params.comment_id);
            res.redirect(`/posts/${req.params.id}/comments`);
        } catch (error) {
            console.log(error);
        }
    },
};
