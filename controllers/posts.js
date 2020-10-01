const Post = require("../models/post");
module.exports = {
    newPost(req, res, next) {
        res.render("posts/new");
    },
    async createPost(req, res, next) {
        try {
            let author = {
                id: req.user._id,
                username: req.user.username,
                avatar: req.user.avatar,
            };
            let postData = {
                image: req.body.post.image,
                description: req.body.post.description,
                author: author,
            };
            Post.create(postData, (err, createdPost) => {
                if (err || !createdPost) {
                    console.log(err);
                    req.flash("error", "Something went wrong!");
                    return res.redirect("back");
                }
                req.flash("success", "You succecfully created the post");
                res.redirect("/");
            });
        } catch (error) {
            console.log(error);
            req.flash("error", error.message);
            return res.redirect("back");
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
            req.flash("error", error.message);
            return res.redirect("back");
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
                req.flash("success", "You succecfully updated the post");
                res.redirect("/");
            }
        );
    },
    async deletePost(req, res, next) {
        try {
            await Post.findOneAndRemove({ _id: req.params.id });
            req.flash("success", "You succecfully deleted the post");
            res.redirect("/");
        } catch (error) {
            console.log(error);
            req.flash("error", error.message);
            return res.redirect("back");
        }
    },
};
