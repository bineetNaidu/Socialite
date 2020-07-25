const express = require("express");
const router = express.Router();
const { newPost, createPost } = require("../controllers/posts");

/* GET post new page. */
router.get("/posts/new", newPost);
// POST on post page
router.post("/posts", createPost);

module.exports = router;
