const User = require("../models/user");
const Post = require("../models/post");
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
};
