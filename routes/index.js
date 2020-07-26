const express = require("express");
const router = express.Router();
const passport = require("passport");
const {
    loginPage,
    signupPage,
    homePage,
    postSignup,
    logout,
} = require("../controllers");
const { isLoggedIn } = require("../middleware");

/* GET login page. */
router.get("/", isLoggedIn, homePage);
/* GET signup page. */
router.get("/signup", signupPage);
// POST signup
router.post("/signup", postSignup);
/* GET home page. */
router.get("/login", loginPage);
// POST login
router.post(
    "/login",
    passport.authenticate("local", {
        successRedirect: "/",
        failureRedirect: "/login",
        failureFlash: true,
        successFlash: `Welcome back`,
    }),
    (req, res) => {}
);
// logout route
router.get("/logout", logout);

module.exports = router;
