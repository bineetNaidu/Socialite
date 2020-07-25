const express = require("express");
const router = express.Router();
const {
    newPost,
    createPost,
    editPost,
    deletePost,
    updatePost,
} = require("../controllers/posts");

/* GET post new page. */
router.get("/posts/new", newPost);
// POST on post page
router.post("/posts", createPost);

// GET post/:id
router.get("/posts/:id", editPost);
// PUT post/:id
router.put("/posts/:id", updatePost);

// DESTROY POSTS/:id
router.delete("/posts/:id", deletePost);

module.exports = router;
