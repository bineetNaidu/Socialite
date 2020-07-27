const express = require("express");
const router = express.Router();
const {
    showComments,
    postComments,
    editComment,
    deleteComment,
    updateComment,
} = require("../controllers/comment");
const { isLoggedIn, isCommentsAuthor } = require("../middleware");

/* GET Show Comment page. */
router.get("/posts/:id/comments", isLoggedIn, showComments);
/* POST comments */
router.post("/posts/:id/comments", isLoggedIn, postComments);
// GET comment edit page
router.get(
    "/posts/:id/comments/:comment_id/edit",
    isLoggedIn,
    isCommentsAuthor,
    editComment
);
// PUT comment
router.put(
    "/posts/:id/comments/:comment_id",
    isLoggedIn,
    isCommentsAuthor,
    updateComment
);
// DESTROY COMMENT
router.delete(
    "/posts/:id/comments/:comment_id",
    isLoggedIn,
    isCommentsAuthor,
    deleteComment
);

module.exports = router;
