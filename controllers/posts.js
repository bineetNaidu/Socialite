const Post = require("../models/post");
module.exports = {
    newPost(req, res, next) {
        res.render("posts/new");
    },
    async createPost(req, res, next) {
        try {
            await Post.create(req.body.post, (err, createdPost) => {
                if (err || !createdPost) {
                    console.log(err);
                    return res.redirect("back");
                }
                res.redirect("/");
            });
        } catch (error) {
            console.log(err);
        }
    },
};
