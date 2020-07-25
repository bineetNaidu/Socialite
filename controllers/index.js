const Post = require("../models/post");
module.exports = {
    loginPage(req, res, next) {
        res.render("login");
    },
    async postLogin(req, res, next) {
        try {
            res.send(req.body);
        } catch (error) {
            console.log(error);
        }
    },
    signupPage(req, res, next) {
        res.render("signup");
    },
    async postSignup(req, res, next) {
        try {
            res.send(req.body);
        } catch (error) {
            console.log(error);
        }
    },
    async homePage(req, res, next) {
        let posts = await Post.find({});
        res.render("home", { posts });
    },
};
