const express = require("express");
const router = express.Router();
const {
    showComments,
    postComments,
    editComment,
    deleteComment,
    updateComment,
} = require("../controllers/comment");

/* GET Show Comment page. */
router.get("/posts/:id/comments", showComments);
/* POST comments */
router.post("/posts/:id/comments", postComments);
// GET comment edit page
router.get("/posts/:id/comments/:comment_id/edit", editComment);
// PUT comment
router.put("/posts/:id/comments/:comment_id", updateComment);
// DESTROY COMMENT
router.delete("/posts/:id/comments/:comment_id", deleteComment);

module.exports = router;
