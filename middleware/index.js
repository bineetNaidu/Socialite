const Comment = require("../models/comment");
const Post = require("../models/post");
const User = require("../models/user");
module.exports = {
    isLoggedIn: (req, res, next) => {
        if (req.isAuthenticated()) return next();
        req.flash("error", "Oops!, You Need To Login");
        res.redirect("/login");
    },
    isCommentsAuthor: async (req, res, next) => {
        try {
            let comment = await Comment.findOne({ _id: req.params.comment_id });
            if (comment.author.id.equals(req.user._id)) {
                return next();
            }
            req.flash("error", "Your Not Authorized To Do That");
            res.redirect("back");
        } catch (error) {
            req.flash("error", "Oops!, Something Went Wrong!");
            res.redirect("back");
        }
    },
    isPostsAuthor: async (req, res, next) => {
        try {
            const post = await Post.findById(req.params.id);
            if (post.author.id.equals(req.user._id)) {
                return next();
            }
            req.flash("error", "Your Not Authorized To Do That");
            res.redirect("back");
        } catch (error) {
            req.flash("error", "Oops!, Something Went Wrong!");
            res.redirect("back");
        }
    },

    isFraud: async (req, res, next) => {
        try {
            let user = await User.findOne({ _id: req.params.userId });
            if (user.equals(req.user._id)) {
                return next();
            }
            req.flash("error", "Your Not Authorized To Do That");
            res.redirect("back");
        } catch (error) {
            req.flash("error", "Oops!, Something Went Wrong!");
            res.redirect("back");
        }
    },

    // validate password
    isValidPassword: async (req, res, next) => {
        try {
            const { user } = await User.authenticate()(
                req.user.username,
                req.body.currentPassword
            );
            if (user) {
                // add user to res.locals
                res.locals.user = user;
                // go to next middleware
                next();
            } else {
                // flash an error
                req.flash("error", "Your current password is incorrect!");
                // short circuit the route middleware and redirect to /profile
                return res.redirect(`/users/${req.params.userId}/edit`);
            }
        } catch (error) {
            req.flash("error", "Oops!, Something Went Wrong!");
            res.redirect("back");
        }
    },
    // changing password
    changePassword: async (req, res, next) => {
        // destructure new password values from req.body object
        const { newPassword, passwordConfirmation } = req.body;

        // check if newPassword is there but not passwordConfirmation
        if (newPassword && !passwordConfirmation) {
            req.flash("error", "Missing Password Confirmation!");
            return res.redirect(`/users/${req.params.userId}/edit`);
        }
        // check if new password values exist
        else if (newPassword && passwordConfirmation) {
            // destructure user from res.locals
            const { user } = res.locals;
            // check if new passwords match
            if (newPassword === passwordConfirmation) {
                // set new password on user object
                await user.setPassword(newPassword);
                // go to next middleware
                next();
            } else {
                // flash error
                req.flash("error", "New Password must match");
                // short circuit the route middleware and redirect to /profile
                return res.redirect(`/users/${req.params.userId}/edit`);
            }
        } else {
            // go to next middleware
            next();
        }
    },
};
