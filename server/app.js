require("dotenv").config();
const express = require("express");
const ejs = require("ejs");
const mongoose = require("mongoose");
const fs = require("fs");
const path = require("path");
const bodyParser = require("body-parser");
const session = require("express-session");
const passport = require("passport");
const passportLocalMongoose = require("passport-local-mongoose");
const multer = require("multer");
const User = require("./models/user");
const Blog = require("./models/blog");
const userRoutes = require("./routes/user");
const resumeRoutes = require("./routes/resume");
const blogRoutes = require("./routes/blog");
const dashboardRoutes = require("./routes/dashboard");
const counsellorsRoutes = require("./routes/counsellors");
const hireCounsellorRoutes = require("./routes/hireCounsellor");
const responseRoutes = require("./routes/response");
const blogSearchRoutes = require("./routes/blogSearch");
const counsellorSearchRoutes = require("./routes/counsellorSearch");
const questionRoutes = require("./routes/question");
const questionnaireRoutes = require("./routes/questionnaire");
const contactUsRoutes = require("./routes/contactUs");
const compose = require("./routes/compose");

const app = express();

// Set view engine to ejs
app.set("view engine", "ejs");
app.set("views", path.join("../client/views/"));

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(path.join("../client/public/")));

// express session with 1 hour cookie life
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 3600000 }
}));

// passport session initialize
app.use(passport.initialize());
app.use(passport.session());

// Connnection port
const PORT = process.env.PORT || 3000;

// Mongodb url connection
mongoose.set('strictQuery', true);
mongoose.connect(process.env.CONNECTION_URL).then(app.listen(PORT, function(){console.log(`Server is running on port: ${PORT}`)})).catch(function(err){console.log(err)});

// Creating local user strategy
passport.use(User.createStrategy());

passport.serializeUser(function(user, done) {
    done(null, user.id);
});
  
passport.deserializeUser(function(id, done) {
    User.findById(id, function (err, user) {
      done(err, user);
    });
});

// Routes
app.use("/", userRoutes);
app.use("/", resumeRoutes);
app.use("/", blogRoutes);
app.use("/", dashboardRoutes);
app.use("/", counsellorsRoutes);
app.use("/", hireCounsellorRoutes);
app.use("/", responseRoutes);
app.use("/", blogSearchRoutes);
app.use("/", counsellorSearchRoutes);
app.use("/", questionRoutes);
app.use("/", questionnaireRoutes);
app.use("/", contactUsRoutes);
app.use("/", compose);