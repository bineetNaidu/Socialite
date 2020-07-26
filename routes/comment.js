const express = require("express");
const router = express.Router();
const { showComments, postComments } = require("../controllers/comment");

/* GET Show Comment page. */
router.get("/posts/:id/comments", showComments);
/* POST comments */
router.post("/posts/:id/comments", postComments);

module.exports = router;
