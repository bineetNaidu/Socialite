module.exports = {
    loginPage(req, res, next) {
        res.render("login");
    },
    signupPage(req, res, next) {
        res.render("signup");
    },
    homePage(req, res, next) {
        res.render("home");
    },
};
