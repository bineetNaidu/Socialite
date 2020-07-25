const express = require("express");
const router = express.Router();
const { loginPage, signupPage, homePage } = require("../controllers");

/* GET login page. */
router.get("/", homePage);
/* GET signup page. */
router.get("/signup", signupPage);
/* GET home page. */
router.get("/login", loginPage);

module.exports = router;
