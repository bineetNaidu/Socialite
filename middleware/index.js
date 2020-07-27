const Comment = require("../models/comment");
const Post = require("../models/post");
module.exports = {
    isLoggedIn: (req, res, next) => {
        if (req.isAuthenticated()) return next();
        req.flash("error", "Oops!, You Need To Login");
        res.redirect("/login");
    },
    isCommentsAuthor: async (req, res, next) => {
        let comment = Comment.findById(req.params.comment_id);
        if (comment.author.id.equals(req.user.id)) {
            return next();
        }
        req.flash("error", "Your Not Authorized To Do That");
        return res.redirect("back");
    },
    isPostsAuthor: async (req, res, next) => {
        const post = await Post.findById(req.params.id);
        if (post.author.equals(req.user._id)) {
            return next();
        }
        req.flash("error", "Your Not Authorized To Do That");
        res.redirect("back");
    },
};
