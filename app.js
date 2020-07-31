require("dotenv").config();
const createError = require("http-errors");
const express = require("express");
const engine = require("ejs-mate");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const methodOverride = require("method-override");
const mongoose = require("mongoose");
const passport = require("passport");
const session = require("express-session");
const passportLocal = require("passport-local");
const flash = require("connect-flash");
const User = require("./models/user");

const indexRouter = require("./routes/index");
const postsRouter = require("./routes/posts");
const commentsRouter = require("./routes/comment");
const userRouter = require("./routes/user");

const app = express();

// connecting MongoDB
const dbURI =
    process.env.DB_CONNECTION || "mongodb://localhost:27017/socialite";

mongoose
    .connect(dbURI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
    })
    .then(() => {
        console.log("connected to db");
    })
    .catch((err) => console.log("something is WORNG --- " + err.message));

// use ejs-locals for all ejs templates:
app.engine("ejs", engine);
// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(methodOverride("_method"));
app.locals.moment = require("moment");
app.use(flash());

// passport configure
app.use(
    session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
    })
);
app.use(passport.initialize());
app.use(passport.session());

//config Passport and Sessions
// CHANGE: USE "createStrategy" INSTEAD OF "authenticate"
passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// global variables
app.use((req, res, next) => {
    // for user
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
});

// mounting routes
app.use("/", indexRouter);
app.use(postsRouter);
app.use(commentsRouter);
app.use(userRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
    next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
    // // set locals, only providing error in development
    // res.locals.message = err.message;
    // res.locals.error = req.app.get("env") === "development" ? err : {};

    // // render the error page
    // res.status(err.status || 500);
    // res.render("error");

    console.log(err);
    req.flash("error", err.message);
    res.redirect("back");
});

module.exports = app;
