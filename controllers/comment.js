const Comment = require("../models/comment");
const Post = require("../models/post");
module.exports = {
    async showComments(req, res, next) {
        let post = await Post.findById(req.params.id)
            .populate("comments")
            .exec();
        if (!post) {
            console.log("no post found");
            req.flash("error", "NO POST FOUND!");
            return res.redirect("/");
        }
        res.render("comments/show", { post });
    },
    async postComments(req, res, next) {
        try {
            // find the iD
            Post.findById(req.params.id, async (err, Foundpost) => {
                // ID fOUND
                if (err || !Foundpost) {
                    console.log(err);
                    req.flash("error", "NO POST FOUND!");
                    return res.redirect("back");
                }
                // Create a comment
                await Comment.create(
                    req.body.comment,
                    (err, createdComment) => {
                        if (err) {
                            console.log(err);
                            req.flash("error", "SOMETHING WENT WRONG!");
                            return res.redirect("back");
                        }
                        // add username and id to comment
                        createdComment.author.id = req.user._id;
                        createdComment.author.username = req.user.username;
                        createdComment.author.avatar = req.user.avatar;
                        createdComment.save();
                        // Push the commentData to post
                        Foundpost.comments.push(createdComment);
                        Foundpost.save();
                        // redirect to home
                        res.redirect("/posts/" + req.params.id + "/comments");
                    }
                );
            });
        } catch (error) {
            console.log(error);
            req.flash("error", "SOMETHING WENT WRONG!");
            res.redirect("/");
        }
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
                    req.flash("error", err.message);
                    req.redirect("/");
                }
            } else {
                console.log("post not found");
                req.flash("error", "NO POST FOUND!");
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
                    req.flash("success", "Successfully updated comment");
                    res.redirect(`/posts/${req.params.id}/comments/`);
                } else {
                    console.log("Comments not found");
                    req.flash("error", "Comments not found");
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
            req.flash("success", "Successfully deleted comment");
            res.redirect(`/posts/${req.params.id}/comments`);
        } catch (error) {
            console.log(error);
        }
    },
};
