const express = require("express");
const router = express.Router();
const {
    getAllUser,
    viewUser,
    editProfile,
    updateProfile,
} = require("../controllers/user");
const {
    isFraud,
    isLoggedIn,
    isValidPassword,
    changePassword,
} = require("../middleware");

// show all user
router.get("/users", getAllUser);

// show specific user by userId
router.get("/users/:userId", viewUser);

// update profile page
router.get("/users/:userId/edit", isLoggedIn, isFraud, editProfile);

// updateing user profile
router.put(
    "/users/:userId",
    isLoggedIn,
    isValidPassword,
    changePassword,
    updateProfile
);

module.exports = router;
