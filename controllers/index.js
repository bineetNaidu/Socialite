const Post = require("../models/post");
const User = require("../models/user");
const passport = require("passport");
module.exports = {
    loginPage(req, res, next) {
        res.render("login");
    },
    signupPage(req, res, next) {
        res.render("signup");
    },
    async postSignup(req, res, next) {
        try {
            let newUser = new User({
                username: req.body.username,
                avatar: req.body.avatar,
                firstName: req.body.firstname,
                lastName: req.body.lastname,
                email: req.body.email,
                bio: req.body.bio,
            });
            await User.register(newUser, req.body.password, (err, user) => {
                if (err) {
                    console.log(err);
                    req.flash("error", err.message);
                    return res.redirect("/signup");
                }
                passport.authenticate("local")(req, res, () => {
                    req.flash("success", "Wellcome to Socialite");
                    res.redirect("/");
                });
            });
        } catch (error) {
            console.log(error);
        }
    },
    async homePage(req, res, next) {
        let posts = await Post.find({});
        res.render("home", { posts });
    },
    logout(req, res, next) {
        req.logout();
        req.flash("success", "You are logged out!");
        res.redirect("/");
    },
};
