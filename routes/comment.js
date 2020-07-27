const express = require("express");
const router = express.Router();
const {
    showComments,
    postComments,
    editComment,
    deleteComment,
    updateComment,
} = require("../controllers/comment");
const { isLoggedIn } = require("../middleware");

/* GET Show Comment page. */
router.get("/posts/:id/comments", showComments);
/* POST comments */
router.post("/posts/:id/comments", isLoggedIn, postComments);
// GET comment edit page
router.get("/posts/:id/comments/:comment_id/edit", isLoggedIn, editComment);
// PUT comment
router.put("/posts/:id/comments/:comment_id", isLoggedIn, updateComment);
// DESTROY COMMENT
router.delete("/posts/:id/comments/:comment_id", isLoggedIn, deleteComment);

module.exports = router;
