const User = require("../models/user");
const Post = require("../models/post");
const passport = require("passport");
const util = require("util");
module.exports = {
    async getAllUser(req, res, next) {
        try {
            let users = await User.find({});
            if (!users) {
                return res.send("NO USER FOUND");
            }
            res.render("users/index", { users });
        } catch (error) {
            console.log(error);
            req.flash("error", error.message);
            return res.redirect("back");
        }
    },

    async viewUser(req, res, next) {
        try {
            let user = await User.findOne({ _id: req.params.userId });
            if (!user) {
                console.log("NO USER FOUND");
                return res.redirect("back");
            }
            let post = await Post.find()
                .where("author.id")
                .equals(user.id)
                .exec();
            res.render("users/show", { user, post });
        } catch (error) {
            console.log(error);
            req.flash("error", error.message);
            return res.redirect("back");
        }
    },

    async editProfile(req, res, next) {
        let user = await User.findOne({ _id: req.params.userId });
        if (!user) {
            console.log("NO USER FOUND");
            return res.redirect("back");
        }
        res.render("users/profile", { user });
    },

    // update Profile
    async updateProfile(req, res, next) {
        // destructure username and email from req.body
        const { username, email, firstname, lastname, avatar, bio } = req.body;
        // destructure user object from res.locals
        const { user } = res.locals;
        // check if username or email need to be updated
        if (username) user.username = username;
        if (email) user.email = email;
        if (firstname) user.firstName = firstname;
        if (lastname) user.lastName = lastname;
        if (avatar) user.avatar = avatar;
        if (bio) user.bio = bio;
        // save the updated user to the database
        await user.save();
        // promsify req.login
        const login = util.promisify(req.login.bind(req));
        // log the user back in with new info
        await login(user);
        // redirect to /profile with a success flash message
        req.flash("success", "Profile successfully updated!");
        res.redirect(`/users/${req.params.userId}/edit`);
    },
};
