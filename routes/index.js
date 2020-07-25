const express = require("express");
const router = express.Router();
const {
    loginPage,
    signupPage,
    homePage,
    postLogin,
    postSignup,
} = require("../controllers");

/* GET login page. */
router.get("/", homePage);
/* GET signup page. */
router.get("/signup", signupPage);
// POST signup
router.post("/signup", postSignup);
/* GET home page. */
router.get("/login", loginPage);
// POST login
router.post("/login", postLogin);

module.exports = router;
