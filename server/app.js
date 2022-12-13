require("dotenv").config();
const express = require("express");
const ejs = require("ejs");
const mongoose = require("mongoose");
const path = require("path");
const bodyParser = require("body-parser");
const session = require("express-session");
const passport = require("passport");
const passportLocalMongoose = require("passport-local-mongoose");
const User = require("./models/user");
const userRoutes = require("./routes/user");
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
app.use("/", compose);
