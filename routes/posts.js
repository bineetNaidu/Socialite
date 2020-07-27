const express = require("express");
const router = express.Router();
const {
    newPost,
    createPost,
    editPost,
    deletePost,
    updatePost,
} = require("../controllers/posts");
const { isLoggedIn } = require("../middleware");

/* GET post new page. */
router.get("/posts/new", isLoggedIn, newPost);
// POST on post page
router.post("/posts", isLoggedIn, createPost);

// GET post/:id
router.get("/posts/:id", isLoggedIn, editPost);
// PUT post/:id
router.put("/posts/:id", isLoggedIn, updatePost);

// DESTROY POSTS/:id
router.delete("/posts/:id", isLoggedIn, deletePost);

module.exports = router;
