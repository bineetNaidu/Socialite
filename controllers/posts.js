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
    async editPost(req, res, next) {
        try {
            let post = await Post.findOne({ _id: req.params.id });
            if (!post) {
                console.log("NO POST FOUND");
                return res.redirect("back");
            }
            res.render("posts/edit", { post });
        } catch (error) {
            console.log(error);
        }
    },
    async updatePost(req, res, next) {
        await Post.findByIdAndUpdate(
            req.params.id,
            req.body.post,
            (err, update) => {
                if (err) {
                    console.log(err);
                    return res.redirect("/");
                }
                res.redirect("/");
            }
        );
    },
    async deletePost(req, res, next) {
        try {
            await Post.findOneAndRemove({ _id: req.params.id });
            res.redirect("/");
        } catch (error) {
            console.log(error);
        }
    },
};
