const express = require("express");
const router = express.Router();
const { getAllUser, viewUser } = require("../controllers/user");

// show all user
router.get("/users", getAllUser);

// show specific user by userId
router.get("/users/:userId", viewUser);

module.exports = router;
