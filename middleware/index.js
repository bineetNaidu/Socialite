module.exports = {
    isLoggedIn: (req, res, next) => {
        if (req.isAuthenticated()) return next();
        req.flash("error", "Oops!, You Need To Login");
        res.redirect("/login");
    },
};
