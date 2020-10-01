const express = require("express");
const router = express.Router();
const {
    newPost,
    createPost,
    editPost,
    deletePost,
    updatePost,
} = require("../controllers/posts");
const { isLoggedIn, isPostsAuthor } = require("../middleware");

/* GET post new page. */
router.get("/posts/new", isLoggedIn, newPost);
// POST on post page
router.post("/posts", isLoggedIn, createPost);

// GET post/:id
router.get("/posts/:id/edit", isLoggedIn, isPostsAuthor, editPost);
// PUT post/:id
router.put("/posts/:id", isLoggedIn, isPostsAuthor, updatePost);

// DESTROY POSTS/:id
router.delete("/posts/:id", isLoggedIn, isPostsAuthor, deletePost);

module.exports = router;
